import React, { useState } from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด')
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          ติดต่อเรา
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          มีคำถามหรือข้อสงสัยเกี่ยวกับค่าย Opengown Camp 27th? 
          ติดต่อเราได้เลย เรายินดีให้คำตอบเสมอ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ช่องทางการติดต่อ</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary p-3 rounded-lg">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">ที่อยู่</h3>
                  <p className="text-gray-600">
                    คณะแพทยศาสตร์วชิรพยาบาล<br />
                    มหาวิทยาลัยนวมินทราธิราช<br />
                    แขวงดุสิต เขตดุสิต<br />
                    กรุงเทพฯ 10300
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary p-3 rounded-lg">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">อีเมล</h3>
                  <a href="mailto:opengown27@example.com" className="text-primary hover:underline">
                    opengown27@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary p-3 rounded-lg">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">โทรศัพท์</h3>
                  <a href="tel:02-xxx-xxxx" className="text-primary hover:underline">
                    02-xxx-xxxx
                  </a>
                  <p className="text-sm text-gray-500">จันทร์-ศุกร์ 09:00-17:00 น.</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="font-bold text-gray-800 mb-4">ติดตามเราบนโซเชียลมีเดีย</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/opengown27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://instagram.com/opengown27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 p-3 rounded-lg text-white hover:bg-pink-700 transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-8">
              <h3 className="font-bold text-gray-800 mb-4">แผนที่</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.96!2d100.5089!3d13.7756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed8b0c47e69%3A0x123456789abcdef!2sVajira%20Hospital!5e0!3m2!1sen!2sth!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ส่งข้อความถึงเรา</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="กรอกชื่อของคุณ"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หัวข้อ *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">เลือกหัวข้อ</option>
                  <option value="general">คำถามทั่วไป</option>
                  <option value="application">การสมัคร</option>
                  <option value="technical">ปัญหาทางเทคนิค</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ข้อความ *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="พิมพ์ข้อความของคุณที่นี่..."
                  required
                />
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <Send size={20} />
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
