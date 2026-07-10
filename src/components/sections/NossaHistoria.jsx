import Reveal from '../common/Reveal'

const DEFAULTS = {
  historia_foto_1: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e5e69c67ac-b0ac68c1c70966051e4c.png',
  historia_foto_2: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4079528814-3090d7901e9b3b99216c.png',
  historia_foto_3: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d22a5aec47-ef3f73643a0c42cdad85.png',
}

export default function NossaHistoria({ settings = {} }) {
  const foto1 = settings.historia_foto_1 || DEFAULTS.historia_foto_1
  const foto2 = settings.historia_foto_2 || DEFAULTS.historia_foto_2
  const foto3 = settings.historia_foto_3 || DEFAULTS.historia_foto_3

  return (
    <section id="nossa-historia" className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Reveal className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-3 md:mb-4">Nossa Historia</h2>
          <p className="text-base md:text-xl text-gray-600">Uma jornada de amor e cumplicidade</p>
        </Reveal>

        {/* Bloco 1 */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-10 md:mb-20">
          <Reveal className="order-2 md:order-1">
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-full flex items-center justify-center mr-3 md:mr-4 shrink-0">
                  <i className="fa-solid fa-heart text-rose-600 text-lg md:text-xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800">Primeiro Encontro</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                Foi num momento especial que os dois se encontraram pela primeira vez.
                Um sorriso, um olhar, e o destino tratou de fazer o resto.
              </p>
              <p className="text-rose-600 font-semibold">2018</p>
            </div>
          </Reveal>
          <Reveal delay={150} className="order-1 md:order-2 h-56 md:h-80 overflow-hidden rounded-2xl shadow-xl">
            <img className="w-full h-full object-cover transition duration-500 hover:scale-110" src={foto1} alt="Primeiro Encontro" />
          </Reveal>
        </div>

        {/* Bloco 2 */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-10 md:mb-20">
          <Reveal className="h-56 md:h-80 overflow-hidden rounded-2xl shadow-xl">
            <img className="w-full h-full object-cover transition duration-500 hover:scale-110" src={foto2} alt="O Pedido" />
          </Reveal>
          <Reveal delay={150}>
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-full flex items-center justify-center mr-3 md:mr-4 shrink-0">
                  <i className="fa-solid fa-ring text-rose-600 text-lg md:text-xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800">O Pedido</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                Num momento inesquecivel, Eckson ajoelhou-se e pediu Palmira em casamento.
                Com lagrimas nos olhos, ela disse sim ao amor da sua vida.
              </p>
              <p className="text-rose-600 font-semibold">2022</p>
            </div>
          </Reveal>
        </div>

        {/* Bloco 3 */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <Reveal className="order-2 md:order-1">
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-full flex items-center justify-center mr-3 md:mr-4 shrink-0">
                  <i className="fa-solid fa-church text-rose-600 text-lg md:text-xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800">O Grande Dia</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                Agora chegou o momento de celebrar nosso amor com as pessoas mais especiais.
                Queremos compartilhar este dia magico com voce!
              </p>
              <p className="text-rose-600 font-semibold">03 de Outubro de 2026</p>
            </div>
          </Reveal>
          <Reveal delay={150} className="order-1 md:order-2 h-56 md:h-80 overflow-hidden rounded-2xl shadow-xl">
            <img className="w-full h-full object-cover transition duration-500 hover:scale-110" src={foto3} alt="O Grande Dia" />
          </Reveal>
        </div>

      </div>
    </section>
  )
}
