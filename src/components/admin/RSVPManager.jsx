import { useEffect, useState } from 'react'
import { getRSVPs, updateRSVPStatus, deleteRSVP, upsertRSVP } from '../../lib/supabase'

const BADGE = {
  confirmado: 'bg-green-100 text-green-800',
  recusado:   'bg-red-100 text-red-800',
  pendente:   'bg-yellow-100 text-yellow-800',
}
const LABEL = { confirmado: 'Confirmado', recusado: 'Não Poderá Vir', pendente: 'Pendente' }

const DIAS_BADGE = {
  sabado:  { label: 'Sábado',   color: 'bg-rose-100 text-rose-700' },
  ambos:   { label: 'Sáb & Dom', color: 'bg-purple-100 text-purple-700' },
  domingo: { label: 'Domingo',   color: 'bg-yellow-100 text-yellow-800' },
}
const DIAS_LABEL = { sabado: 'Sábado', ambos: 'Sáb & Dom', domingo: 'Domingo' }

export default function RSVPManager() {
  const [rsvps, setRsvps]         = useState([])
  const [filter, setFilter]       = useState('todos')
  const [diasFilter, setDiasFilter] = useState('todos')
  const [search, setSearch]       = useState('')
  const [loading, setLoading]     = useState(true)
  const [modal, setModal]         = useState(null)

  const load = async () => {
    setLoading(true)
    try { setRsvps(await getRSVPs()) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const filtered = rsvps.filter(r => {
    if (filter !== 'todos' && r.status !== filter) return false
    if (diasFilter !== 'todos' && r.dias !== diasFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (r.nome||'').toLowerCase().includes(q) || (r.telefone||'').toLowerCase().includes(q)
    }
    return true
  })

  const stats = {
    total:       rsvps.length,
    confirmados: rsvps.filter(r => r.status === 'confirmado').length,
    recusados:   rsvps.filter(r => r.status === 'recusado').length,
    pendentes:   rsvps.filter(r => r.status === 'pendente').length,
  }

  const statsDias = {
    sabado:  rsvps.filter(r => r.dias === 'sabado').length,
    ambos:   rsvps.filter(r => r.dias === 'ambos').length,
    domingo: rsvps.filter(r => r.dias === 'domingo').length,
  }

  const handleDelete = async (id) => {
    if (!confirm('Remover este registo?')) return
    await deleteRSVP(id); load()
  }

  const handleStatus = async (id, status) => {
    await updateRSVPStatus(id, status); load()
  }

  const handleExport = () => {
    const header = 'Nome;Email;Telefone;Pessoas;Status;Dias;Mensagem;Data'
    const rows = rsvps.map(r =>
      [r.nome, r.email, r.telefone, r.acompanhantes, r.status,
       DIAS_LABEL[r.dias] || r.dias || '',
       r.mensagem,
       r.created_at ? new Date(r.created_at).toLocaleDateString('pt-MZ') : '']
      .map(v => `"${(v||'').replace(/"/g,'""')}"`).join(';')
    )
    const blob = new Blob(['﻿' + [header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'convidados.csv'; a.click()
  }

  const handlePDF = () => {
    const data = filtered
    const rows = data.map(r => {
      const db = DIAS_BADGE[r.dias]
      return `
      <tr>
        <td>${r.nome || ''}</td>
        <td>${r.email || '—'}</td>
        <td>${r.telefone || '—'}</td>
        <td>${r.acompanhantes || '1 pessoa'}</td>
        <td class="${r.status === 'confirmado' ? 'green' : r.status === 'recusado' ? 'red' : 'yellow'}">
          ${LABEL[r.status || 'pendente']}
        </td>
        <td><span class="dias-badge ${r.dias || ''}">${db ? db.label : (r.dias || '—')}</span></td>
        <td>${r.mensagem || ''}</td>
        <td>${r.created_at ? new Date(r.created_at).toLocaleDateString('pt-MZ') : '—'}</td>
      </tr>`
    }).join('')

    const filterLabel = filter === 'todos' ? 'Todos' : LABEL[filter] || filter
    const diasLabel   = diasFilter === 'todos' ? 'Todos os dias' : DIAS_LABEL[diasFilter] || diasFilter
    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8"/>
  <title>Convidados — Eckson & Palmira</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; padding: 32px; color: #222; }
    .header { text-align: center; margin-bottom: 24px; border-bottom: 3px solid #e11d48; padding-bottom: 16px; }
    .header h1 { font-size: 28px; color: #e11d48; font-family: Georgia, serif; }
    .header p  { color: #666; font-size: 13px; margin-top: 4px; }
    .stats { display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap; }
    .stat { border: 1px solid #ddd; border-radius: 8px; padding: 8px 16px; text-align: center; }
    .stat strong { display: block; font-size: 20px; color: #e11d48; }
    .stat span { font-size: 11px; color: #888; }
    .dias-stats { display: flex; gap: 10px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
    .dia-stat { padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .dia-stat.sabado  { background:#ffe4e6; color:#be123c; }
    .dia-stat.ambos   { background:#f3e8ff; color:#7e22ce; }
    .dia-stat.domingo { background:#fef9c3; color:#854d0e; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    thead { background: #e11d48; color: white; }
    th { padding: 9px 10px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: .5px; }
    td { padding: 8px 10px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
    tr:nth-child(even) td { background: #fef2f2; }
    .green { color: #166534; font-weight: 600; }
    .red   { color: #991b1b; font-weight: 600; }
    .yellow{ color: #854d0e; font-weight: 600; }
    .dias-badge { padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .dias-badge.sabado  { background:#ffe4e6; color:#be123c; }
    .dias-badge.ambos   { background:#f3e8ff; color:#7e22ce; }
    .dias-badge.domingo { background:#fef9c3; color:#854d0e; }
    .print-btn { display: block; margin: 0 auto 20px; padding: 10px 28px; background: #e11d48; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 600; }
    .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #aaa; }
    @media print { .print-btn { display: none !important; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Eckson &amp; Palmira</h1>
    <p>Lista de Convidados — ${filterLabel} &nbsp;|&nbsp; ${diasLabel} &nbsp;|&nbsp; Gerado em ${new Date().toLocaleDateString('pt-MZ')}</p>
  </div>
  <div class="stats">
    <div class="stat"><strong>${stats.total}</strong><span>Total</span></div>
    <div class="stat"><strong>${stats.confirmados}</strong><span>Confirmados</span></div>
    <div class="stat"><strong>${stats.recusados}</strong><span>Não Virão</span></div>
    <div class="stat"><strong>${stats.pendentes}</strong><span>Pendentes</span></div>
  </div>
  <div class="dias-stats">
    <span class="dia-stat sabado">Sábado: ${statsDias.sabado}</span>
    <span class="dia-stat ambos">Sáb &amp; Dom: ${statsDias.ambos}</span>
    <span class="dia-stat domingo">Domingo: ${statsDias.domingo}</span>
  </div>
  <button class="print-btn" onclick="window.print()">Imprimir / Guardar como PDF</button>
  <table>
    <thead><tr>
      <th>Nome</th><th>Email</th><th>Telefone</th><th>Pessoas</th><th>Status</th><th>Dias</th><th>Mensagem</th><th>Data</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="footer">Casamento Eckson &amp; Palmira — 03 &amp; 04 de Outubro de 2026</div>
</body>
</html>`)
    win.document.close()
    win.focus()
    setTimeout(() => win.print(), 600)
  }

  return (
    <div>
      {/* Stats gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Total',       value: stats.total,       color: 'border-gray-300' },
          { label: 'Confirmados', value: stats.confirmados, color: 'border-green-400' },
          { label: 'Não Virão',   value: stats.recusados,   color: 'border-red-400' },
          { label: 'Pendentes',   value: stats.pendentes,   color: 'border-yellow-400' },
        ].map(s => (
          <div key={s.label} className={`bg-white rounded-xl shadow p-5 text-center border-t-4 ${s.color}`}>
            <div className="text-3xl font-bold text-gray-800">{s.value}</div>
            <div className="text-gray-500 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Stats por dia */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { key: 'sabado',  label: 'Sábado',    value: statsDias.sabado,  bg: 'bg-rose-50',   border: 'border-rose-300',   text: 'text-rose-700' },
          { key: 'ambos',   label: 'Sáb & Dom', value: statsDias.ambos,   bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700' },
          { key: 'domingo', label: 'Domingo',   value: statsDias.domingo, bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800' },
        ].map(s => (
          <div key={s.key} className={`${s.bg} rounded-xl border ${s.border} p-3 text-center cursor-pointer transition hover:shadow`}
            onClick={() => setDiasFilter(diasFilter === s.key ? 'todos' : s.key)}>
            <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
            <div className={`text-xs font-semibold mt-0.5 ${s.text}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex flex-col md:flex-row gap-3 items-center">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Pesquisar por nome ou telefone…"
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-400 text-sm" />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setModal('add')}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <i className="fa-solid fa-plus mr-1" />Adicionar
          </button>
          <button onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <i className="fa-solid fa-file-csv mr-1" />CSV
          </button>
          <button onClick={handlePDF}
            className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <i className="fa-solid fa-file-pdf mr-1" />PDF
          </button>
          <button onClick={() => window.print()}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <i className="fa-solid fa-print mr-1" />Imprimir
          </button>
        </div>
      </div>

      {/* Filtro status */}
      <div className="flex gap-1 mb-2 bg-white rounded-xl shadow p-2">
        {[['todos','Todos'],['confirmado','Confirmados'],['recusado','Não Virão'],['pendente','Pendentes']].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${filter===v ? 'bg-rose-600 text-white' : 'text-gray-600 hover:bg-rose-50'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Filtro dias */}
      <div className="flex gap-1 mb-4 bg-white rounded-xl shadow p-2">
        {[
          ['todos',   'Todos os dias', ''],
          ['sabado',  'Sábado',        'text-rose-600'],
          ['ambos',   'Sáb & Dom',     'text-purple-600'],
          ['domingo', 'Domingo',       'text-yellow-700'],
        ].map(([v, l, tc]) => (
          <button key={v} onClick={() => setDiasFilter(v)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${diasFilter===v ? 'bg-gray-800 text-white' : `text-gray-600 hover:bg-gray-50 ${tc}`}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {loading ? (
          <div className="py-16 text-center text-gray-400"><i className="fa-solid fa-spinner fa-spin text-3xl" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <i className="fa-solid fa-users-slash text-4xl mb-3 block" />Nenhum registo encontrado
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                {['Nome','Contacto','Pessoas','Status','Dias','Data','Acções'].map(h => (
                  <th key={h} className="px-5 py-4 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => {
                const db = DIAS_BADGE[r.dias]
                return (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-800">{r.nome}</div>
                      {r.mensagem && <div className="text-xs text-gray-400 italic mt-0.5">{r.mensagem.slice(0,50)}{r.mensagem.length>50?'…':''}</div>}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <div>{r.email||'—'}</div>
                      <div className="text-gray-500">{r.telefone||'—'}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">{r.acompanhantes||'1 pessoa'}</td>
                    <td className="px-5 py-4">
                      <span className={`${BADGE[r.status||'pendente']} px-3 py-1 rounded-full text-xs font-semibold`}>
                        {LABEL[r.status||'pendente']}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {db ? (
                        <span className={`${db.color} px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}>
                          {db.label}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('pt-MZ') : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select value={r.status||'pendente'} onChange={e => handleStatus(r.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none">
                          <option value="confirmado">Confirmado</option>
                          <option value="recusado">Não Virá</option>
                          <option value="pendente">Pendente</option>
                        </select>
                        <button onClick={() => setModal(r)} className="text-blue-500 hover:text-blue-700">
                          <i className="fa-solid fa-pen text-sm" />
                        </button>
                        <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-600">
                          <i className="fa-solid fa-trash text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {modal && <RSVPModal rsvp={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={() => { setModal(null); load() }} />}
    </div>
  )
}

function RSVPModal({ rsvp, onClose, onSave }) {
  const [form, setForm] = useState({
    nome:          rsvp?.nome          || '',
    email:         rsvp?.email         || '',
    telefone:      rsvp?.telefone      || '',
    acompanhantes: rsvp?.acompanhantes || '1 pessoa',
    status:        rsvp?.status        || 'pendente',
    dias:          rsvp?.dias          || 'sabado',
    mensagem:      rsvp?.mensagem      || '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async (e) => {
    e.preventDefault()
    await upsertRSVP(rsvp ? { ...form, id: rsvp.id } : form)
    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-screen">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">{rsvp ? 'Editar Convidado' : 'Adicionar Convidado'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-xmark text-xl" /></button>
          </div>
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome *</label>
              <input required value={form.nome} onChange={e => set('nome', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
                <input value={form.telefone} onChange={e => set('telefone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pessoas</label>
                <select value={form.acompanhantes} onChange={e => set('acompanhantes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none">
                  <option>1 pessoa</option><option>2 pessoas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none">
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="recusado">Não Poderá Vir</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Dias do Convite</label>
              <select value={form.dias} onChange={e => set('dias', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none">
                <option value="sabado">Sábado (03 Out — Casamento)</option>
                <option value="ambos">Sábado & Domingo (03 & 04 Out)</option>
                <option value="domingo">Domingo (04 Out — Chiguiana)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mensagem</label>
              <textarea rows={3} value={form.mensagem} onChange={e => set('mensagem', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-lg font-semibold">
                <i className="fa-solid fa-floppy-disk mr-2" />Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
