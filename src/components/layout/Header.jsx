import { useState } from 'react'

const links = [
  { href: '#hero',          label: 'Início' },
  { href: '#nossa-historia', label: 'Nossa História' },
  { href: '#cerimonia',     label: 'Cerimónia' },
  { href: '#galeria',       label: 'Galeria' },
  { href: '#presentes',     label: 'Presentes' },
  { href: '#rsvp',          label: 'Confirmar Presença' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-rose-600">E &amp; P</div>

          <div className="hidden md:flex space-x-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-gray-700 hover:text-rose-600 transition font-medium text-sm">
                {l.label}
              </a>
            ))}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700">
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-2xl`} />
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block text-gray-700 hover:text-rose-600 font-medium py-1">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
