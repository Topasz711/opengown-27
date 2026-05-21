import React from 'react'
import { Stethoscope, Heart, Hospital, Users, Drama } from 'lucide-react'

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: 'Gross Anatomy',
      description: 'สัมผัสประสบการณ์เรียนรู้จากร่างอาจารย์ใหญ่ในห้อง Gross Anatomy ที่ทันสมัย พร้อมคำแนะนำจากอาจารย์ผู้เชี่ยวชาญ',
      icon: Stethoscope,
      color: 'bg-blue-500',
      image: '/images/gross-anatomy.jpg'
    },
    {
      id: 2,
      title: 'Clinical Skills Workshop',
      description: 'เวิร์กช็อปหัตถการทางการแพทย์พื้นฐาน เช่น การเจาะเลือด, CPR, Physical Examination จากพี่ๆ นศพ.',
      icon: Heart,
      color: 'bg-red-500',
      image: '/images/clinical-skills.jpg'
    },
    {
      id: 3,
      title: 'Hospital Tour',
      description: 'บุกห้องฉุกเฉิน (ER) และห้องผ่าตัด (OR) พร้อมชมการทำงานของแพทย์และทีมสหวิชาชีพ',
      icon: Hospital,
      color: 'bg-green-500',
      image: '/images/hospital-tour.jpg'
    },
    {
      id: 4,
      title: 'Talk & Inspiration',
      description: 'การแชร์ประสบการณ์จากอาจารย์หมอและพี่ๆ นศพ. เกี่ยวกับชีวิตการเรียนแพทย์และการทำงานในโรงพยาบาล',
      icon: Users,
      color: 'bg-purple-500',
      image: '/images/talk.jpg'
    },
    {
      id: 5,
      title: 'Recreation & Games',
      description: 'กิจกรรมสันทนาการสานสัมพันธ์ เล่นเกมสนุกๆ กับเพื่อนใหม่มากมาย',
      icon: Drama,
      color: 'bg-orange-500',
      image: '/images/recreation.jpg'
    },
    {
      id: 6,
      title: 'ละครค่าย',
      description: 'แสดงละครสร้างสรรค์ที่ถ่ายทอดเรื่องราวเกี่ยวกับวิชาชีพแพทย์และแรงบันดาลใจ',
      icon: Drama,
      color: 'bg-pink-500',
      image: '/images/drama.jpg'
    }
  ]

  return (
    <div className="py-12 bg-gradient-to-b from-white to-blue-50 pt-24">
      <h2 className="section-title">กิจกรรมภายในค่าย</h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        ค่าย Opengown Camp 27th มีกิจกรรมหลากหลายที่จะทำให้น้องๆ ได้สัมผัสประสบการณ์จริง
        เรียนรู้เกี่ยวกับวิชาชีพแพทย์ และสร้างมิตรภาพใหม่ๆ
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="card hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className={`${activity.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                <Icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {activity.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {activity.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-primary text-white rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            🎯 พร้อมจะเป็นส่วนหนึ่งของ Opengown Camp 27th หรือยัง?
          </h3>
          <p className="mb-6 opacity-90">
            อย่าพลาดโอกาสดีๆ ที่จะได้สัมผัสประสบการณ์แพทย์ก่อนใคร
            สมัครเลยวันนี้!
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            สมัครสมาชิกตอนนี้
          </a>
        </div>
      </div>
    </div>
  )
}

export default Activities
