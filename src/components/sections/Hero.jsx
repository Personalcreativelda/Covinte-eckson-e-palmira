export default function Hero({ settings = {} }) {
  const data  = settings.data_display  || '03 de Outubro, 2026'
  const local = settings.local_cerimonia || 'Moçambique'
  const foto  = settings.foto_hero      || null

  return (
    <section id="hero" className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ aspectRatio: '16/9', minHeight: '420px', maxHeight: '100vh' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10" />

      {foto
        ? <img src={foto} alt="Foto do casal"
            className="absolute inset-0 w-full h-full object-cover object-top" />
        : <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-rose-600" />
      }

      <div className="relative z-20 text-center text-white px-6">
        <i className="fa-solid fa-heart text-5xl text-rose-300 animate-pulse mb-6 block" />
        <h1 className="font-serif text-6xl md:text-8xl font-bold mb-4">
          Eckson &amp; Palmira
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-8 tracking-wide">
          Estamos a casar!
        </p>
        <div className="flex items-center justify-center text-xl mb-12">
          <span className="font-serif font-semibold">{data}</span>
        </div>
        <a href="#rsvp"
          className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg">
          Confirmar Presença
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <i className="fa-solid fa-chevron-down text-white text-3xl" />
      </div>
    </section>
  )
}
