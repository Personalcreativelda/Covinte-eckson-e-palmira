import { useState } from 'react'

const faqs = [
  {
    q: 'Qual é o traje para o evento?',
    a: 'O traje é formal. As senhoras podem usar capulana elegante, vestido ou conjunto. Os senhores devem vir de fato ou camisa social com calças. Por favor, evitem usar branco, que é reservado para a noiva.',
  },
  {
    q: 'Cada convidado pode trazer acompanhante?',
    a: 'Cada convite é válido para no máximo 2 pessoas. Pedimos que respeitem este limite para que possamos acomodar todos confortavelmente.',
  },
  {
    q: 'Como posso oferecer um presente?',
    a: 'Pode contribuir via M-Pesa ou transferência bancária. Os dados estão disponíveis na secção de presentes acima. Envelopes também são bem-vindos no dia do evento.',
  },
  {
    q: 'Até quando posso confirmar a presença?',
    a: 'Por favor, confirme a sua presença até ao dia 15 de Setembro de 2026. Isso ajuda-nos a organizar melhor o espaço, a refeição e o programa do dia.',
  },
  {
    q: 'Como chegar ao local do evento?',
    a: 'Os detalhes do local serão partilhados em breve. Para quem precisar de boleia, recomendamos combinar com outros convidados. Entre em contacto connosco para mais informações.',
  },
  {
    q: 'Posso tirar fotos durante a cerimónia religiosa?',
    a: 'Durante a cerimónia na igreja pedimos que respeitem o momento sagrado e mantenham os telemóveis em silêncio. Na recepção estão completamente à vontade para fotografar e partilhar os momentos!',
  },
  {
    q: 'A que horas devo chegar?',
    a: 'A cerimónia inicia às 16h00 em ponto. Pedimos que cheguem com pelo menos 15 minutos de antecedência para acomodação. A recepção começa às 18h00.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-rose-50 rounded-xl shadow-lg overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">{q}</span>
        <i className={`fa-solid fa-chevron-down text-rose-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</div>}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">Tire as suas dúvidas sobre o evento</p>
        </div>
        <div className="space-y-4">
          {faqs.map(f => <FAQItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  )
}
