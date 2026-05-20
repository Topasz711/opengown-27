import React from 'react'
import { Calendar, Clock, MapPin, Lock, Unlock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Schedule = () => {
  const { isAuthenticated, user } = useAuth()

  // Public schedule - แสดงให้ทุกคนเห็น
  const publicSchedule = [
    {
      day: 'วันที่ 1',
      date: '6 พฤศจิกายน 2569',
      theme: 'วิชาการและการเรียนรู้',
      activities: [
        { time: '08:00-09:00', name: 'ลงทะเบียนและเปิดค่าย', location: 'หอประชุม' },
        { time: '09:00-12:00', name: 'กิจกรรม Gross Anatomy', location: 'ตึกเรียนรวม' },
        { time: '13:00-16:00', name: 'Clinical Skills Workshop', location: 'ศูนย์ฝึกทักษะ' },
        { time: '16:00-18:00', name: 'Talk & Inspiration', location: 'หอประชุม' },
      ]
    },
    {
      day: 'วันที่ 2',
      date: '7 พฤศจิกายน 2569',
      theme: 'สัมผัสประสบการณ์จริง',
      activities: [
        { time: '08:00-12:00', name: 'Hospital Tour (ER & OR)', location: 'โรงพยาบาล' },
        { time: '13:00-16:00', name: 'Workshop หัตถการทางการแพทย์', location: 'ศูนย์ฝึกทักษะ' },
        { time: '16:00-18:00', name: 'กิจกรรมกลุ่มสัมพันธ์', location: 'ลานกิจกรรม' },
      ]
    },
    {
      day: 'วันที่ 3',
      date: '8 พฤศจิกายน 2569',
      theme: 'สร้างสรรค์และสรุปบทเรียน',
      activities: [
        { time: '08:00-12:00', name: 'เตรียมการแสดงละครค่าย', location: 'หอประชุม' },
        { time: '13:00-15:00', name: 'แสดงละครค่าย', location: 'หอประชุม' },
        { time: '15:00-16:00', name: 'ปิดค่ายและมอบประกาศนียบัตร', location: 'หอประชุม' },
      ]
    }
  ]

  // Private schedule - แสดงเฉพาะผู้ที่ผ่านการคัดเลือก
  const privateSchedule = [
    {
      day: 'วันที่ 1',
      date: '6 พฤศจิกายน 2569',
      theme: 'วิชาการและการเรียนรู้',
      activities: [
        { time: '07:30-08:30', name: 'ลงทะเบียนและรับอุปกรณ์', location: 'หอประชุม วชิรพยาบาล', detail: 'แต่งกายด้วยชุดนักเรียน' },
        { time: '08:30-09:30', name: 'พิธีเปิดค่าย', location: 'หอประชุม วชิรพยาบาล', detail: 'พบปะอาจารย์และพี่ๆ' },
        { time: '09:30-10:30', name: 'Ice Breaking & Team Building', location: 'หอประชุม วชิรพยาบาล', detail: 'ทำความรู้จักเพื่อนใหม่' },
        { time: '10:30-12:00', name: 'Gross Anatomy Session 1', location: 'ห้อง Gross Anatomy ชั้น 3', detail: 'แบ่งกลุ่ม A และ B' },
        { time: '12:00-13:00', name: 'พักกลางวัน', location: 'โรงอาหาร', detail: '' },
        { time: '13:00-15:00', name: 'Gross Anatomy Session 2', location: 'ห้อง Gross Anatomy ชั้น 3', detail: 'สลับกลุ่ม' },
        { time: '15:00-16:30', name: 'Clinical Skills: Basic Life Support', location: 'ศูนย์ฝึกทักษะคลินิก', detail: 'CPR และ AED' },
        { time: '16:30-18:00', name: 'Talk: ชีวิตนักศึกษาแพทย์', location: 'หอประชุม วชิรพยาบาล', detail: 'โดยรุ่นพี่ชั้นปีต่างๆ' },
        { time: '18:00-19:00', name: 'พักเย็น', location: 'โรงอาหาร', detail: '' },
        { time: '19:00-21:00', name: 'Night Activity: Medical Quiz', location: 'หอประชุม วชิรพยาบาล', detail: 'แข่งขันตอบปัญหา' },
      ]
    },
    {
      day: 'วันที่ 2',
      date: '7 พฤศจิกายน 2569',
      theme: 'สัมผัสประสบการณ์จริง',
      activities: [
        { time: '07:30-08:30', name: 'อาหารเช้า', location: 'โรงอาหาร', detail: '' },
        { time: '08:30-11:30', name: 'Hospital Tour: Emergency Room', location: 'ห้องฉุกเฉิน', detail: 'ดูการทำงานของแพทย์ ER' },
        { time: '11:30-13:00', name: 'พักกลางวัน', location: 'โรงอาหาร', detail: '' },
        { time: '13:00-15:30', name: 'Hospital Tour: Operating Room', location: 'ห้องผ่าตัด', detail: 'ชมการผ่าตัด (กรณีศึกษา)' },
        { time: '15:30-17:30', name: 'Workshop: Suturing & Injection', location: 'ศูนย์ฝึกทักษะคลินิก', detail: 'ฝึกเย็บแผลและฉีดยา' },
        { time: '17:30-19:00', name: 'พักเย็น', location: 'โรงอาหาร', detail: '' },
        { time: '19:00-21:30', name: 'Recreation Night', location: 'ลานกิจกรรม', detail: 'เกมสันทนาการและเต้นรำ' },
      ]
    },
    {
      day: 'วันที่ 3',
      date: '8 พฤศจิกายน 2569',
      theme: 'สร้างสรรค์และสรุปบทเรียน',
      activities: [
        { time: '07:30-08:30', name: 'อาหารเช้า', location: 'โรงอาหาร', detail: '' },
        { time: '08:30-11:30', name: 'เตรียมการแสดงละคร', location: 'หอประชุม วชิรพยาบาล', detail: 'ซ้อมละครแต่ละกลุ่ม' },
        { time: '11:30-13:00', name: 'พักกลางวัน', location: 'โรงอาหาร', detail: '' },
        { time: '13:00-15:30', name: 'การแสดงละครค่าย', location: 'หอประชุม วชิรพยาบาล', detail: 'นำเสนอผลงาน' },
        { time: '15:30-16:30', name: 'พิธีปิดและมอบประกาศนียบัตร', location: 'หอประชุม วชิรพยาบาล', detail: '' },
        { time: '16:30-17:00', name: 'เดินทางกลับโดยปลอดภัย', location: '-', detail: '' },
      ]
    }
  ]

  const scheduleToShow = isAuthenticated && user?.status === 'accepted' ? privateSchedule : publicSchedule
  const isPrivateView = isAuthenticated && user?.status === 'accepted'

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="section-title">ตารางกิจกรรมค่าย</h2>
          
          {/* Access Level Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-4">
            {isPrivateView ? (
              <>
                <Unlock size={20} className="text-green-500" />
                <span className="text-green-600 font-semibold">มุมมองแบบเต็ม (สำหรับผู้ผ่านการคัดเลือก)</span>
              </>
            ) : (
              <>
                <Lock size={20} className="text-gray-400" />
                <span className="text-gray-600">มุมมองสาธารณะ</span>
                {!isAuthenticated && (
                  <a href="/login" className="text-primary hover:underline ml-2">
                    เข้าสู่ระบบเพื่อดูรายละเอียดเพิ่มเติม
                  </a>
                )}
              </>
            )}
          </div>

          <div className="flex justify-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>6-8 พฤศจิกายน 2569</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>คณะแพทยศาสตร์วชิรพยาบาล</span>
            </div>
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="space-y-8">
          {scheduleToShow.map((daySchedule, index) => (
            <div key={index} className="card border-t-4 border-primary">
              <div className="bg-primary text-white p-4 rounded-t-lg -m-6 mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{daySchedule.day}</h3>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{daySchedule.date}</span>
                  </div>
                </div>
                <p className="text-blue-100 mt-1">ธีม: {daySchedule.theme}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">เวลา</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">กิจกรรม</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">สถานที่</th>
                      {isPrivateView && (
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">หมายเหตุ</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {daySchedule.activities.map((activity, actIndex) => (
                      <tr key={actIndex} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                          {activity.time}
                        </td>
                        <td className="py-3 px-4 text-gray-800 font-medium">
                          {activity.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {activity.location}
                        </td>
                        {isPrivateView && (
                          <td className="py-3 px-4 text-gray-500 text-sm">
                            {activity.detail || '-'}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h4 className="font-bold text-yellow-800 mb-2">⚠️ หมายเหตุสำคัญ</h4>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• กรุณามาถึงก่อนเวลาเริ่มกิจกรรมอย่างน้อย 30 นาที</li>
            <li>• แต่งกายด้วยชุดนักเรียนหรือชุดที่ระบุในแต่ละกิจกรรม</li>
            <li>• เตรียมอุปกรณ์ส่วนตัวตามที่แจ้งในเอกสารยืนยันสิทธิ์</li>
            <li>• ตารางกิจกรรมอาจมีการเปลี่ยนแปลงตามความเหมาะสม</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Schedule
