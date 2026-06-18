export default function Hero({ settings = {} }) {
  const data = settings.data_display || '03 de Outubro, 2026'
  const foto = settings.foto_hero    || null

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10" />

      {foto
        ? <img src={foto} alt="Foto do casal"
            className="absolute inset-0 w-full h-full object-cover object-center" />
        : <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-rose-600" />
      }

      <div className="relative z-20 text-center text-white px-6 w-full max-w-4xl mx-auto">
        <i className="fa-solid fa-heart text-3xl md:text-5xl text-rose-300 animate-pulse mb-4 md:mb-6 block" />
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold mb-3 md:mb-4 leading-tight">
          Eckson &amp; Palmira
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl font-light mb-6 md:mb-8 tracking-wide">
          Estamos a casar!
        </p>
        <p className="font-serif font-semibold text-base sm:text-xl mb-8 md:mb-12 text-rose-100">
          {data}
        </p>
        <a href="#rsvp"
          className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition transform hover:scale-105 shadow-lg">
          Confirmar Presença
        </a>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <i className="fa-solid fa-chevron-down text-white text-2xl md:text-3xl" />
      </div>
    </section>
  )
}
