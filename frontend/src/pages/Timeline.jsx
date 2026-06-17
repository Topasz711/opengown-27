import React from 'react'

const TimelinePage = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          กำหนดการรับสมัคร
        </h1>
        <p className="text-center text-gray-600 mb-12">
          ติดตามไทม์ไลน์และวันที่สำคัญของการสมัครค่าย Opengown Camp 27th
        </p>

        {/* Import and use the Timeline component */}
        {/* We'll create a simple version here for now */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"></div>
          
          <div className="space-y-12">
            {[
              {
                title: 'เปิดรับสมัคร',
                date: '15 สิงหาคม 2569',
                endDate: '19 กันยายน 2569, 23:59 น.',
                description: 'ช่วงเวลารับสมัครเข้าร่วมค่ายออนไลน์',
                status: 'current',
                color: 'bg-blue-500'
              },
              {
                title: 'ประกาศผลคัดเลือก',
                date: '15 ตุลาคม 2569',
                description: 'ประกาศรายชื่อผู้ผ่านการคัดเลือกรอบแรก',
                status: 'upcoming',
                color: 'bg-green-500'
              },
              {
                title: 'ยืนยันสิทธิ์',
                date: '15-25 ตุลาคม 2569',
                description: 'ชำระเงินและส่งเอกสารยืนยันสิทธิ์',
                status: 'upcoming',
                color: 'bg-orange-500'
              },
              {
                title: 'วันจัดค่าย',
                date: '6-8 พฤศจิกายน 2569',
                description: 'กิจกรรมค่าย Opengown Camp 27th',
                status: 'upcoming',
                color: 'bg-primary',
                highlight: true
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${item.color} flex items-center justify-center z-10 border-4 border-white shadow-lg`}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`card ${item.highlight ? 'border-l-4 border-accent bg-yellow-50' : ''}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${item.color}`}>
                        {item.status === 'completed' ? 'เสร็จสิ้น' : 
                         item.status === 'current' ? 'กำลังดำเนินการ' : 'ที่จะมาถึง'}
                      </span>
                      {item.highlight && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white">
                          ไฮไลท์
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="text-sm text-gray-500">
                      <div>📅 {item.date}</div>
                      {item.endDate && <div>⏰ ถึง {item.endDate}</div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelinePage
