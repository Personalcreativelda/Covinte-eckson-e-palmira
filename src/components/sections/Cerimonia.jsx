import Reveal from '../common/Reveal'

const DATE_BADGE = {
  religiosa: { label: 'Sáb · 03 Out', color: 'bg-rose-100 text-rose-700' },
  civil:     { label: 'Sáb · 03 Out', color: 'bg-purple-100 text-purple-700' },
  copa:      { label: 'Sáb · 03 Out', color: 'bg-green-100 text-green-700' },
  chiguiana: { label: 'Dom · 04 Out', color: 'bg-yellow-100 text-yellow-800' },
}

const EVENTOS = (s) => [
  {
    key:    'religiosa',
    titulo: s.titulo_religiosa || 'Cerimónia Religiosa',
    icon:   'fa-church',
    cor:    { card: 'from-rose-50 to-rose-100', icon: 'text-rose-600', btn: 'bg-rose-600 hover:bg-rose-700' },
    hora:   s.hora_religiosa   || s.hora_cerimonia  || 'A confirmar',
    local:  s.local_religiosa  || s.local_cerimonia || 'A confirmar',
    morada: s.morada_religiosa || s.morada_cerimonia,
    mapa:   s.mapa_religiosa   || s.mapa_cerimonia,
  },
  {
    key:    'civil',
    titulo: s.titulo_civil || 'Cerimónia Civil',
    icon:   'fa-scale-balanced',
    cor:    { card: 'from-purple-50 to-purple-100', icon: 'text-purple-600', btn: 'bg-purple-600 hover:bg-purple-700' },
    hora:   s.hora_civil   || 'A confirmar',
    local:  s.local_civil  || 'A confirmar',
    morada: s.morada_civil,
    mapa:   s.mapa_civil,
  },
  {
    key:    'copa',
    titulo: s.titulo_copa || 'Copo de Água',
    icon:   'fa-wine-glass',
    cor:    { card: 'from-green-50 to-green-100', icon: 'text-green-600', btn: 'bg-green-600 hover:bg-green-700' },
    hora:   s.hora_copa   || 'A confirmar',
    local:  s.local_copa  || 'A confirmar',
    morada: s.morada_copa,
    mapa:   s.mapa_copa,
  },
  {
    key:    'chiguiana',
    titulo: s.titulo_recepcao || 'Copo de Água',
    icon:   'fa-champagne-glasses',
    cor:    { card: 'from-yellow-50 to-yellow-100', icon: 'text-yellow-600', btn: 'bg-yellow-500 hover:bg-yellow-600' },
    hora:   s.hora_recepcao   || 'A confirmar',
    local:  s.local_recepcao  || 'A confirmar',
    morada: s.morada_recepcao,
    mapa:   s.mapa_recepcao,
  },
]

function gridClass(n) {
  if (n === 1) return 'flex justify-center'
  if (n === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto'
  if (n === 4) return 'grid grid-cols-1 sm:grid-cols-2 gap-6'
  return 'grid grid-cols-1 md:grid-cols-3 gap-6'
}

export default function Cerimonia({ settings = {}, eventos = ['religiosa', 'civil', 'copa', 'chiguiana'] }) {
  const todosEventos = EVENTOS(settings)
  const visiveis = todosEventos.filter(ev => eventos.includes(ev.key))

  return (
    <section id="cerimonia" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Reveal className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
            O Nosso Grande Dia
          </h2>
          <p className="text-base md:text-xl text-gray-600">Detalhes dos momentos especiais</p>
        </Reveal>

        <div className={gridClass(visiveis.length)}>
          {visiveis.map((ev, i) => {
            const badge = DATE_BADGE[ev.key]
            return (
              <Reveal key={ev.key} delay={i * 120} className={visiveis.length === 1 ? 'w-full max-w-sm' : ''}>
              <div
                className={`bg-gradient-to-br ${ev.cor.card} rounded-2xl p-6 md:p-8 shadow-xl flex flex-col h-full transition transform hover:-translate-y-2 hover:shadow-2xl`}>

                {/* Data */}
                {badge && (
                  <div className="text-center mb-3">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                )}

                {/* Ícone + título */}
                <div className="text-center mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <i className={`fa-solid ${ev.icon} ${ev.cor.icon} text-xl md:text-2xl`} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800">{ev.titulo}</h3>
                </div>

                {/* Detalhes */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <i className={`fa-solid fa-clock ${ev.cor.icon} text-base mt-0.5 shrink-0`} />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Horário</p>
                      <p className="text-gray-600 text-sm">{ev.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className={`fa-solid fa-location-dot ${ev.cor.icon} text-base mt-0.5 shrink-0`} />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">Local</p>
                      <p className="text-gray-600 text-sm break-words">{ev.local}</p>
                      {ev.morada && <p className="text-gray-500 text-xs mt-0.5">{ev.morada}</p>}
                    </div>
                  </div>
                </div>

                {/* Botão Como Chegar */}
                <div className="mt-6">
                  {ev.mapa ? (
                    <a href={ev.mapa} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full ${ev.cor.btn} text-white py-2.5 rounded-xl font-semibold text-sm transition`}>
                      <i className="fa-solid fa-map-location-dot" />
                      Como Chegar
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-400 py-2.5 rounded-xl text-sm cursor-not-allowed">
                      <i className="fa-solid fa-map-location-dot" />
                      Como Chegar
                    </div>
                  )}
                </div>
              </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
