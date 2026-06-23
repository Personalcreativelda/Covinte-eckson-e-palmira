import { useState } from 'react'
import { createRSVP } from '../../lib/supabase'

export default function RSVP({ settings = {}, dias = 'sabado', labelDias = 'Sábado' }) {
  const prazo = settings.prazo_rsvp || '15 de Setembro de 2026'
  const [status, setStatus] = useState('idle')
  const [form, setForm]     = useState({
    nome: '', email: '', telefone: '',
    acompanhantes: '1 pessoa', presenca: '', mensagem: '',
  })
  const [presencaErr, setPresencaErr] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.presenca) { setPresencaErr(true); return }
    setPresencaErr(false)
    if (!form.nome.trim()) return
    setStatus('loading')
    try {
      await createRSVP({
        nome:          form.nome.trim(),
        email:         form.email.trim(),
        telefone:      form.telefone.trim(),
        acompanhantes: form.acompanhantes,
        status:        form.presenca,
        mensagem:      form.mensagem.trim(),
        dias,
      })
      setStatus(form.presenca === 'confirmado' ? 'success_sim' : 'success_nao')
    } catch {
      setStatus('error')
    }
  }

  // ── Mensagem de sucesso ──────────────────────────────────────────
  if (status === 'success_sim') return (
    <section id="rsvp" className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <i className="fa-solid fa-circle-check text-green-500 text-4xl md:text-5xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-3">Presença Confirmada!</h3>
          <p className="text-gray-600 text-base md:text-lg mb-1">Que alegria! Estamos muito felizes que vai estar presente.</p>
          <p className="text-rose-600 font-semibold text-sm mt-2">📅 {labelDias}</p>
          <div className="mt-5 text-4xl">🎉💕</div>
        </div>
      </div>
    </section>
  )

  if (status === 'success_nao') return (
    <section id="rsvp" className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <i className="fa-solid fa-envelope text-blue-500 text-4xl md:text-5xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-3">Obrigado pela Resposta</h3>
          <p className="text-gray-600 text-base md:text-lg mb-1">Sentiremos muito a sua falta!</p>
          <p className="text-gray-500 text-sm">A sua resposta foi registada. Obrigado por nos avisar.</p>
          <div className="mt-5 text-4xl">💌</div>
        </div>
      </div>
    </section>
  )

  // ── Formulário ───────────────────────────────────────────────────
  return (
    <section id="rsvp" className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
            Confirmar Presença
          </h2>
          <p className="text-gray-600 text-sm md:text-xl">Por favor, confirme até {prazo}</p>
          {/* Badge do dia */}
          <span className="inline-block mt-3 bg-rose-100 text-rose-700 text-xs font-semibold px-4 py-1.5 rounded-full">
            📅 {labelDias}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Nome Completo *</label>
                <input type="text" required value={form.nome} onChange={e => set('nome', e.target.value)}
                  placeholder="O seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="email@exemplo.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Telefone</label>
                <input type="tel" value={form.telefone} onChange={e => set('telefone', e.target.value)}
                  placeholder="+258 00 000 0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Número de Pessoas</label>
                <select value={form.acompanhantes} onChange={e => set('acompanhantes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm">
                  <option>1 pessoa</option>
                  <option>2 pessoas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-sm">Confirmação *</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className={`flex items-center cursor-pointer rounded-xl px-5 py-4 transition flex-1 border-2 text-sm
                  ${form.presenca === 'confirmado' ? 'bg-green-100 border-green-500' : 'bg-green-50 border-green-200 hover:border-green-400'}`}>
                  <input type="radio" name="presenca" value="confirmado"
                    checked={form.presenca === 'confirmado'}
                    onChange={e => { set('presenca', e.target.value); setPresencaErr(false) }}
                    className="mr-3 accent-rose-600" />
                  <span className="font-medium text-gray-700">✓ Sim, estarei presente!</span>
                </label>
                <label className={`flex items-center cursor-pointer rounded-xl px-5 py-4 transition flex-1 border-2 text-sm
                  ${form.presenca === 'recusado' ? 'bg-red-100 border-red-500' : 'bg-red-50 border-red-200 hover:border-red-400'}`}>
                  <input type="radio" name="presenca" value="recusado"
                    checked={form.presenca === 'recusado'}
                    onChange={e => { set('presenca', e.target.value); setPresencaErr(false) }}
                    className="mr-3 accent-rose-600" />
                  <span className="font-medium text-gray-700">✗ Não poderei estar presente</span>
                </label>
              </div>
              {presencaErr && <p className="text-red-500 text-xs mt-2">Por favor, selecione uma opção.</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Mensagem para os Noivos</label>
              <textarea rows={3} value={form.mensagem} onChange={e => set('mensagem', e.target.value)}
                placeholder="Deixe uma mensagem carinhosa..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm" />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                Ocorreu um erro. Verifique a ligação e tente novamente.
              </p>
            )}

            <button type="submit" disabled={status === 'loading'}
              className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white py-4 rounded-lg text-base font-semibold transition shadow-lg">
              {status === 'loading'
                ? <><i className="fa-solid fa-spinner fa-spin mr-2" />A enviar...</>
                : <><i className="fa-solid fa-paper-plane mr-2" />Confirmar Presença</>
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
