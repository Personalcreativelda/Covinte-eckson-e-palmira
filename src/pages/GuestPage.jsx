import { useEffect, useState } from 'react'
import { getSettings } from '../lib/supabase'
import Header        from '../components/layout/Header'
import Footer        from '../components/layout/Footer'
import Hero          from '../components/sections/Hero'
import Countdown     from '../components/sections/Countdown'
import NossaHistoria from '../components/sections/NossaHistoria'
import Cerimonia     from '../components/sections/Cerimonia'
import Galeria       from '../components/sections/Galeria'
import Presentes     from '../components/sections/Presentes'
import RSVP          from '../components/sections/RSVP'
import FAQ           from '../components/sections/FAQ'

// Configuração de cada tipo de convite
export const TIPOS = {
  sabado: {
    dias:      'sabado',
    label:     'Sábado — Casamento',
    dataISO:   '2026-10-03T16:00:00',
    dataTexto: '03 de Outubro, 2026',
    badge:     'bg-rose-600',
    eventos:   ['religiosa', 'civil', 'copa'],
  },
  ambos: {
    dias:      'ambos',
    label:     'Sábado & Domingo',
    dataISO:   '2026-10-03T16:00:00',
    dataTexto: '03 & 04 de Outubro, 2026',
    badge:     'bg-purple-600',
    eventos:   ['religiosa', 'civil', 'copa', 'chiguiana'],
  },
  domingo: {
    dias:      'domingo',
    label:     'Domingo — Chiguiana',
    dataISO:   '2026-10-04T14:00:00',
    dataTexto: '04 de Outubro, 2026',
    badge:     'bg-yellow-500',
    eventos:   ['chiguiana'],
  },
}

export default function GuestPage({ tipo = 'sabado' }) {
  const [settings, setSettings] = useState({})
  const config = TIPOS[tipo] || TIPOS.sabado

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {})
  }, [])

  // Injeta a data correcta nas settings para o Countdown
  const settingsComData = {
    ...settings,
    data_casamento: config.dataISO,
    data_display:   settings.data_display || config.dataTexto,
  }

  return (
    <div className="bg-rose-50 font-sans">
      {/* Badge do tipo de convite */}
      <div className={`${config.badge} text-white text-center text-xs font-semibold py-1.5 tracking-widest uppercase`}>
        Convite — {config.label}
      </div>

      <Header tipo={tipo} />
      <Hero          settings={settingsComData} />
      <Countdown     settings={settingsComData} />
      <NossaHistoria settings={settings} />
      <Cerimonia     settings={settings} eventos={config.eventos} />
      <Galeria />
      <Presentes     settings={settings} />
      <RSVP          settings={settings} dias={config.dias} labelDias={config.label} />
      <FAQ           dias={config.dias} />
      <Footer        settings={settings} />
    </div>
  )
}
