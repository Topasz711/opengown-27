import React, { useEffect, useState } from 'react'
import { CalendarDays, Clock3 } from 'lucide-react'
import { calculateTimeLeft } from '../utils/helpers'

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(targetDate)
  )

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }

    updateCountdown()

    const timer = window.setInterval(updateCountdown, 1000)

    return () => window.clearInterval(timer)
  }, [targetDate])

  if (timeLeft.expired) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
        <Clock3
          size={36}
          className="mx-auto mb-3 text-slate-400"
        />
        <p className="font-semibold text-slate-700">
          หมดเขตรับสมัครแล้ว
        </p>
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'วัน' },
    { value: timeLeft.hours, label: 'ชั่วโมง' },
    { value: timeLeft.minutes, label: 'นาที' },
    { value: timeLeft.seconds, label: 'วินาที' },
  ]

  const deadlineText = new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(targetDate))

  return (
    <div aria-label="เวลาที่เหลือก่อนปิดรับสมัคร">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Clock3 size={19} />
        </span>

        <h3 className="font-semibold text-slate-900">
          ปิดรับสมัครในอีก
        </h3>
      </div>

      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-white to-sky-50/70">
        <div className="grid grid-cols-4 divide-x divide-blue-100">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="px-2 py-4 text-center"
            >
              <div
                className={`text-3xl font-extrabold leading-none tracking-tight tabular-nums sm:text-4xl ${
                  index === 0 ? 'text-blue-600' : 'text-slate-800'
                }`}
              >
                {String(unit.value).padStart(2, '0')}
              </div>

              <div
                className={`mt-2 text-xs font-medium ${
                  index === 0 ? 'text-blue-500' : 'text-slate-500'
                }`}
              >
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 px-1 text-sm text-slate-500">
        <CalendarDays size={16} className="shrink-0" />

        <span>
          ปิดรับสมัคร{' '}
          <strong className="font-semibold text-slate-700">
            {deadlineText}
          </strong>
        </span>
      </div>
    </div>
  )
}

export default CountdownTimer
