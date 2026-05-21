#!/bin/bash

echo "🚀 กำลังเริ่ม Backend Server..."
echo ""
echo "📌 ข้อมูล Admin สำหรับล็อกอิน:"
echo "   Email: admin@opengown.com"
echo "   Password: admin123"
echo ""
echo "🌐 API จะทำงานที่: http://localhost:8000"
echo "📚 Swagger UI (ทดสอบ API ผ่านเว็บ): http://localhost:8000/docs"
echo ""
echo "⏹️  กด Ctrl+C เพื่อหยุด server"
echo ""

cd /workspace/backend
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
