import aiosqlite
import asyncio

async def check_db():
    db = await aiosqlite.connect('/workspace/backend/opengown.db')
    db.row_factory = aiosqlite.Row
    
    print("=== USERS ===")
    async with db.execute('SELECT id, email, name, phone, school, status, created_at FROM users') as cursor:
        rows = await cursor.fetchall()
        print(f'Total users: {len(rows)}')
        for r in rows:
            print(dict(r))
    
    print("\n=== APPLICATIONS ===")
    async with db.execute('SELECT id, user_id, essay_answer, photo_path, transcript_path, consent_form_path, status, submitted_at FROM applications') as cursor:
        rows = await cursor.fetchall()
        print(f'Total applications: {len(rows)}')
        for r in rows:
            print(dict(r))
    
    await db.close()

if __name__ == "__main__":
    asyncio.run(check_db())
