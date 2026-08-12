import React from 'react'
import { Rocket, Heart, Users, Award, Calendar, Stethoscope, UserPlus, Group } from 'lucide-react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'

const Home = () => {
  const applicationDeadline = '2026-09-19T23:59:59+07:00'
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section - Modern Light Theme with Soft Blue */}
      <section className="relative overflow-hidden bg-gradient-to-b from-color-light via-color-teal/50 to-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Decorative blur effects for depth */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-80 h-80 bg-secondary/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side: Text Content & CTA */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 tracking-wide uppercase">
              ✨ Opengown Camp 27th
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              เปิดเสื้อกาวน์ <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                สานฝันสู่วิชาชีพแพทย์
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              ค่ายเปิดเสื้อกาวน์ ครั้งที่ 27 (Opengown Camp 27th) เปิดประสบการณ์ ค้นหาตัวตนได้ที่ คณะแพทยศาสตร์วชิรพยาบาล มหาวิทยาลัยนวมินทราธิราช
            </p>
            
            {/* Countdown Timer with Glassmorphism */}
            <div className="py-2 max-w-xl mx-auto lg:mx-0">
              <div className="rounded-2xl border border-primary/20 bg-white/90 p-5 shadow-[0_18px_50px_-30px_rgba(123,89,72,0.35)] backdrop-blur-sm">
                <CountdownTimer targetDate={applicationDeadline} />
              </div>
            </div>

            {/* Action Buttons - Pastel Orange/Amber */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2 max-w-xl mx-auto lg:mx-0">
              <a
                href="https://forms.gle/nmBzRyd8rUPnWgTRA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-2xl text-white bg-gradient-to-r from-accent to-color-light hover:from-accent hover:to-color-gray transform hover:-translate-y-0.5 transition-all shadow-md shadow-accent/20"
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
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl -z-10"></div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section - Clean White Background */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">ABOUT OPENGOWNCAMP 27TH</h2>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Users, label: 'ผู้เข้าร่วม', value: '130', unit: 'คน', color: '#7B5948' },
              { icon: Calendar, label: 'ระยะเวลาค่าย', value: '3', unit: 'วัน', color: 'bg-color-teal text-color-dark' },
              { icon: Heart, label: 'ครั้งที่', value: '27', unit: '', color: 'bg-color-pink text-color-dark' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow text-center">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: stat.color === '#7B5948' ? stat.color : '', color: stat.color === '#7B5948' ? '#fff' : '' }}
                  >
                    {stat.color === '#7B5948' ? (
                      <Icon size={28} />
                    ) : (
                      <div className={`${stat.color} w-full h-full rounded-xl flex items-center justify-center`}>
                        <Icon size={28} />
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-slate-700 mb-1">{stat.label}</div>
                  <div className="text-3xl font-bold text-slate-800">
                    {stat.value}
                    {stat.unit && <span className="ml-1">{stat.unit}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Join Section - Light Gray Background */}
      <section className="py-20 px-4 bg-gradient-to-b from-color-light to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">WHY OPENGOWN ?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              น้อง ๆ ที่กำลังมีเป้าหมายว่าอยากเป็นหมอ หรือกำลังค้นหาตัวตนว่าตัวเองเหมาะกับเส้นทางนี้ไหม
              มาร่วมค้นหาคำตอบว่าคณะแพทย์เหมาะกับเราหรือไม่ได้แล้ววันนี้!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Stethoscope,
                title: 'สัมผัสประสบการณ์จริง',
                description: 'เปิดโอกาสให้น้อง ๆ ได้สัมผัสประสบการ์ณการเป็น \'นักศึกษาแพทย์\' โดยตรง ทั้งในระดับ pre-clinic และ clinic',
                color: 'bg-primary',
                accentColor: 'bg-primary/10 text-primary'
              },
              {
                icon: Group,
                title: 'กิจกรรมอัดแน่น',
                description: 'ได้ทั้งความรู้ และความสนุก รวมถึงคำแนะนำและประสบการณ์ต่าง ๆ จากรุ่นพี่ตัวจริง',
                color: 'bg-secondary',
                accentColor: 'bg-secondary/10 text-secondary'
              },
              {
                icon: Heart,
                title: 'มิตรภาพใหม่',
                description: 'พบเพื่อนใหม่มมากมายที่พร้อมจะทำตามความฝันไปด้วยกัน',
                color: 'bg-accent',
                accentColor: 'bg-accent/10 text-accent'
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">TIMELINE</h2>
          <p className="text-lg text-slate-600 mb-12">
            อย่าพลาดทุกช่วงเวลาสำคัญของการสมัครเข้าร่วมค่าย
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { step: '', title: 'เปิดรับสมัคร', desc: '15 สิงหาคม 2569 - 19 กันยายน 2569', color: 'border-primary' },
              { step: '', title: 'ประกาศผล', desc: '1 ตุลาคม 2569', color: 'border-secondary' },
              { step: '', title: 'ประกาศผลสำรอง', desc: '6 ตุลาคม 2569', color: 'border-accent' },
              { step: '', title: 'วันจัดค่าย', desc: '6-8 พฤศจิกายน 2569', color: 'border-color-blue' }
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
            className="inline-flex items-center text-primary hover:text-secondary font-medium"
          >
            กำหนดการรับสมัคร
            <Rocket className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* CTA Section - Gradient Background */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            พร้อมจะเป็นส่วนหนึ่งของค่ายเปิดเสื้อกาวน์ ครั้งที่ 27 หรือยัง?
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            สมัครเลยวันนี้ อย่าพลาดโอกาสดีๆ ที่จะเปลี่ยนอนาคตของคุณ
          </p>
          <a
            href="https://forms.gle/nmBzRyd8rUPnWgTRA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary font-bold py-4 px-12 rounded-xl text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-xl"
          >
            สมัครเลยตอนนี้
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
