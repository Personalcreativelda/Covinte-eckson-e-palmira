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

export default function HomePage() {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {})
  }, [])

  return (
    <div className="bg-rose-50 font-sans">
      <Header />
      <Hero          settings={settings} />
      <Countdown     settings={settings} />
      <NossaHistoria settings={settings} />
      <Cerimonia     settings={settings} />
      <Galeria />
      <Presentes     settings={settings} />
      <RSVP          settings={settings} />
      <FAQ />
      <Footer        settings={settings} />
    </div>
  )
}
