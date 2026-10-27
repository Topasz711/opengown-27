import React from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'

const Schedule = () => {
  // Theme - แสดงไว้ที่ส่วนหัวของหน้าเพียงจุดเดียว
  const theme = 'The Gardenia Secret Door: Where dreams Awaken'

  // Schedule - แสดงให้ทุกคนเห็น (ไม่ต้อง login)
  const schedule = [
    {
      day: 'วันศุกร์ที่ 6 พฤศจิกายน 2569',
      date: '6 พฤศจิกายน 2569',
      activities: [
        { time: '08:00 - 08:30', name: 'ลงทะเบียน ณ ลานเอนกประสงค์ ชั้น 1 อาคารเกษมศรี (KSS)', location: 'อาคารเกษมศรี (KSS)' },
        { time: '08:30 - 09:00', name: 'พิธีเปิดโครงการ โดย คณบดีคณะแพทยศาสตร์วชิรพยาบาล', location: 'อาคารเกษมศรี (KSS)' },
        { time: '09:00 - 09:30', name: 'กิจกรรม ice breaking', location: 'อาคารเกษมศรี (KSS)' },
        { time: '09:30 - 11:30', name: 'กิจกรรมสร้างแรงบันดาลใจ (Med Talk)', location: 'อาคารเกษมศรี (KSS)' },
        { time: '11:30 - 12:15', name: 'กิจกรรมเรียนรู้จากปัญหา (Problem Based Learning-PBL 1)', location: 'อาคารเกษมศรี (KSS)' },
        { time: '12:15 - 13:15', name: 'พักรับประทานอาหารกลางวัน', location: 'อาคารเกษมศรี (KSS)' },
        { time: '13:15 - 15:30', name: 'กิจกรรมสานสัมพันธ์ภายในกลุ่ม', location: 'อาคารเกษมศรี (KSS)' },
        { time: '15:30 - 16:30', name: 'กิจกรรมเรียนรู้จากปัญหา (Problem Based Learning-PBL 2)', location: 'อาคารเกษมศรี (KSS)' },
        { time: '16:30 - 16:45', name: 'กิจกรรม Time Machine', location: 'อาคารเกษมศรี (KSS)' },
        { time: '16:45 - 17:00', name: 'ชี้แจงกำหนดการ วันเสาร์ที่ 7 พฤศจิกายน 2569', location: 'อาคารเกษมศรี (KSS)' },
      ]
    },
    {
      day: 'วันเสาร์ที่ 7 พฤศจิกายน 2569',
      date: '7 พฤศจิกายน 2569',
      activities: [
        { time: '07:30 - 08:00', name: 'ลงทะเบียน ณ ลานเอนกประสงค์ ชั้น 1 อาคารเกษมศรี (KSS)', location: 'อาคารเกษมศรี (KSS)' },
        { time: '08:00 - 08:30', name: 'กิจกรรม ice breaking', location: 'อาคารเกษมศรี (KSS)' },
        { time: '08:30 - 12:50', name: 'แนะนำความรู้ทางการแพทย์เบื้องต้น โดย คณะนักศึกษาแพทย์ ชั้นปีที่ 1-3', location: 'อาคารเกษมศรี (KSS)' },
        { time: '12:50 - 13:40', name: 'พักรับประทานอาหารกลางวัน', location: 'อาคารเกษมศรี (KSS)' },
        { time: '13:40 - 14:40', name: 'กิจกรรมเรียนรู้จากปัญหา (Problem Based Learning-PBL 3)', location: 'อาคารเกษมศรี (KSS)' },
        { time: '14:40 - 15:10', name: 'สรุปกิจกรรมเรียนรู้จากปัญหา (Problem Based Learning-Summary PBL1,2,3)', location: 'อาคารเกษมศรี (KSS)' },
        { time: '15:10 - 15:50', name: 'กิจกรรมประมวลความรู้ทางพรีคลินิก', location: 'อาคารเกษมศรี (KSS)' },
        { time: '15:50 - 17:00', name: 'กิจกรรมประมวลผลความรู้ในค่าย', location: 'อาคารเกษมศรี (KSS)' },
        { time: '17:00 - 17:40', name: 'พักรับประทานอาหารว่าง', location: 'อาคารเกษมศรี (KSS)' },
        { time: '17:40 - 19:00', name: 'Concert', location: 'อาคารเกษมศรี (KSS)' },
      ]
    },
    {
      day: 'วันอาทิตย์ที่ 8 พฤศจิกายน 2569',
      date: '8 พฤศจิกายน 2569',
      activities: [
        { time: '07:00 - 07:30', name: 'ลงทะเบียน ณ ลานอเนกประสงค์ ชั้น 6 อาคารทีปังกรรัศมีโชติ', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '07:30 - 07:50', name: 'กิจกรรม ice breaking', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '07:50 - 08:00', name: 'ถ่ายรูปรวม', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '08:00 - 11:00', name: 'แนะนำความรู้ทางการแพทย์เบื้องต้น 1 โดย คณะนักศึกษาแพทย์ ชั้นปีที่ 4-6', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '11:00 - 12:00', name: 'พักรับประทานอาหารกลางวัน', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '12:00 - 14:30', name: 'แนะนำความรู้ทางการแพทย์เบื้องต้น 2 โดย คณะนักศึกษาแพทย์ ชั้นปีที่ 4-6', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '14:30 - 15:00', name: 'สรุปกิจกรรม', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '15:00 - 15:30', name: 'พิธีปิด', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '15:30 - 17:00', name: 'กิจกรรม OPG27th Memories', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '17:00 - 18:00', name: 'กิจกรรมสานสัมพันธ์พี่ค่าย-น้องค่าย', location: 'อาคารทีปังกรรัศมีโชติ' },
      ]
    }
  ]

  return (
    <div className="py-12 bg-gradient-to-b from-color-light to-white min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="section-title">ตารางกิจกรรมค่าย</h2>

          <div className="flex justify-center gap-6 text-gray-600 mb-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>6-8 พฤศจิกายน 2569</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>คณะแพทยศาสตร์วชิรพยาบาล</span>
            </div>
          </div>

          <p className="text-primary font-semibold mb-6">ธีม: {theme}</p>
        </div>

        {/* Schedule Cards */}
        <div className="space-y-8">
          {schedule.map((daySchedule, index) => (
            <div key={index} className="card border-t-4 border-primary">
              <div className="bg-primary text-white p-4 rounded-t-lg -m-6 mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{daySchedule.day}</h3>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{daySchedule.date}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">เวลา</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">กิจกรรม</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">สถานที่</th>
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
            <li>1. ผู้ปกครองสามารถรอรับได้ที่อาคารเกษมศรี ชั้น 1</li>
            <li>2. กำหนดการอาจมีการเปลี่ยนแปลงได้ตามความเหมาะสม</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Schedule
