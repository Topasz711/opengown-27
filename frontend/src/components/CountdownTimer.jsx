import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { calculateTimeLeft } from '../utils/helpers'

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (timeLeft.expired) {
    return (
      <div className="text-center py-8">
        <Clock size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">หมดเขตรับสมัครแล้ว</p>
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'วัน', color: 'bg-primary' },
    { value: timeLeft.hours, label: 'ชั่วโมง', color: 'bg-secondary' },
    { value: timeLeft.minutes, label: 'นาที', color: 'bg-accent' },
    { value: timeLeft.seconds, label: 'วินาที', color: 'bg-red-500' },
  ]

  return (
    <div className="text-center py-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        นับถอยหลังสู่วันปิดรับสมัคร
      </h3>
      <div className="grid grid-cols-4 gap-2 w-full max-w-md mx-auto">
        {timeUnits.map((unit, index) => (
          <div key={index} className={`${unit.color} rounded-xl p-3 min-w-0 flex flex-col items-center justify-center`}>
            <div className="text-2xl md:text-3xl font-bold text-white">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-white text-xs mt-1">{unit.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-gray-600">
        📅 ปิดรับสมัคร: {new Date(targetDate).toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} น.
      </p>
    </div>
  )
}

export default CountdownTimer
