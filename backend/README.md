# คู่มือการใช้งานระบบ Backend สำหรับ Host/Admin

## ภาพรวม
ระบบได้ถูกพัฒนาให้รองรับการจัดเก็บข้อมูลผู้สมัครในฐานข้อมูล SQLite แทนการใช้ localStorage แล้ว ทำให้ Host สามารถตรวจสอบข้อมูลผู้สมัครทุกคนได้แบบรวมศูนย์

## การติดตั้งและรัน Backend

### 1. ติดตั้ง Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. รัน Server
```bash
python main.py
```
หรือ
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Server จะทำงานที่ `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - เข้าสู่ระบบ (ใช้ form-data: username, password)
- `GET /api/auth/me` - ดูข้อมูลผู้ใช้ปัจจุบัน

### Applications
- `POST /api/applications` - ส่งใบสมัคร (essay)
- `POST /api/applications/{id}/documents` - อัปโหลดเอกสาร (photo, transcript, consent_form)
- `GET /api/applications/my` - ดูใบสมัครของฉัน

### Admin (ต้อง login เป็น admin)
- `GET /api/admin/users` - ดูรายชื่อผู้สมัครทั้งหมด
- `GET /api/admin/applications` - ดูใบสมัครทั้งหมด
- `GET /api/admin/users/{user_id}` - ดูรายละเอียดผู้สมัครคนหนึ่ง
- `PUT /api/admin/users/{user_id}/status` - อัพเดทสถานะผู้สมัคร
- `GET /api/admin/files/{file_path}` - ดาวน์โหลดไฟล์ที่อัปโหลด

## บัญชี Admin เริ่มต้น

หลังจากเริ่ม server ครั้งแรก ระบบจะสร้างบัญชี admin อัตโนมัติ:
- **Email:** `admin@opengown.com`
- **Password:** `admin123`

⚠️ **สำคัญ:** เปลี่ยนรหัสผ่านทันทีหลังใช้งานครั้งแรก

## การเข้าถึง Admin Dashboard

1. Login ด้วยบัญชี admin ที่ `http://localhost:5173/login` (หรือ domain ของคุณ)
2. ไปที่ `http://localhost:5173/admin`
3. คุณจะเห็น:
   - สถิติผู้สมัครทั้งหมด
   - ตารางรายชื่อผู้สมัครพร้อมสถานะ
   - ระบบค้นหาและกรองตามสถานะ
   - ปุ่มเปลี่ยนสถานะผู้สมัคร
   - ปุ่มดูรายละเอียดผู้สมัครแต่ละคน
   - ลิงก์ดาวน์โหลดเอกสารที่อัปโหลด

## โครงสร้างฐานข้อมูล

### ตาราง users
- id, email, password_hash, first_name, last_name, name
- phone, school, grade, status, is_admin, created_at

### ตาราง applications
- id, user_id, essay_answer
- photo_path, transcript_path, consent_form_path
- status, submitted_at, updated_at

## ไฟล์ที่อัปโหลด

ไฟล์ทั้งหมดจะถูกเก็บในโฟลเดอร์ `backend/uploads/` ด้วยชื่อไฟล์แบบสุ่ม (UUID) เพื่อป้องกันความซ้ำซ้อน

## การใช้งาน Admin Dashboard

### ดูรายชื่อผู้สมัคร
- เข้าไปที่ `/admin` จะเห็นตารางผู้สมัครทั้งหมด
- ใช้ช่องค้นหาเพื่อค้นหาด้วยชื่อ, อีเมล, หรือโรงเรียน
- ใช้ตัวกรองสถานะเพื่อดูเฉพาะกลุ่มที่ต้องการ

### เปลี่ยนสถานะผู้สมัคร
- คลิกที่ dropdown สถานะในตาราง
- เลือกสถานะใหม่: รอตรวจ, กำลังพิจารณา, ผ่านการคัดเลือก, ไม่ผ่านการคัดเลือก

### ดูรายละเอียดและดาวน์โหลดเอกสาร
- คลิกที่ไอคอน "ตา" เพื่อดูรายละเอียดผู้สมัคร
- ในหน้าต่าง modal จะแสดง:
  - ข้อมูลส่วนตัวทั้งหมด
  - สถานะใบสมัคร
  - ลิงก์ดาวน์โหลดเอกสารที่อัปโหลด (รูปถ่าย, ทรานสคริปต์, ใบขออนุญาต)
  - คำตอบเรียงความ

## ตัวอย่างการใช้งาน API ด้วย curl

### Register
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User",
    "phone": "0812345678",
    "school": "Test School",
    "grade": 3.50
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: multipart/form-data" \
  -F "username=admin@opengown.com" \
  -F "password=admin123"
```

### Get Users (ต้องมี token)
```bash
curl -X GET http://localhost:8000/api/admin/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## การ Deploy

### Backend
แนะนำ deploy บน:
- VPS (DigitalOcean, Linode, AWS EC2)
- Platform as a Service (Heroku, Railway, Render)
- Docker container

### Frontend
แก้ไข URL ใน `frontend/src/services/api.js` ให้ชี้ไปยัง backend server:
```javascript
const API_BASE_URL = 'https://your-backend-domain.com/api'
```

แล้ว deploy บน:
- Vercel (แนะนำ)
- Netlify
- GitHub Pages

## ความปลอดภัย

1. เปลี่ยน `SECRET_KEY` ใน `backend/main.py` ก่อน deploy
2. ใช้ HTTPS ใน production
3. จำกัด CORS origins ใน production
4. สำรองฐานข้อมูลเป็นประจำ
5. ตรวจสอบและลบไฟล์ที่ไม่จำเป็นในโฟลเดอร์ uploads

## การแก้ไขปัญหา

### ไม่สามารถ login ได้
- ตรวจสอบว่า backend server ทำงานอยู่
- ตรวจสอบว่า database ถูกสร้างแล้ว (`opengown.db`)
- ลอง restart server

### ไฟล์อัปโหลดไม่ขึ้น
- ตรวจสอบ permission ของโฟลเดอร์ `uploads/`
- ตรวจสอบขนาดไฟล์ (อาจต้องเพิ่ม limit ใน backend)

### Admin dashboard ไม่แสดงข้อมูล
- ตรวจสอบว่า login ด้วยบัญชี admin
- ตรวจสอบ network tab ใน browser console
- ตรวจสอบว่า backend API ตอบกลับถูกต้อง
