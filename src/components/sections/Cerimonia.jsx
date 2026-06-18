export default function Cerimonia({ settings = {} }) {
  return (
    <section id="cerimonia" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Cerimónia &amp; Recepção
          </h2>
          <p className="text-xl text-gray-600">Detalhes do nosso dia especial</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cerimónia */}
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-10 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fa-solid fa-church text-rose-600 text-3xl" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-800">Cerimónia</h3>
            </div>
            <div className="space-y-6">
              <Row icon="fa-clock" color="text-rose-600"  label="Horário" value={settings.hora_cerimonia  || '16:00h'} />
              <Row icon="fa-location-dot" color="text-rose-600" label="Local"   value={settings.local_cerimonia || 'A confirmar'} sub={settings.morada_cerimonia} />
              <Row icon="fa-shirt" color="text-rose-600"  label="Dress Code" value="Traje formal / Capulana elegante" />
            </div>
          </div>

          {/* Recepção */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-10 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fa-solid fa-champagne-glasses text-yellow-600 text-3xl" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-800">Recepção</h3>
            </div>
            <div className="space-y-6">
              <Row icon="fa-clock" color="text-yellow-600" label="Horário" value={settings.hora_recepcao  || '18:00h'} />
              <Row icon="fa-location-dot" color="text-yellow-600" label="Local" value={settings.local_recepcao || 'A confirmar'} sub={settings.morada_recepcao} />
              <Row icon="fa-utensils" color="text-yellow-600" label="Jantar" value="Buffet Completo &amp; Open Bar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ icon, color, label, value, sub }) {
  return (
    <div className="flex items-start">
      <i className={`fa-solid ${icon} ${color} text-xl mr-4 mt-1`} />
      <div>
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: value }} />
        {sub && <p className="text-gray-500 text-sm">{sub}</p>}
      </div>
    </div>
  )
}
