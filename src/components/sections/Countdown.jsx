import { useEffect, useState } from 'react'

function pad(n) { return String(n).padStart(2, '0') }

export default function Countdown({ settings = {} }) {
  const targetDate = settings.data_casamento || '2026-10-03T16:00:00'

  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const units = [
    { label: 'Dias',     value: time.days },
    { label: 'Horas',    value: pad(time.hours) },
    { label: 'Minutos',  value: pad(time.minutes) },
    { label: 'Segundos', value: pad(time.seconds) },
  ]

  return (
    <section id="countdown" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center text-gray-800 mb-8 md:mb-16">
          Contagem Regressiva
        </h2>
        <div className="grid grid-cols-4 gap-3 md:gap-8">
          {units.map(u => (
            <div key={u.label} className="text-center">
              <div className="bg-rose-50 rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg">
                <div className="text-3xl md:text-5xl font-bold text-rose-600 mb-1 md:mb-2">{u.value}</div>
                <div className="text-gray-600 font-medium text-xs md:text-base">{u.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
