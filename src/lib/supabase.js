import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured =
  url && key &&
  !url.includes('placeholder') &&
  !key.includes('placeholder')

export const supabase = isConfigured ? createClient(url, key) : null

function notConfigured() {
  throw new Error('Supabase não está configurado. Preencha o ficheiro .env com as credenciais reais.')
}

// ── RSVPs ─────────────────────────────────────────────────────────
export async function getRSVPs() {
  if (!supabase) return notConfigured()
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createRSVP(rsvp) {
  if (!supabase) return notConfigured()
  const { data, error } = await supabase.from('rsvps').insert([rsvp]).select().single()
  if (error) throw error
  return data
}

// Procura um RSVP já existente com o mesmo nome + contacto (para evitar duplicados)
export async function findRSVPByContacto(nome, telefone) {
  if (!supabase) return null
  const nomeNorm = (nome || '').trim().toLowerCase()
  const telNorm  = (telefone || '').replace(/\D/g, '')
  if (!nomeNorm) return null

  const { data, error } = await supabase.from('rsvps').select('*').ilike('nome', nomeNorm)
  if (error) throw error

  return (data || []).find(r => {
    const rNome = (r.nome || '').trim().toLowerCase()
    const rTel  = (r.telefone || '').replace(/\D/g, '')
    return rNome === nomeNorm && rTel === telNorm
  }) || null
}

export async function updateRSVP(id, rsvp) {
  if (!supabase) return notConfigured()
  const { error } = await supabase.from('rsvps').update(rsvp).eq('id', id)
  if (error) throw error
}

export async function updateRSVPStatus(id, status) {
  if (!supabase) return notConfigured()
  const { error } = await supabase.from('rsvps').update({ status }).eq('id', id)
  if (error) throw error
}

export async function deleteRSVP(id) {
  if (!supabase) return notConfigured()
  const { error } = await supabase.from('rsvps').delete().eq('id', id)
  if (error) throw error
}

export async function upsertRSVP(rsvp) {
  if (!supabase) return notConfigured()
  const { data, error } = await supabase.from('rsvps').upsert([rsvp]).select().single()
  if (error) throw error
  return data
}

// ── Storage (upload simples, sem entrada na galeria) ──────────────
export async function uploadToStorage(file, folder = 'misc') {
  if (!supabase) return notConfigured()
  const ext  = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('wedding-photos').upload(path, file, { upsert: true })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage.from('wedding-photos').getPublicUrl(path)
  return publicUrl
}

// ── Photos ────────────────────────────────────────────────────────
export async function getPhotos() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .order('ordem', { ascending: true })
  if (error) throw error
  return data
}

export async function uploadPhoto(file) {
  if (!supabase) return notConfigured()
  const ext  = file.name.split('.').pop()
  const path = `gallery/${Date.now()}.${ext}`
  const { error: upErr } = await supabase.storage.from('wedding-photos').upload(path, file)
  if (upErr) throw upErr

  const { data: { publicUrl } } = supabase.storage.from('wedding-photos').getPublicUrl(path)

  const { data, error } = await supabase
    .from('photos')
    .insert([{ url: publicUrl, storage_path: path, caption: '', ordem: Date.now() }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updatePhotoCaption(id, caption) {
  if (!supabase) return notConfigured()
  const { error } = await supabase.from('photos').update({ caption }).eq('id', id)
  if (error) throw error
}

export async function deletePhoto(id, storagePath) {
  if (!supabase) return notConfigured()
  await supabase.storage.from('wedding-photos').remove([storagePath])
  const { error } = await supabase.from('photos').delete().eq('id', id)
  if (error) throw error
}

// ── Settings ──────────────────────────────────────────────────────
export async function getSettings() {
  if (!supabase) return {}
  const { data, error } = await supabase.from('settings').select('*')
  if (error) throw error
  return Object.fromEntries((data || []).map(r => [r.key, r.value]))
}

export async function saveSetting(key, value) {
  if (!supabase) return notConfigured()
  const { error } = await supabase
    .from('settings')
    .upsert([{ key, value, updated_at: new Date().toISOString() }], { onConflict: 'key' })
  if (error) throw error
}
