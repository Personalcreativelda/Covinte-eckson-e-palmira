import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin      from '../components/admin/AdminLogin'
import RSVPManager     from '../components/admin/RSVPManager'
import PhotoManager    from '../components/admin/PhotoManager'
import SettingsManager from '../components/admin/SettingsManager'

const TABS = [
  { id: 'rsvps',    label: 'Confirmações', icon: 'fa-users' },
  { id: 'fotos',    label: 'Galeria',      icon: 'fa-images' },
  { id: 'settings', label: 'Configurações', icon: 'fa-sliders' },
]

export default function AdminPage() {
  const [session, setSession] = useState(undefined) // undefined = ainda a carregar
  const [tab, setTab]         = useState('rsvps')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // A carregar sessão
  if (session === undefined) return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <i className="fa-solid fa-spinner fa-spin text-rose-400 text-3xl" />
    </div>
  )

  if (!session) return <AdminLogin onLogin={() => {}} />

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40 print:hidden">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-rose-600 transition">
              <i className="fa-solid fa-arrow-left text-xl" />
            </a>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Painel Admin</h1>
              <p className="text-xs text-gray-500">Casamento Eckson &amp; Palmira</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block">{session.user.email}</span>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition" title="Sair">
              <i className="fa-solid fa-right-from-bracket text-xl" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-6 flex gap-1 pb-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition
                ${tab === t.id ? 'border-rose-600 text-rose-600' : 'border-transparent text-gray-500 hover:text-rose-500'}`}>
              <i className={`fa-solid ${t.icon}`} />{t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {tab === 'rsvps'    && <RSVPManager />}
        {tab === 'fotos'    && <PhotoManager />}
        {tab === 'settings' && <SettingsManager />}
      </main>
    </div>
  )
}
