import { useEffect, useRef, useState } from 'react'
import { supabase, getPhotos, uploadPhoto, deletePhoto, updatePhotoCaption } from '../../lib/supabase'

export default function PhotoManager() {
  const [photos, setPhotos]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver]   = useState(false)
  const [uploadErr, setUploadErr] = useState(null)
  const fileRef = useRef()

  const load = async () => {
    setLoading(true)
    try { setPhotos(await getPhotos()) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleFiles = async (files) => {
    const allowed = [...files].filter(f => f.type.startsWith('image/'))
    if (!allowed.length) return
    setUploading(true)
    setUploadErr(null)
    try {
      for (const f of allowed) await uploadPhoto(f)
      await load()
    } catch (err) {
      const msg = err?.message || String(err)
      if (msg.toLowerCase().includes('bucket') || msg.toLowerCase().includes('not found')) {
        setUploadErr('O bucket "wedding-photos" não existe no Supabase Storage. Crie-o seguindo as instruções abaixo.')
      } else if (msg.toLowerCase().includes('policy') || msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('unauthorized') || msg.toLowerCase().includes('403')) {
        setUploadErr('Sem permissão para fazer upload. Verifique as políticas (policies) do bucket no Supabase.')
      } else {
        setUploadErr(`Erro ao fazer upload: ${msg}`)
      }
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDelete = async (id, path) => {
    if (!confirm('Apagar esta foto?')) return
    try { await deletePhoto(id, path); load() } catch (err) { alert('Erro ao apagar: ' + err.message) }
  }

  const handleCaption = async (id, caption) => {
    try { await updatePhotoCaption(id, caption); load() } catch (err) { alert('Erro ao guardar legenda: ' + err.message) }
  }

  if (!supabase) return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10 text-center">
      <i className="fa-solid fa-triangle-exclamation text-amber-400 text-5xl mb-4 block" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">Supabase não configurado</h3>
      <p className="text-gray-600 mb-4">
        Preencha o ficheiro <code className="bg-amber-100 px-1 rounded">.env</code> com as credenciais reais do Supabase.
      </p>
    </div>
  )

  return (
    <div className="space-y-6">

      {/* Erro de upload */}
      {uploadErr && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-circle-exclamation text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-700 font-semibold mb-1">Falha no upload</p>
              <p className="text-red-600 text-sm mb-3">{uploadErr}</p>
              {(uploadErr.includes('bucket') || uploadErr.includes('permissão') || uploadErr.includes('política')) && (
                <div className="bg-white rounded-lg p-4 text-sm text-gray-700 space-y-1 border border-red-100">
                  <p className="font-semibold text-gray-800 mb-2">Como criar o bucket no Supabase:</p>
                  <p>1. Aceda a <strong>app.supabase.com</strong> → o seu projecto</p>
                  <p>2. Menu lateral → <strong>Storage</strong></p>
                  <p>3. Clique em <strong>"New bucket"</strong></p>
                  <p>4. Nome: <code className="bg-gray-100 px-1 rounded">wedding-photos</code> — marque <strong>Public bucket</strong></p>
                  <p>5. Clique em <strong>Save</strong> e tente o upload novamente</p>
                </div>
              )}
            </div>
            <button onClick={() => setUploadErr(null)} className="text-red-400 hover:text-red-600">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition
          ${dragOver ? 'border-rose-500 bg-rose-50' : 'border-gray-300 hover:border-rose-400 hover:bg-rose-50/50'}`}>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
          onChange={e => handleFiles(e.target.files)} />
        {uploading
          ? <><i className="fa-solid fa-spinner fa-spin text-rose-500 text-4xl mb-3 block" /><p className="text-gray-600 font-medium">A carregar fotos…</p></>
          : <>
              <i className="fa-solid fa-cloud-arrow-up text-rose-400 text-5xl mb-4 block" />
              <p className="text-gray-700 font-semibold text-lg">Arraste fotos para aqui</p>
              <p className="text-gray-500 text-sm mt-1">ou clique para seleccionar ficheiros</p>
              <p className="text-gray-400 text-xs mt-3">JPG, PNG, WEBP — múltiplas fotos de uma vez</p>
            </>
        }
      </div>

      {/* Gallery grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-400"><i className="fa-solid fa-spinner fa-spin text-3xl" /></div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <i className="fa-solid fa-images text-4xl mb-3 block" />
          <p>Ainda não há fotos. Faça upload acima.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">{photos.length} foto{photos.length !== 1 ? 's' : ''} na galeria</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map(p => (
              <PhotoCard key={p.id} photo={p}
                onDelete={() => handleDelete(p.id, p.storage_path)}
                onCaption={cap => handleCaption(p.id, cap)} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function PhotoCard({ photo, onDelete, onCaption }) {
  const [editing, setEditing] = useState(false)
  const [cap, setCap]         = useState(photo.caption || '')

  const save = () => { onCaption(cap); setEditing(false) }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden group">
      <div className="relative">
        <img src={photo.url} alt={photo.caption} className="w-full h-40 object-cover" />
        <button onClick={onDelete}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow">
          <i className="fa-solid fa-trash text-xs" />
        </button>
      </div>
      <div className="p-3">
        {editing ? (
          <div className="flex gap-1">
            <input value={cap} onChange={e => setCap(e.target.value)} autoFocus
              onKeyDown={e => e.key === 'Enter' && save()}
              placeholder="Legenda…"
              className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-rose-400" />
            <button onClick={save} className="text-green-600 hover:text-green-800 px-1">
              <i className="fa-solid fa-check text-xs" />
            </button>
            <button onClick={() => setEditing(false)} className="text-gray-400 hover:text-gray-600 px-1">
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)}
            className="w-full text-left text-xs text-gray-500 hover:text-rose-600 transition truncate">
            {photo.caption || <span className="italic text-gray-300">+ Adicionar legenda</span>}
          </button>
        )}
      </div>
    </div>
  )
}
