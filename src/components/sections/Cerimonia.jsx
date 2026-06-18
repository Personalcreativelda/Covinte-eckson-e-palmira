export default function Cerimonia({ settings = {} }) {
  const tituloCerimonia = settings.titulo_cerimonia || 'Cerimónia'
  const tituloRecepcao  = settings.titulo_recepcao  || 'Recepção'
  const dressCode       = settings.dress_code       || 'Traje formal / Capulana elegante'
  const jantar          = settings.jantar            || 'Buffet Completo & Open Bar'

  return (
    <section id="cerimonia" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
            {tituloCerimonia} &amp; {tituloRecepcao}
          </h2>
          <p className="text-base md:text-xl text-gray-600">Detalhes do nosso dia especial</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Cerimónia */}
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 md:p-10 shadow-xl">
            <div className="text-center mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <i className="fa-solid fa-church text-rose-600 text-2xl md:text-3xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">{tituloCerimonia}</h3>
            </div>
            <div className="space-y-4 md:space-y-6">
              <Row icon="fa-clock"        color="text-rose-600" label="Horário"    value={settings.hora_cerimonia  || '16:00h'} />
              <Row icon="fa-location-dot" color="text-rose-600" label="Local"      value={settings.local_cerimonia || 'A confirmar'} sub={settings.morada_cerimonia} mapUrl={settings.mapa_cerimonia} />
              <Row icon="fa-shirt"        color="text-rose-600" label="Dress Code" value={dressCode} />
            </div>
          </div>

          {/* Recepção */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 md:p-10 shadow-xl">
            <div className="text-center mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <i className="fa-solid fa-champagne-glasses text-yellow-600 text-2xl md:text-3xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">{tituloRecepcao}</h3>
            </div>
            <div className="space-y-4 md:space-y-6">
              <Row icon="fa-clock"        color="text-yellow-600" label="Horário" value={settings.hora_recepcao  || '18:00h'} />
              <Row icon="fa-location-dot" color="text-yellow-600" label="Local"   value={settings.local_recepcao || 'A confirmar'} sub={settings.morada_recepcao} mapUrl={settings.mapa_recepcao} />
              <Row icon="fa-utensils"     color="text-yellow-600" label="Jantar"  value={jantar} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ icon, color, label, value, sub, mapUrl }) {
  return (
    <div className="flex items-start">
      <i className={`fa-solid ${icon} ${color} text-lg md:text-xl mr-3 md:mr-4 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm md:text-base">{label}</p>
        <p className="text-gray-600 text-sm md:text-base">{value}</p>
        {sub && <p className="text-gray-500 text-xs md:text-sm">{sub}</p>}
        {mapUrl && (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
            <i className="fa-solid fa-map-location-dot" />Ver no Mapa
          </a>
        )}
      </div>
    </div>
  )
}
