import React from 'react'
import { Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative text-white pt-12 pb-6" style={{
      backgroundImage: "url('/OPG27th.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ color: '#7B5948' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opengown Camp 27th</h3>
            <p className="text-sm leading-relaxed">
              ค่ายเปิดเสื้อกาวน์ ครั้งที่ 27
              ประสบการณ์เรียนรู้จากคณะแพทยศาสตร์วชิรพยาบาล
              เปิดโอกาสให้น้องๆ ได้สัมผัสชีวิตการเป็นนักศึกษาแพทย์
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-xl font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/timeline" className="hover:opacity-80 transition-colors">
                  กำหนดการรับสมัคร
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:opacity-80 transition-colors">
                  กิจกรรมในค่าย
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:opacity-80 transition-colors">
                  คำถามที่พบบ่อย
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-80 transition-colors">
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
                <MapPin size={20} />
                <span className="text-sm">
                  คณะแพทยศาสตร์วชิรพยาบาล มหาวิทยาลัยนวมินทราธิราช
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} />
                <a href="mailto:opengown27@gmail.com" className="hover:opacity-80 text-sm">
                  opengown27@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com/OpengownCamp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com/opengowncamp/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear() + 543} Opengown Camp 27th. คณะแพทยศาสตร์วชิรพยาบาล. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
