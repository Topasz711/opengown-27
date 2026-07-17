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
    {
      value: timeLeft.days,
      label: 'วัน',
      style:
        'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20',
    },
    {
      value: timeLeft.hours,
      label: 'ชั่วโมง',
      style:
        'border-blue-100 bg-blue-50 text-blue-700',
    },
    {
      value: timeLeft.minutes,
      label: 'นาที',
      style:
        'border-sky-100 bg-sky-50 text-sky-700',
    },
    {
      value: timeLeft.seconds,
      label: 'วินาที',
      style:
        'border-slate-200 bg-slate-50 text-slate-700',
    },
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
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Clock3 size={20} />
        </span>

        <div>
          <h3 className="font-semibold text-slate-900">
            ปิดรับสมัครในอีก
          </h3>
          <p className="text-xs text-slate-500">
            อย่าลืมส่งใบสมัครภายในเวลาที่กำหนด
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className={`rounded-2xl border px-3 py-4 text-center ${unit.style}`}
          >
            <div className="text-3xl font-extrabold leading-none tracking-tight tabular-nums sm:text-4xl">
              {String(unit.value).padStart(2, '0')}
            </div>

            <div className="mt-2 text-xs font-medium opacity-70">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-2.5 text-sm text-slate-600">
        <CalendarDays
          size={17}
          className="shrink-0 text-amber-600"
        />

        <span>
          ปิดรับสมัคร{' '}
          <strong className="font-semibold text-slate-800">
            {deadlineText}
          </strong>
        </span>
      </div>
    </div>
  )
}

export default CountdownTimer
