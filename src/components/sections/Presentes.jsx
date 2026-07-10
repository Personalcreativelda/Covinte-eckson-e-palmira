import Reveal from '../common/Reveal'

function parseContactos(texto) {
  return [...texto.matchAll(/([+\d][\d\s]*\d)\s*\(([^)]+)\)/g)]
    .map(([, numero, nome]) => ({ numero: numero.trim(), nome: nome.trim() }))
}

function Metodo({ label, valor }) {
  const contactos = parseContactos(valor)

  return (
    <div>
      <p className="text-gray-700 font-semibold text-sm md:text-base uppercase tracking-wide mb-4 md:mb-5">
        {label}
      </p>

      {contactos.length > 0 ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          {contactos.map(({ numero, nome }) => (
            <div key={nome} className="text-center transition transform hover:scale-105">
              <p className="text-rose-700 font-bold text-lg md:text-xl tracking-wide">{numero}</p>
              <p className="text-gray-500 text-sm md:text-base">{nome}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-rose-700 font-bold text-base md:text-lg">{valor}</p>
      )}
    </div>
  )
}

export default function Presentes({ settings = {} }) {
  const mpesa = settings.mpesa || 'A confirmar'
  const emola = settings.emola || '+258862111849 (Eckson) +258864977070 (Palmira)'

  return (
    <section id="presentes" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <Reveal className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
            Presenteie os Noivos
          </h2>
          <p className="text-base md:text-xl text-gray-600">A sua presença é o nosso maior presente, mas se desejar presentear-nos…</p>
        </Reveal>

        <Reveal delay={150}>
          <div className="bg-rose-50 rounded-2xl p-6 md:p-8 text-center space-y-6 md:space-y-8 transition hover:shadow-lg">
            <i className="fa-solid fa-heart text-rose-600 text-2xl md:text-3xl block" />

            <Metodo label="M-Pesa" valor={mpesa} />

            <div className="border-t border-rose-200" />

            <Metodo label="E-mola" valor={emola} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
