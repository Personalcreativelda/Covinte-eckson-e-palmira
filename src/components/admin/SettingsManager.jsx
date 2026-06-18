import { useEffect, useState } from 'react'
import { getSettings, saveSetting, uploadToStorage } from '../../lib/supabase'

const FIELDS = [
  { section: 'Títulos das Secções', fields: [
    { key: 'titulo_cerimonia', label: 'Título — Cerimónia',  hint: 'Ex: Cerimónia' },
    { key: 'titulo_recepcao',  label: 'Título — Recepção',   hint: 'Ex: Recepção' },
  ]},
  { section: 'Datas & Locais', fields: [
    { key: 'data_casamento',   label: 'Data (ISO para countdown)', hint: 'Ex: 2026-10-03T16:00:00' },
    { key: 'data_display',     label: 'Data (texto visível)',       hint: 'Ex: 03 de Outubro, 2026' },
    { key: 'ano_casamento',    label: 'Ano',                        hint: '2026' },
    { key: 'hora_cerimonia',   label: 'Hora da Cerimónia',          hint: '16:00h' },
    { key: 'hora_recepcao',    label: 'Hora da Recepção',           hint: '18:00h' },
    { key: 'local_cerimonia',  label: 'Local da Cerimónia',         hint: 'Nome da Igreja' },
    { key: 'morada_cerimonia', label: 'Morada da Cerimónia',        hint: 'Bairro, cidade' },
    { key: 'local_recepcao',   label: 'Local da Recepção',          hint: 'Nome do salão' },
    { key: 'morada_recepcao',  label: 'Morada da Recepção',         hint: 'Bairro, cidade' },
  ]},
  { section: 'Mapa (link Google Maps)', fields: [
    { key: 'mapa_cerimonia', label: 'Link Mapa — Cerimónia', hint: 'https://maps.google.com/?q=...' },
    { key: 'mapa_recepcao',  label: 'Link Mapa — Recepção',  hint: 'https://maps.google.com/?q=...' },
  ]},
  { section: 'Dress Code & Jantar', fields: [
    { key: 'dress_code', label: 'Dress Code',  hint: 'Ex: Traje formal / Capulana elegante' },
    { key: 'jantar',     label: 'Jantar',       hint: 'Ex: Buffet Completo & Open Bar' },
  ]},
  { section: 'Contactos & Presentes', fields: [
    { key: 'mpesa',      label: 'M-Pesa / Conta bancária',   hint: '+258 …' },
    { key: 'prazo_rsvp', label: 'Prazo confirmação (texto)', hint: 'Ex: 15 de Setembro de 2026' },
  ]},
]

export default function SettingsManager() {
  const [settings, setSettings]   = useState({})
  const [saved, setSaved]         = useState({})
  const [uploading, setUploading] = useState({})

  useEffect(() => {
    getSettings().then(s => { setSettings(s); setSaved(s) }).catch(() => {})
  }, [])

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }))

  const save = async (k) => {
    await saveSetting(k, settings[k] || '')
    setSaved(s => ({ ...s, [k]: settings[k] }))
  }

  const isDirty = (k) => settings[k] !== saved[k]

  const handlePhotoUpload = async (key, file, folder = 'misc') => {
    if (!file) return
    setUploading(u => ({ ...u, [key]: true }))
    try {
      const publicUrl = await uploadToStorage(file, folder)
      set(key, publicUrl)
      await saveSetting(key, publicUrl)
      setSaved(s => ({ ...s, [key]: publicUrl }))
    } finally {
      setUploading(u => ({ ...u, [key]: false }))
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">

      {/* Foto do hero */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          <i className="fa-solid fa-image text-rose-500 mr-2" />Foto Principal (Hero)
        </h3>
        {settings.foto_hero && (
          <img src={settings.foto_hero} alt="Hero" className="w-full h-48 object-cover rounded-xl mb-4" />
        )}
        <PhotoUploadBtn
          label="Clique para trocar a foto principal"
          loading={uploading.foto_hero}
          onChange={f => handlePhotoUpload('foto_hero', f, 'hero')} />
      </div>

      {/* Fotos da Nossa Historia */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          <i className="fa-solid fa-heart text-rose-500 mr-2" />Nossa História — Fotos
        </h3>
        <div className="space-y-6">
          {[
            { key: 'historia_foto_1', label: 'Primeiro Encontro (2018)', default: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e5e69c67ac-b0ac68c1c70966051e4c.png' },
            { key: 'historia_foto_2', label: 'O Pedido (2022)',          default: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4079528814-3090d7901e9b3b99216c.png' },
            { key: 'historia_foto_3', label: 'O Grande Dia (2026)',      default: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d22a5aec47-ef3f73643a0c42cdad85.png' },
          ].map(item => (
            <div key={item.key}>
              <p className="text-sm font-semibold text-gray-700 mb-2">{item.label}</p>
              <div className="flex gap-4 items-start">
                <img
                  src={settings[item.key] || item.default}
                  alt={item.label}
                  className="w-24 h-20 object-cover rounded-xl shadow shrink-0" />
                <PhotoUploadBtn
                  label="Trocar foto"
                  loading={uploading[item.key]}
                  onChange={f => handlePhotoUpload(item.key, f, 'historia')} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campos de texto */}
      {FIELDS.map(sec => (
        <div key={sec.section} className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-5">
            <i className="fa-solid fa-sliders text-rose-500 mr-2" />{sec.section}
          </h3>
          <div className="space-y-4">
            {sec.fields.map(f => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <div className="flex gap-2">
                  <input
                    value={settings[f.key] || ''}
                    onChange={e => set(f.key, e.target.value)}
                    placeholder={f.hint}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400 text-sm" />
                  <button
                    onClick={() => save(f.key)}
                    disabled={!isDirty(f.key)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition
                      bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 disabled:cursor-not-allowed">
                    Guardar
                  </button>
                </div>
                {saved[f.key] && <p className="text-xs text-gray-400 mt-1">Actual: {saved[f.key]}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function PhotoUploadBtn({ label, loading, onChange }) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer border-2 border-dashed rounded-xl p-4
      hover:border-rose-400 hover:bg-rose-50 transition flex-1
      ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
      <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'} text-rose-400 text-2xl`} />
      <span className="text-gray-600 text-sm">{loading ? 'A carregar…' : label}</span>
      <input type="file" accept="image/*" className="hidden"
        onChange={e => e.target.files[0] && onChange(e.target.files[0])} />
    </label>
  )
}
