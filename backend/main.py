import os
import shutil
import uuid
from datetime import datetime, timedelta
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
import aiosqlite
from pathlib import Path

# Configuration
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = "opengown.db"
UPLOAD_DIR = "uploads"

# Create upload directory
Path(UPLOAD_DIR).mkdir(exist_ok=True)

app = FastAPI(title="Opengown Camp API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Database models
class User(BaseModel):
    id: int
    email: str
    password_hash: str
    first_name: str
    last_name: str
    name: str
    phone: str
    school: str
    grade: float
    status: str = "pending"
    created_at: str
    is_admin: bool = False

class Application(BaseModel):
    id: int
    user_id: int
    essay_answer: Optional[str] = None
    photo_path: Optional[str] = None
    transcript_path: Optional[str] = None
    consent_form_path: Optional[str] = None
    status: str = "pending"
    submitted_at: Optional[str] = None
    updated_at: Optional[str] = None

# Token model
class Token(BaseModel):
    access_token: str
    token_type: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    phone: str
    school: str
    grade: float

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ApplicationSubmit(BaseModel):
    essay_answer: str

# Database helper functions
async def get_db():
    db = await aiosqlite.connect(DATABASE_URL)
    db.row_factory = aiosqlite.Row
    try:
        yield db
    finally:
        await db.close()

async def init_db():
    db = await aiosqlite.connect(DATABASE_URL)
    await db.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            school TEXT NOT NULL,
            grade REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    await db.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            essay_answer TEXT,
            photo_path TEXT,
            transcript_path TEXT,
            consent_form_path TEXT,
            status TEXT DEFAULT 'pending',
            submitted_at TEXT,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    await db.commit()
    await db.close()

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    async with db.execute("SELECT * FROM users WHERE email = ?", (email,)) as cursor:
        user_row = await cursor.fetchone()
    
    if user_row is None:
        raise credentials_exception
    return dict(user_row)

async def get_current_admin_user(current_user: dict = Depends(get_current_user)):
    if not current_user.get('is_admin', False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

# Startup event
@app.on_event("startup")
async def startup():
    await init_db()
    # Create default admin user if not exists
    db = await aiosqlite.connect(DATABASE_URL)
    await db.execute('''
        INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, name, phone, school, grade, is_admin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', ("admin@opengown.com", get_password_hash("admin123"), "Admin", "User", "Admin User", "0000000000", "N/A", 0.0, True))
    await db.commit()
    await db.close()

# Auth endpoints
@app.post("/api/auth/register", response_model=dict)
async def register(user_data: UserRegister):
    db = await aiosqlite.connect(DATABASE_URL)
    
    # Check if email exists
    async with db.execute("SELECT id FROM users WHERE email = ?", (user_data.email,)) as cursor:
        existing = await cursor.fetchone()
    
    if existing:
        await db.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    password_hash = get_password_hash(user_data.password)
    name = f"{user_data.first_name} {user_data.last_name}"
    
    await db.execute('''
        INSERT INTO users (email, password_hash, first_name, last_name, name, phone, school, grade)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (user_data.email, password_hash, user_data.first_name, user_data.last_name, 
          name, user_data.phone, user_data.school, user_data.grade))
    
    await db.commit()
    await db.close()
    
    return {"message": "Registration successful", "email": user_data.email}

@app.post("/api/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = await aiosqlite.connect(DATABASE_URL)
    db.row_factory = aiosqlite.Row
    
    async with db.execute("SELECT * FROM users WHERE email = ?", (form_data.username,)) as cursor:
        user_row = await cursor.fetchone()
    
    await db.close()
    
    if not user_row:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    user = dict(user_row)
    
    if not verify_password(form_data.password, user['password_hash']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user['email'], "user_id": user['id']},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=dict)
async def get_me(current_user: dict = Depends(get_current_user)):
    # Remove sensitive data
    safe_user = {k: v for k, v in current_user.items() if k != 'password_hash'}
    return safe_user

# Application endpoints
@app.post("/api/applications", response_model=dict)
async def submit_application(
    app_data: ApplicationSubmit,
    current_user: dict = Depends(get_current_user)
):
    db = await aiosqlite.connect(DATABASE_URL)
    
    # Check if application already exists
    async with db.execute("SELECT id FROM applications WHERE user_id = ?", (current_user['id'],)) as cursor:
        existing = await cursor.fetchone()
    
    if existing:
        # Update existing application
        await db.execute('''
            UPDATE applications SET essay_answer = ?, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
        ''', (app_data.essay_answer, current_user['id']))
    else:
        # Create new application
        await db.execute('''
            INSERT INTO applications (user_id, essay_answer, submitted_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
        ''', (current_user['id'], app_data.essay_answer))
    
    await db.commit()
    await db.close()
    
    return {"message": "Application submitted successfully"}

@app.post("/api/applications/{application_id}/documents")
async def upload_document(
    application_id: int,
    file: UploadFile = File(...),
    doc_type: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    db = await aiosqlite.connect(DATABASE_URL)
    
    # Verify application belongs to user
    async with db.execute("SELECT id FROM applications WHERE id = ? AND user_id = ?", 
                         (application_id, current_user['id'])) as cursor:
        app_row = await cursor.fetchone()
    
    if not app_row:
        await db.close()
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Save file
    file_extension = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update database based on document type
    if doc_type == "photo":
        await db.execute("UPDATE applications SET photo_path = ? WHERE id = ?", (file_path, application_id))
    elif doc_type == "transcript":
        await db.execute("UPDATE applications SET transcript_path = ? WHERE id = ?", (file_path, application_id))
    elif doc_type == "consent_form":
        await db.execute("UPDATE applications SET consent_form_path = ? WHERE id = ?", (file_path, application_id))
    else:
        await db.close()
        raise HTTPException(status_code=400, detail="Invalid document type")
    
    await db.commit()
    await db.close()
    
    return {"message": "Document uploaded successfully", "file_path": file_path}

@app.get("/api/applications/my")
async def get_my_application(current_user: dict = Depends(get_current_user)):
    db = await aiosqlite.connect(DATABASE_URL)
    
    async with db.execute("SELECT * FROM applications WHERE user_id = ?", (current_user['id'],)) as cursor:
        app_row = await cursor.fetchone()
    
    await db.close()
    
    if not app_row:
        return {"status": "not_submitted"}
    
    app_dict = dict(app_row)
    app_dict['photo_uploaded'] = bool(app_dict['photo_path'])
    app_dict['transcript_uploaded'] = bool(app_dict['transcript_path'])
    app_dict['consent_form_uploaded'] = bool(app_dict['consent_form_path'])
    
    return app_dict

# Admin endpoints
@app.get("/api/admin/users", response_model=List[dict])
async def get_all_users(current_admin: dict = Depends(get_current_admin_user)):
    db = await aiosqlite.connect(DATABASE_URL)
    
    async with db.execute("SELECT id, email, first_name, last_name, name, phone, school, grade, status, created_at, is_admin FROM users ORDER BY created_at DESC") as cursor:
        rows = await cursor.fetchall()
    
    await db.close()
    
    return [dict(row) for row in rows]

@app.get("/api/admin/applications", response_model=List[dict])
async def get_all_applications(current_admin: dict = Depends(get_current_admin_user)):
    db = await aiosqlite.connect(DATABASE_URL)
    
    async with db.execute('''
        SELECT a.*, u.email, u.name as user_name, u.phone, u.school, u.grade
        FROM applications a
        JOIN users u ON a.user_id = u.id
        ORDER BY a.submitted_at DESC
    ''') as cursor:
        rows = await cursor.fetchall()
    
    await db.close()
    
    return [dict(row) for row in rows]

@app.get("/api/admin/users/{user_id}")
async def get_user_detail(user_id: int, current_admin: dict = Depends(get_current_admin_user)):
    db = await aiosqlite.connect(DATABASE_URL)
    
    async with db.execute("SELECT id, email, first_name, last_name, name, phone, school, grade, status, created_at, is_admin FROM users WHERE id = ?", (user_id,)) as cursor:
        user_row = await cursor.fetchone()
    
    if not user_row:
        await db.close()
        raise HTTPException(status_code=404, detail="User not found")
    
    async with db.execute("SELECT * FROM applications WHERE user_id = ?", (user_id,)) as cursor:
        app_row = await cursor.fetchone()
    
    await db.close()
    
    result = {"user": dict(user_row), "application": dict(app_row) if app_row else None}
    return result

@app.put("/api/admin/users/{user_id}/status")
async def update_user_status(
    user_id: int,
    status: str = Form(...),
    current_admin: dict = Depends(get_current_admin_user)
):
    db = await aiosqlite.connect(DATABASE_URL)
    
    valid_statuses = ["pending", "under_review", "accepted", "rejected"]
    if status not in valid_statuses:
        await db.close()
        raise HTTPException(status_code=400, detail="Invalid status")
    
    await db.execute("UPDATE users SET status = ? WHERE id = ?", (status, user_id))
    await db.execute("UPDATE applications SET status = ? WHERE user_id = ?", (status, user_id))
    await db.commit()
    await db.close()
    
    return {"message": "Status updated successfully"}

@app.get("/api/admin/files/{file_path:path}")
async def get_file(file_path: str, current_admin: dict = Depends(get_current_admin_user)):
    full_path = os.path.join(UPLOAD_DIR, file_path)
    
    if not os.path.exists(full_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    from fastapi.responses import FileResponse
    return FileResponse(full_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)