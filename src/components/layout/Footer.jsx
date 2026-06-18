export default function Footer({ settings = {} }) {
  const year  = settings.ano_casamento  || '2026'
  const local = settings.local_recepcao || 'Moçambique'

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <div className="text-5xl font-serif font-bold text-rose-400 mb-4">E &amp; P</div>
        <p className="text-gray-400 mb-2 text-lg">
          {settings.data_display || '03 de Outubro, 2026'}
        </p>
        <p className="text-gray-500 mb-8">Com amor e gratidão por partilhar este momento connosco</p>
        <i className="fa-solid fa-heart text-rose-400 text-3xl mb-8 block" />
        <p className="text-gray-600 text-sm">© {year} Casamento Eckson &amp; Palmira. Feito com amor.</p>
        <a href="/admin" className="text-gray-800 hover:text-gray-600 text-xs mt-6 inline-block transition">
          ⚙ Administração
        </a>
      </div>
    </footer>
  )
}
