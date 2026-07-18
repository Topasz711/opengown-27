import React from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'

const Contact = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          ติดต่อเรา
        </h1>
        <p className="text-center text-gray-600 mb-4 max-w-2xl mx-auto">
          มีคำถามหรือข้อสงสัยเกี่ยวกับค่าย Opengown Camp 27th? 
          ติดต่อเราได้เลย เรายินดีให้คำตอบเสมอ
        </p>
        <p className="text-center text-primary font-medium mb-12 max-w-2xl mx-auto">
          แนะนำให้ติดต่อผ่าน Facebook หรือ Instagram เป็นหลัก ขอบคุณครับ
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
                  href="https://facebook.com/OpengownCamp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://instagram.com/opengowncamp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 p-3 rounded-lg text-white hover:bg-pink-700 transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">แผนที่</h2>
            <div className="rounded-lg overflow-hidden shadow-lg relative w-full" style={{ maxHeight: '450px' }}>
              <a
                href="https://www.google.com/maps/place/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%A7%E0%B8%8A%E0%B8%B4%E0%B8%A3%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5/@13.7799168,100.5067143,16.5z/data=!4m6!3m5!1s0x30e2995ff3547271:0x29fa4e9a551a8175!8m2!3d13.7805712!4d100.5091916!16s%2Fg%2F11hdylnpzs?hl=th"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                เปิดใน Maps ↗
              </a>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.006903828945!2d100.50661669999999!3d13.7805712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2995ff3547271%3A0x29fa4e9a551a8175!2z4LmC4Lij4LiH4Lie4Lii4Liy4Lia4Liy4Lil4Lin4LiK4Liy4Lie4Liy4Lia4Liy4Lil!5e0!3m2!1sth!2sth!4v1716462000000!5m2!1sth!2sth"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="โรงพยาบาลวชิรพยาบาล"
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
