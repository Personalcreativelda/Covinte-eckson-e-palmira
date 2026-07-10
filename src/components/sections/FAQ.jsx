import { useState } from 'react'
import Reveal from '../common/Reveal'

const faqsPrincipais = [
  {
    q: 'A que horas devo chegar?',
    a: 'Recomendamos chegar com pelo menos 15 a 20 minutos de antecedência a cada momento (civil, igreja e salão), conforme os horários indicados na secção "Cerimónia" deste convite.',
  },
  {
    q: 'Qual é a validade deste convite?',
    a: 'Este convite é pessoal e intransmissível, válido para o número de pessoas nele indicado e para os momentos do dia (cerimónia civil, religiosa e recepção no salão) descritos na secção "Cerimónia".',
  },
  {
    q: 'Onde será a recepção no salão?',
    a: 'O local do salão está indicado na secção "Cerimónia" deste convite, com morada e link para o mapa quando disponível.',
  },
  {
    q: 'Como funciona a cerimónia civil?',
    a: 'A cerimónia civil é o acto legal do casamento, realizado na conservatória/cartório. O horário e o local estão indicados na secção "Cerimónia" deste convite.',
  },
  {
    q: 'Como funciona a cerimónia religiosa (igreja)?',
    a: 'A cerimónia religiosa acontece na igreja, com a bênção nupcial. Pedimos que respeitem o momento sagrado e mantenham os telemóveis em silêncio.',
  },
]

const faqsDomingo = [
  {
    q: 'Qual é o endereço do salão?',
    a: 'O endereço do salão está indicado na secção "Cerimónia" deste convite, com morada e link para o mapa quando disponível.',
  },
  {
    q: 'Como posso obter mais informações (contactos)?',
    a: 'Para qualquer dúvida, pode contactar-nos directamente pelos números +258 84 607 0380 ou +258 84 497 7075.',
  },
  {
    q: 'Como posso oferecer um presente?',
    a: 'Pode contribuir via M-Pesa ou transferência bancária. Os dados estão disponíveis na secção de presentes acima. Envelopes também são bem-vindos no dia do evento.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-rose-50 rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-3">
        <span className="text-base md:text-lg font-bold text-gray-800">{q}</span>
        <i className={`fa-solid fa-chevron-down text-rose-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="px-4 md:px-6 pb-4 md:pb-5 text-gray-600 leading-relaxed text-sm md:text-base">{a}</div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ({ dias = 'sabado' }) {
  const faqs = dias === 'domingo' ? faqsDomingo : faqsPrincipais

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Reveal className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-base md:text-xl text-gray-600">Tire as suas dúvidas sobre o evento</p>
        </Reveal>
        <div className="space-y-3 md:space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <FAQItem {...f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
