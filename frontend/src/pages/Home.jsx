import React from 'react'
import { Rocket, Heart, Users, Award, Calendar, Stethoscope, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'

const Home = () => {
  const applicationDeadline = '2026-09-19T23:59:59'
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section - Modern Light Theme with Soft Blue */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-sky-50/50 to-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Decorative blur effects for depth */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side: Text Content & CTA */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20 tracking-wide uppercase">
              ✨ Opengown Camp 27th
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              เปิดเสื้อกาวน์ <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                สานฝันสู่วิชาชีพแพทย์
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              ขอเชิญชวนน้อง ๆ มัธยมปลายมาร่วมค้นหาตัวตนในค่ายแนะแนววิชาการ 
              เรียนรู้ชีวิตในรั้วมหาวิทยาลัย และสัมผัสประสบการณ์การเป็นนักศึกษาแพทย์จริงกับพี่ ๆ
            </p>
            
            {/* Countdown Timer with Glassmorphism */}
            <div className="py-2 max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-100 shadow-sm">
                <p className="text-xs font-medium text-slate-400 mb-2 text-center lg:text-left">⏰ ระยะเวลาที่เหลือสำหรับเปิดรับสมัคร</p>
                <CountdownTimer targetDate={applicationDeadline} />
              </div>
            </div>

            {/* Action Buttons - Pastel Orange/Amber */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2 max-w-xl mx-auto lg:mx-0">
              <a
                href="https://docs.google.com/forms/d/1BVPPkg4CFk1Zk2zGK92G8c7KF7wbMQOYxYsoHlLIcUo/previewResponse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-2xl text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transform hover:-translate-y-0.5 transition-all shadow-md shadow-orange-500/20"
              >
                <Rocket className="mr-2" size={20} />
                สมัครเข้าร่วมค่ายเลยตอนนี้
              </a>
              <Link
                to="/timeline"
                className="inline-flex justify-center items-center px-8 py-3.5 border border-slate-200 text-base font-semibold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-sm"
              >
                <Calendar className="mr-2" size={20} />
                ดูรายละเอียดกำหนดการ
              </Link>
            </div>
          </div>

          {/* Right Side: Logo with Clean White Card */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-md p-2 transition-all duration-300">
              <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-xl border border-slate-100 transition-all duration-300 hover:shadow-2xl">
                <img
                  src="/opgprofile.jpg"
                  alt="Opengown Camp Logo"
                  className="w-full h-auto object-cover rounded-2xl mix-blend-multiply"
                />
              </div>
              
              {/* Decorative glow effects */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl -z-10"></div>
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
              { icon: Calendar, value: '3', label: 'วัน', color: 'bg-teal-100 text-teal-600' },
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
              { step: '01', title: 'เปิดรับสมัคร', desc: '15 สิงหาคม 2569 - 19 กันยายน 2569', color: 'border-blue-500' },
              { step: '02', title: 'ประกาศผล', desc: '15 ตุลาคม 2569', color: 'border-teal-500' },
              { step: '03', title: 'วันจัดค่าย', desc: '6-8 พฤศจิกายน 2569', color: 'border-indigo-500' }
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
          <a
            href="https://docs.google.com/forms/d/1BVPPkg4CFk1Zk2zGK92G8c7KF7wbMQOYxYsoHlLIcUo/previewResponse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-bold py-4 px-12 rounded-xl text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-xl"
          >
            สมัครสมาชิกตอนนี้
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
