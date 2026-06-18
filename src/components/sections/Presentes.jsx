export default function Presentes({ settings = {} }) {
  const mpesa = settings.mpesa || 'A confirmar'

  return (
    <section id="presentes" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
            Lista de Presentes
          </h2>
          <p className="text-base md:text-xl text-gray-600">A sua presença é o nosso maior presente, mas se desejar presentear-nos…</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          <Card icon="fa-gift"         color="rose"  title="Lista Física"   desc="Escolha presentes da nossa lista em lojas parceiras"  cta="Ver Lista"  href="#" />
          <Card icon="fa-shopping-cart" color="blue" title="Lista Online"   desc="Presentes online com entrega facilitada"               cta="Acessar"    href="#" />
          <Card icon="fa-piggy-bank"   color="green" title="Cota Lua de Mel" desc="Contribua para a nossa viagem dos sonhos"             cta="Contribuir" href="#" />
        </div>

        <div className="mt-8 md:mt-12 bg-rose-50 rounded-2xl p-6 md:p-8 text-center">
          <i className="fa-solid fa-heart text-rose-600 text-2xl md:text-3xl mb-3 md:mb-4 block" />
          <p className="text-gray-700 text-base md:text-lg">
            M-Pesa / Conta bancária: <span className="font-bold text-rose-700">{mpesa}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function Card({ icon, color, title, desc, cta, href }) {
  const colors = {
    rose:  { bg: 'from-rose-50 to-rose-100',  text: 'text-rose-600',  btn: 'bg-rose-600 hover:bg-rose-700' },
    blue:  { bg: 'from-blue-50 to-blue-100',  text: 'text-blue-600',  btn: 'bg-blue-600 hover:bg-blue-700' },
    green: { bg: 'from-green-50 to-green-100', text: 'text-green-600', btn: 'bg-green-600 hover:bg-green-700' },
  }[color]

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 md:p-8 text-center shadow-xl hover:shadow-2xl transition transform hover:scale-105`}>
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
        <i className={`fa-solid ${icon} ${colors.text} text-2xl md:text-3xl`} />
      </div>
      <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800 mb-3 md:mb-4">{title}</h3>
      <p className="text-gray-600 mb-5 md:mb-6 text-sm md:text-base">{desc}</p>
      <a href={href} className={`inline-block ${colors.btn} text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold transition`}>
        {cta}
      </a>
    </div>
  )
}
