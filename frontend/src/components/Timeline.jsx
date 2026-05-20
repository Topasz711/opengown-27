import React from 'react'
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const Timeline = ({ timelineData }) => {
  const defaultTimeline = [
    {
      id: 1,
      title: 'เปิดรับสมัคร',
      date: '2024-09-01',
      endDate: '2024-09-30T23:59:59',
      description: 'ช่วงเวลารับสมัครเข้าร่วมค่ายออนไลน์',
      icon: Calendar,
      color: 'bg-blue-500',
      status: 'completed'
    },
    {
      id: 2,
      title: 'ประกาศผลคัดเลือก',
      date: '2024-10-15',
      description: 'ประกาศรายชื่อผู้ผ่านการคัดเลือกรอบแรก',
      icon: CheckCircle,
      color: 'bg-green-500',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'ยืนยันสิทธิ์',
      date: '2024-10-20',
      endDate: '2024-10-25',
      description: 'ชำระเงินและส่งเอกสารยืนยันสิทธิ์',
      icon: AlertCircle,
      color: 'bg-orange-500',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'วันจัดค่าย',
      date: '2026-11-06',
      endDate: '2026-11-08',
      description: 'กิจกรรมค่าย Opengown Camp 27th',
      icon: Calendar,
      color: 'bg-primary',
      status: 'upcoming',
      highlight: true
    }
  ]

  const timeline = timelineData || defaultTimeline

  return (
    <div className="py-12">
      <h2 className="section-title">กำหนดการรับสมัคร</h2>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"></div>

        <div className="space-y-12">
          {timeline.map((item, index) => {
            const Icon = item.icon
            const isLeft = index % 2 === 0
            const statusColors = {
              completed: 'bg-green-100 border-green-500',
              current: 'bg-blue-100 border-blue-500',
              upcoming: 'bg-gray-100 border-gray-300'
            }

            return (
              <div
                key={item.id}
                className={`relative flex items-center ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${item.color} flex items-center justify-center z-10 border-4 border-white shadow-lg`}
                >
                  <Icon size={16} className="text-white" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    isLeft ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div
                    className={`card border-l-4 ${
                      item.highlight ? 'border-accent bg-yellow-50' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${item.color}`}
                      >
                        {item.status === 'completed' ? 'เสร็จสิ้น' : 
                         item.status === 'current' ? 'กำลังดำเนินการ' : 'ที่จะมาถึง'}
                      </span>
                      {item.highlight && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white">
                          ไฮไลท์
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(item.date).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      {item.endDate && (
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>
                            {new Date(item.endDate).toLocaleDateString('th-TH', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Timeline
