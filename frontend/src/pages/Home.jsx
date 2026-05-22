import React from 'react'
import { Rocket, Heart, Users, Award, Calendar, Stethoscope, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'

const Home = () => {
  const applicationDeadline = '2026-08-31T23:59:59'
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section - Modern Gradient with Glassmorphism */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 py-20 px-4 sm:px-6 lg:px-8 text-white">
        
        {/* Decorative blur effects for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side: Text Content & CTA */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
              Opengown Camp 27th
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              ปลดล็อกความฝัน <br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                สู่เส้นทางเสื้อกาวน์
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              ขอเชิญน้อง ๆ มัธยมปลายร่วมค้นหาตนเองในค่ายแนะแนววิชาการและวิชาชีพแพทย์ 
              สัมผัสประสบการณ์จริง เรียนจริง และลงมือปฏิบัติจริงร่วมกับพี่ ๆ คณะแพทยศาสตร์วชิรพยาบาล
            </p>
            
            {/* Countdown Timer with Glassmorphism */}
            <div className="py-4">
              <CountdownTimer targetDate={applicationDeadline} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/register"
                className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-slate-900 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 transform hover:-translate-y-0.5 transition-all shadow-lg shadow-orange-500/30"
              >
                <Rocket className="mr-2" size={20} />
                สมัครเข้าร่วมค่ายเลย
              </Link>
              <Link
                to="/timeline"
                className="inline-flex justify-center items-center px-8 py-4 border border-slate-600 text-base font-medium rounded-xl text-white bg-slate-900/50 hover:bg-slate-800/60 backdrop-blur-sm transition-all hover:border-slate-500"
              >
                <Calendar className="mr-2" size={20} />
                ดูกำหนดการ
              </Link>
            </div>
          </div>

          {/* Right Side: Logo with Glassmorphism Card */}
          <div className="flex justify-center items-center">
            <div className="relative group p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-blue-500/20">
              <img
                src="/opgprofile.jpg"
                alt="Opengown Logo"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-2xl shadow-inner group-hover:scale-[1.02] transition-transform duration-300"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section - Clean White Background */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">เกี่ยวกับ Opengown Camp</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              ค่ายที่เปิดโอกาสให้น้องๆ มัธยมปลายได้สัมผัสประสบการณ์จริงในการเรียนคณะแพทยศาสตร์ 
              ที่คณะแพทยศาสตร์วชิรพยาบาล มหาวิทยาลัยนวมินทราธิราช ผ่านกิจกรรมหลากหลายทั้งภาคทฤษฎีและปฏิบัติ
            </p>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '100+', label: 'ผู้เข้าร่วมต่อรุ่น', color: 'bg-blue-100 text-blue-600' },
              { icon: Calendar, value: '3', label: 'วัน 2 คืน', color: 'bg-teal-100 text-teal-600' },
              { icon: Award, value: '10+', label: 'เวิร์กช็อป', color: 'bg-indigo-100 text-indigo-600' },
              { icon: Heart, value: '27', label: 'ครั้งที่', color: 'bg-rose-100 text-rose-600' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow text-center">
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={28} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Join Section - Light Gray Background */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">ทำไมต้องมาค่ายนี้?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              มาร่วมค้นหาคำตอบว่าชีวิตในรั้วมหาวิทยาลัยและการเรียนแพทย์ที่แท้จริงเหมาะกับเราหรือไม่
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Stethoscope,
                title: 'เรียนรู้จากของจริง',
                description: 'ได้สัมผัสการเรียน Gross Anatomy จากอาจารย์ใหญ่จริง และฝึกหัตถการทางการแพทย์กับอุปกรณ์ที่ทันสมัย',
                color: 'bg-blue-500',
                accentColor: 'bg-blue-100 text-blue-600'
              },
              {
                icon: UserPlus,
                title: 'แนะแนวโดยรุ่นพี่',
                description: 'ได้รับคำแนะนำตรงจากนักศึกษาแพทย์วชิรพยาบาล และอาจารย์แพทย์ผู้เชี่ยวชาญ',
                color: 'bg-teal-500',
                accentColor: 'bg-teal-100 text-teal-600'
              },
              {
                icon: Heart,
                title: 'มิตรภาพใหม่',
                description: 'พบเพื่อนใหม่ที่มีความฝันเดียวกัน สร้างเครือข่ายที่จะช่วยกันในอนาคต',
                color: 'bg-orange-500',
                accentColor: 'bg-orange-100 text-orange-600'
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`${item.accentColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Preview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">ไทม์ไลน์สำคัญ</h2>
          <p className="text-lg text-slate-600 mb-12">
            อย่าพลาดทุกช่วงเวลาสำคัญของการสมัครเข้าร่วมค่าย
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { step: '01', title: 'เปิดรับสมัคร', desc: 'มิถุนายน - สิงหาคม', color: 'border-blue-500' },
              { step: '02', title: 'ประกาศผล', desc: 'กันยายน', color: 'border-teal-500' },
              { step: '03', title: 'วันจัดค่าย', desc: 'ตุลาคม', color: 'border-indigo-500' }
            ].map((item, index) => (
              <div key={index} className={`relative p-6 border-l-4 ${item.color} bg-slate-50 rounded-r-xl`}>
                <div className="text-4xl font-bold text-slate-200 absolute top-2 right-4">{item.step}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <Link
            to="/timeline"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ดูไทม์ไลน์เต็มรูปแบบ
            <Rocket className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* CTA Section - Gradient Background */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            พร้อมจะเป็นส่วนหนึ่งของครอบครัววชิรพยาบาลหรือยัง?
          </h2>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            สมัครเลยวันนี้ อย่าพลาดโอกาสดีๆ ที่จะเปลี่ยนอนาคตของคุณ
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 font-bold py-4 px-12 rounded-xl text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-xl"
          >
            สมัครสมาชิกตอนนี้
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
