import React from 'react'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opengown Camp 27th</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              ค่ายเปิดเสื้อกาวน์ ครั้งที่ 27
              ประสบการณ์เรียนรู้จากคณะแพทยศาสตร์วชิรพยาบาล
              เปิดโอกาสให้น้องๆ ได้สัมผัสชีวิตการเป็นนักศึกษาแพทย์
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/timeline" className="text-gray-300 hover:text-white transition-colors">
                  กำหนดการรับสมัคร
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-white transition-colors">
                  กิจกรรมในค่าย
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  คำถามที่พบบ่อย
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin size={20} className="text-accent" />
                <span className="text-gray-300 text-sm">
                  คณะแพทยศาสตร์วชิรพยาบาล มหาวิทยาลัยนวมินทราธิราช
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-accent" />
                <a href="mailto:opengown27@example.com" className="text-gray-300 hover:text-white text-sm">
                  opengown27@example.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent" />
                <a href="tel:02-xxx-xxxx" className="text-gray-300 hover:text-white text-sm">
                  02-xxx-xxxx
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com/OpengownCamp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com/opengowncamp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear() + 543} Opengown Camp 27th. คณะแพทยศาสตร์วชิรพยาบาล. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
