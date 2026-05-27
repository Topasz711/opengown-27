import React from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'

const Schedule = () => {
  // Schedule - แสดงให้ทุกคนเห็น (ไม่ต้อง login)
  const schedule = [
    {
      day: 'วันศุกร์ที่ 6 พฤศจิกายน 2569',
      date: '6 พฤศจิกายน 2569',
      theme: 'วันแรกของค่าย',
      activities: [
        { time: '08:00-08:30', name: 'ลงทะเบียน ณ ห้องประชุม 1 ชั้น 6 อาคารทีปังกรรัศมีโชติ', location: 'อาคารทีปังกรรัศมีโชติ' },
        { time: '08:30-09:00', name: 'พิธีเปิดโครงการค่ายเปิดเสื้อกาวน์ ครั้งที่ 27 โดยคณบดีคณะแพทยศาสตร์วชิรพยาบาล', location: 'ห้องประชุม' },
        { time: '09:00-09:40', name: 'กิจกรรมละลายพฤติกรรม (Ice breaking) ณ ห้องประชุม ชั้น 8 อาคารสำนักงานอธิการบดี (อาคารเกษมศรี)', location: 'อาคารเกษมศรี' },
        { time: '09:40-11:10', name: 'กิจกรรมสร้างแรงบันดาลใจ', location: 'ห้องประชุม' },
        { time: '11:10-12:10', name: 'พักรับประทานอาหารกลางวัน', location: 'โรงอาหาร' },
        { time: '12:10-13:20', name: 'กิจกรรมการเรียนรู้จากปัญหา (Problem-base Learning) โดย นักศึกษาแพทย์ชั้นปีที่ 3', location: 'ห้องประชุม' },
        { time: '13:20-15:10', name: 'กิจกรรมสานสัมพันธ์ภายในกลุ่ม', location: 'ห้องประชุม' },
        { time: '15:10-16:05', name: 'กิจกรรมการเรียนรู้จากปัญหา (Problem-base Learning) โดย นักศึกษาแพทย์ชั้นปีที่ 3', location: 'ห้องประชุม' },
        { time: '16:05-16:20', name: 'กิจกรรม Time Machine', location: 'ห้องประชุม' },
        { time: '16:20-16:40', name: 'ชี้แจงกำหนดการวันเสาร์ที่ 7 พฤศจิกายน 2569', location: 'ห้องประชุม' },
      ]
    },
    {
      day: 'วันเสาร์ที่ 7 พฤศจิกายน 2569',
      date: '7 พฤศจิกายน 2569',
      theme: 'วันที่สองของค่าย',
      activities: [
        { time: '07:30-08:00', name: 'ลงทะเบียน ณ ห้องประชุมชั้น 8 อาคารสำนักงานอธิการบดี (อาคารเกษมศรี)', location: 'อาคารเกษมศรี' },
        { time: '08:00-08:20', name: 'ชี้แจงกิจกรรม และกิจกรรมสันทนาการ', location: 'ห้องประชุม' },
        { time: '08:20-08:30', name: 'สรุปกิจกรรมจากวันศุกร์ที่ 6 พฤศจิกายน 2569', location: 'ห้องประชุม' },
        { time: '08:30-12:50', name: 'แนะแนวความรู้การแพทย์เบื้องต้น โดย นักศึกษาแพทย์ชั้นปีที่ 1-3', location: 'ห้องประชุม' },
        { time: '12:50-13:40', name: 'พักรับประทานอาหารกลางวัน', location: 'โรงอาหาร' },
        { time: '13:40-15:00', name: 'กิจกรรมการเรียนรู้จากปัญหา (Problem-base Learning) โดย นักศึกษาแพทย์ชั้นปีที่ 3', location: 'ห้องประชุม' },
        { time: '15:00-15:10', name: 'พักรับประทานอาหารว่าง', location: 'โรงอาหาร' },
        { time: '15:10-15:50', name: 'กิจกรรมประมวลความรู้', location: 'ห้องประชุม' },
        { time: '15:50-17:40', name: 'กิจกรรมสันทนาการ', location: 'ลานกิจกรรม' },
        { time: '17:40-19:00', name: 'กิจกรรมสานสัมพันธ์พี่น้อง 1', location: 'ห้องประชุม' },
        { time: '19:00-19:10', name: 'ชี้แจงกำหนดการวันอาทิตย์ที่ 8 พฤศจิกายน 2569', location: 'ห้องประชุม' },
      ]
    },
    {
      day: 'วันอาทิตย์ที่ 8 พฤศจิกายน 2569',
      date: '8 พฤศจิกายน 2569',
      theme: 'วันสุดท้ายของค่าย',
      activities: [
        { time: '07:30-08:00', name: 'ลงทะเบียน ณ ลานอเนกประสงค์ ชั้น 8 อาคารสำนักงานอธิการบดี (อาคารเกษมศรี)', location: 'อาคารเกษมศรี' },
        { time: '08:00-08:25', name: 'ชี้แจงกิจกรรม และกิจกรรมสันทนาการ', location: 'ห้องประชุม' },
        { time: '08:25-11:15', name: 'แนะแนวความรู้ทางคลินิก 1 โดย นักศึกษาแพทย์ 4-6', location: 'ห้องประชุม' },
        { time: '11:15-12:15', name: 'พักรับประทานอาหารกลางวัน', location: 'โรงอาหาร' },
        { time: '12:15-14:40', name: 'แนะแนวความรู้ทางคลินิก 2 โดย นักศึกษาแพทย์ 4-6', location: 'ห้องประชุม' },
        { time: '14:40-15:00', name: 'พักรับประทานอาหารว่าง', location: 'โรงอาหาร' },
        { time: '15:00-15:20', name: 'สรุปกิจกรรม', location: 'ห้องประชุม' },
        { time: '15:20-17:20', name: 'กิจกรรมสานสัมพันธ์พี่น้อง 2', location: 'ห้องประชุม' },
        { time: '17:20-17:35', name: 'พิธีปิดโครงการค่ายเปิดเสื้อกาวน์ ครั้งที่ 27', location: 'ห้องประชุม' },
      ]
    }
  ]

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="section-title">ตารางกิจกรรมค่าย</h2>
          
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
                <p className="text-blue-100 mt-1">ธีม: {daySchedule.theme}</p>
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
