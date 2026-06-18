import { useEffect, useState } from 'react'
import { getPhotos } from '../../lib/supabase'

const PLACEHOLDER_PHOTOS = [
  { id: 'p1', url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/85bef00f5f-7ae48bce970b40e3edbf.png', caption: 'casal sorrindo', span: '' },
  { id: 'p2', url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0374637483-fda3f1cb31250439119f.png', caption: 'casal de maos dadas', span: '' },
  { id: 'p3', url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a4ade3bdeb-81db52771c493d0ec42c.png', caption: 'casal ao por do sol', span: '' },
  { id: 'p4', url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/60f908e902-756f92c750a5ffc56621.png', caption: 'casal dancando', span: '' },
  { id: 'p5', url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/89b454a332-e2040a5616bb3db24dd7.png', caption: 'casal em piquenique', span: 'md:col-span-2' },
  { id: 'p6', url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8950846262-d85798ab1d6f15340552.png', caption: 'casal no jardim', span: 'md:col-span-2' },
]

export default function Galeria() {
  const [photos, setPhotos]     = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getPhotos().then(setPhotos).catch(() => setPhotos([]))
  }, [])

  const list = photos && photos.length > 0 ? photos : PLACEHOLDER_PHOTOS
  const isPlaceholder = !photos || photos.length === 0

  return (
    <section id="galeria" className="py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Galeria de Momentos
          </h2>
          <p className="text-xl text-gray-600">Nossos momentos mais especiais</p>
        </div>

        {isPlaceholder ? (
          /* Layout exacto do HTML com grid 2/4 colunas e col-span */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLACEHOLDER_PHOTOS.map(p => (
              <div key={p.id}
                className={`h-64 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer ${p.span}`}
                onClick={() => setSelected(p)}>
                <img className="w-full h-full object-cover" src={p.url} alt={p.caption} />
              </div>
            ))}
          </div>
        ) : (
          /* Layout masonry para fotos reais carregadas pelo admin */
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {list.map(p => (
              <div key={p.id}
                className="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelected(p)}>
                <img src={p.url} alt={p.caption || 'Foto do casal'}
                  className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          <div className="max-w-4xl max-h-full relative" onClick={e => e.stopPropagation()}>
            <img src={selected.url} alt={selected.caption}
              className="max-h-[85vh] rounded-xl object-contain" />
            {selected.caption && (
              <p className="text-white text-center mt-3 text-sm">{selected.caption}</p>
            )}
            <button onClick={() => setSelected(null)}
              className="absolute -top-4 -right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 shadow-lg">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
