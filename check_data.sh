#!/bin/bash

echo "🔍 กำลังตรวจสอบข้อมูลในฐานข้อมูล..."
echo ""

cd /workspace/backend

python3 << 'EOF'
import sqlite3
import os

# Connect to database
conn = sqlite3.connect('opengown.db')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

print("=" * 60)
print("📋 รายชื่อผู้ใช้ทั้งหมด (Users)")
print("=" * 60)
cursor.execute("SELECT id, email, name, phone, school, grade, status, is_admin, created_at FROM users ORDER BY created_at DESC")
users = cursor.fetchall()

if not users:
    print("❌ ยังไม่มีผู้ใช้ในระบบ")
else:
    for user in users:
        role = "👑 ADMIN" if user['is_admin'] else "👤 User"
        print(f"\n{role} | ID: {user['id']}")
        print(f"   Email: {user['email']}")
        print(f"   ชื่อ: {user['name']}")
        print(f"   โทรศัพท์: {user['phone']}")
        print(f"   โรงเรียน: {user['school']}")
        print(f"   เกรด: {user['grade']}")
        print(f"   สถานะ: {user['status']}")
        print(f"   สมัครเมื่อ: {user['created_at']}")

print("\n" + "=" * 60)
print("📝 ใบสมัครทั้งหมด (Applications)")
print("=" * 60)
cursor.execute("""
    SELECT a.id, a.user_id, u.name as user_name, u.email, 
           a.essay_answer, a.photo_path, a.transcript_path, 
           a.consent_form_path, a.status, a.submitted_at
    FROM applications a
    JOIN users u ON a.user_id = u.id
    ORDER BY a.submitted_at DESC
""")
applications = cursor.fetchall()

if not applications:
    print("❌ ยังไม่มีใบสมัครในระบบ")
else:
    for app in applications:
        print(f"\n📄 ใบสมัคร ID: {app['id']}")
        print(f"   ผู้สมัคร: {app['user_name']} ({app['email']})")
        print(f"   คำตอบเรียงความ: {app['essay_answer'][:50]}..." if app['essay_answer'] and len(app['essay_answer']) > 50 else f"   คำตอบเรียงความ: {app['essay_answer']}")
        print(f"   รูปถ่าย: {app['photo_path'] if app['photo_path'] else '❌ ยังไม่อัปโหลด'}")
        print(f"   ใบเกรด: {app['transcript_path'] if app['transcript_path'] else '❌ ยังไม่อัปโหลด'}")
        print(f"   แบบยินยอม: {app['consent_form_path'] if app['consent_form_path'] else '❌ ยังไม่อัปโหลด'}")
        print(f"   สถานะ: {app['status']}")
        print(f"   ส่งเมื่อ: {app['submitted_at']}")

print("\n" + "=" * 60)
print("🖼️ ไฟล์ที่อัปโหลดทั้งหมด (Uploaded Files)")
print("=" * 60)
upload_dir = 'uploads'
if os.path.exists(upload_dir):
    files = os.listdir(upload_dir)
    if not files:
        print("❌ ยังไม่มีไฟล์ที่อัปโหลด")
    else:
        for file in files:
            file_path = os.path.join(upload_dir, file)
            file_size = os.path.getsize(file_path)
            print(f"   📁 {file} ({file_size:,} bytes)")
else:
    print("❌ ไม่พบโฟลเดอร์ uploads")

conn.close()
print("\n" + "=" * 60)
print("✅ เสร็จสิ้นการตรวจสอบ")
print("=" * 60)
EOF
