import React from 'react'
import { Rocket, Heart, Users, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'

const Home = () => {
  const applicationDeadline = '2024-10-31T23:59:59'

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-secondary text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-6 inline-block">
              <img 
                src="/opgprofile.jpg" 
                alt="Opengown Camp 27" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto shadow-2xl object-cover border-4 border-white bg-white" 
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Opengown Camp 27th
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-blue-100">
              ค่ายเปิดเสื้อกาวน์ ครั้งที่ 27
            </p>
            <p className="text-lg md:text-xl mb-8 text-blue-200">
              "สัมผัสประสบการณ์แพทย์ เปิดประตูสู่วชิรพยาบาล"
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/register" className="btn-primary bg-white text-primary hover:bg-gray-100">
                <Rocket className="inline mr-2" size={20} />
                สมัครสมาชิกเลย
              </Link>
              <Link to="/activities" className="btn-secondary bg-transparent border-2 border-white hover:bg-white hover:text-primary">
                <Heart className="inline mr-2" size={20} />
                ดูกิจกรรม
              </Link>
            </div>

            <CountdownTimer targetDate={applicationDeadline} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">เกี่ยวกับค่าย</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Opengown Camp คือค่ายที่เปิดโอกาสให้น้องๆ มัธยมปลายได้สัมผัสประสบการณ์จริง
            ในการเรียนคณะแพทยศาสตร์ ที่คณะแพทยศาสตร์วชิรพยาบาล มหาวิทยาลัยนวมินทราธิราช
            ผ่านกิจกรรมหลากหลายทั้งภาคทฤษฎีและปฏิบัติ
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Users, value: '100+', label: 'ผู้เข้าร่วม' },
              { icon: Award, value: '3', label: 'วัน' },
              { icon: Heart, value: '10+', label: 'เวิร์กช็อป' },
              { icon: Rocket, value: '27', label: 'ครั้งที่' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon size={40} className="mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title">ทำไมต้องมาค่ายนี้?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'เรียนรู้จากของจริง',
                description: 'ได้สัมผัสการเรียน Gross Anatomy จากอาจารย์ใหญ่จริง และฝึกหัตถการทางการแพทย์กับอุปกรณ์ที่ทันสมัย',
                color: 'bg-blue-500'
              },
              {
                title: 'แนะแนวโดยรุ่นพี่',
                description: 'ได้รับคำแนะนำตรงจากนักศึกษาแพทย์วชิรพยาบาล และอาจารย์แพทย์ผู้เชี่ยวชาญ',
                color: 'bg-green-500'
              },
              {
                title: 'มิตรภาพใหม่',
                description: 'พบเพื่อนใหม่ที่มีความฝันเดียวกัน สร้างเครือข่ายที่จะช่วยกันในอนาคต',
                color: 'bg-orange-500'
              }
            ].map((item, index) => (
              <div key={index} className="card text-center hover:transform hover:scale-105 transition-all">
                <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Award size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            พร้อมจะเป็นส่วนหนึ่งของครอบครัววชิรพยาบาลหรือยัง?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            สมัครเลยวันนี้ อย่าพลาดโอกาสดีๆ ที่จะเปลี่ยนอนาคตของคุณ
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary font-bold py-4 px-12 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            สมัครสมาชิกตอนนี้
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
