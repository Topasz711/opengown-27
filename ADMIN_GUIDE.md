# 📘 คู่มือสำหรับ Admin - วิธีดูข้อมูลผู้สมัคร

## ✅ วิธีที่ 1: ดูผ่าน Command Line (ง่ายที่สุด)

รันคำสั่งนี้เพื่อ xem ข้อมูลทั้งหมดในฐานข้อมูล:

```bash
/workspace/check_data.sh
```

**ผลลัพธ์จะแสดง:**
- รายชื่อผู้ใช้ทั้งหมด (email, ชื่อ, โรงเรียน, เกรด, สถานะ)
- ใบสมัครทั้งหมด (คำตอบเรียงความ, ไฟล์ที่อัปโหลด)
- ไฟล์รูปภาพทั้งหมดที่เก็บในเซิร์ฟเวอร์

---

## ✅ วิธีที่ 2: ดูผ่าน API (ใช้ Swagger UI)

### ขั้นตอนที่ 1: เริ่ม Backend Server

```bash
/workspace/backend/start_server.sh
```

Server จะทำงานที่: **http://localhost:8000**

### ขั้นตอนที่ 2: เปิด Swagger UI

เปิดเบราว์เซอร์แล้วไปที่: **http://localhost:8000/docs**

### ขั้นตอนที่ 3: ล็อกอินด้วยบัญชี Admin

1. คลิกที่ปุ่ม **"Authorize"** (มุมขวาบน)
2. กรอกข้อมูล:
   - username: `admin@opengown.com`
   - password: `admin123`
3. คลิก **"Authorize"** แล้วปิดหน้าต่าง

### ขั้นตอนที่ 4: เรียกดูข้อมูล

#### 📋 ดูรายชื่อผู้ใช้ทั้งหมด
- คลิกที่ endpoint: `GET /api/admin/users`
- คลิก **"Try it out"**
- คลิก **"Execute"**
- ดูผลลัพธ์ในช่อง "Response body"

#### 📝 ดูใบสมัครทั้งหมด
- คลิกที่ endpoint: `GET /api/admin/applications`
- คลิก **"Try it out"**
- คลิก **"Execute"**

#### 👤 ดูรายละเอียดผู้ใช้เฉพาะคน
- คลิกที่ endpoint: `GET /api/admin/users/{user_id}`
- ใส่ `user_id` (เช่น 6) ในช่อง
- คลิก **"Try it out"** → **"Execute"**

#### 🖼️ ดาวน์โหลดไฟล์ที่อัปโหลด
- คลิกที่ endpoint: `GET /api/admin/files/{file_path}`
- ใส่ path ของไฟล์ (เช่น `uploads/9adfd7fb-f790-4861-9f3b-65ceed5a5133.png`)
- คลิก **"Try it out"** → **"Execute"**
- ระบบจะดาวน์โหลดไฟล์มาให้

---

## ✅ วิธีที่ 3: ดูไฟล์โดยตรงบนเซิร์ฟเวอร์

ไฟล์ทั้งหมดที่ผู้ใช้อัปโหลดจะเก็บอยู่ที่:

```bash
ls -la /workspace/backend/uploads/
```

แต่ละไฟล์จะมีชื่อเป็น UUID เช่น:
- `9adfd7fb-f790-4861-9f3b-65ceed5a5133.png`

หากต้องการดูว่าไฟล์ไหนเป็นของผู้ใช้ใด ให้ดูจากฐานข้อมูล (วิธีที่ 1) ซึ่งจะจับคู่ `photo_path`, `transcript_path`, `consent_form_path` กับผู้ใช้

---

## 📊 สรุปข้อมูลที่สามารถดูได้

| ข้อมูล | วิธีดู |
|--------|--------|
| รายชื่อผู้สมัคร | `check_data.sh` หรือ `GET /api/admin/users` |
| Email, ชื่อ, โรงเรียน, เกรด |同上 |
| คำตอบเรียงความ | `GET /api/admin/applications` |
| รูปถ่ายที่อัปโหลด | ดู path จาก API แล้วโหลดผ่าน `GET /api/admin/files/{path}` |
| ใบเกรด transcript |同上 |
| แบบยินยอม consent form |同上 |
| สถานะการสมัคร (pending/accepted/rejected) | ดูจากคอลัมน์ `status` |

---

## 🔑 ข้อมูล Admin สำหรับล็อกอิน

- **Email:** `admin@opengown.com`
- **Password:** `admin123`

---

## 🆘 ปัญหาที่พบบ่อย

**Q: ไม่เห็นข้อมูลผู้สมัคร?**  
A: รัน `/workspace/check_data.sh` เพื่อยืนยันว่ามีข้อมูลในฐานข้อมูลหรือไม่

**Q: API ไม่ทำงาน?**  
A: ตรวจสอบว่า server กำลังรันอยู่หรือไม่ ด้วยคำสั่ง `/workspace/backend/start_server.sh`

**Q: ไฟล์ภาพเปิดไม่ได้?**  
A: ตรวจสอบว่าไฟล์มีอยู่ในโฟลเดอร์ `/workspace/backend/uploads/` จริง
