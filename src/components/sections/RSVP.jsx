import { useState } from 'react'
import { createRSVP } from '../../lib/supabase'

export default function RSVP({ settings = {} }) {
  const prazo = settings.prazo_rsvp || '15 de Setembro de 2026'
  const [status, setStatus] = useState('idle') // idle | loading | success_sim | success_nao | error
  const [form, setForm]     = useState({ nome: '', email: '', telefone: '', acompanhantes: '1 pessoa', presenca: '', mensagem: '' })
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
      })
      setStatus(form.presenca === 'confirmado' ? 'success_sim' : 'success_nao')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success_sim') return (
    <section id="rsvp" className="py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-circle-check text-green-500 text-5xl" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-gray-800 mb-3">Presença Confirmada!</h3>
          <p className="text-gray-600 text-lg mb-2">Que alegria! Estamos muito felizes que vai estar presente.</p>
          <p className="text-gray-500">Mal podemos esperar para celebrar este dia especial consigo!</p>
          <div className="mt-6 text-5xl">🎉💕</div>
        </div>
      </div>
    </section>
  )

  if (status === 'success_nao') return (
    <section id="rsvp" className="py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-envelope text-blue-500 text-5xl" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-gray-800 mb-3">Obrigado pela Resposta</h3>
          <p className="text-gray-600 text-lg mb-2">Sentiremos muito a sua falta!</p>
          <p className="text-gray-500">A sua resposta foi registada. Obrigado por nos avisar.</p>
          <div className="mt-6 text-5xl">💌</div>
        </div>
      </div>
    </section>
  )

  return (
    <section id="rsvp" className="py-24 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Confirmar Presença
          </h2>
          <p className="text-xl text-gray-600">Por favor, confirme a sua presença até {prazo}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nome Completo <span className="text-rose-600">*</span>
                </label>
                <input type="text" required value={form.nome} onChange={e => set('nome', e.target.value)}
                  placeholder="O seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="email@exemplo.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                <input type="tel" value={form.telefone} onChange={e => set('telefone', e.target.value)}
                  placeholder="+258 00 000 0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Número de Pessoas</label>
                <select value={form.acompanhantes} onChange={e => set('acompanhantes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none">
                  <option>1 pessoa</option>
                  <option>2 pessoas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Confirmação de Presença <span className="text-rose-600">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className={`flex items-center cursor-pointer rounded-xl px-6 py-4 transition flex-1 border-2
                  ${form.presenca === 'confirmado' ? 'bg-green-100 border-green-500' : 'bg-green-50 border-green-200 hover:border-green-400'}`}>
                  <input type="radio" name="presenca" value="confirmado"
                    checked={form.presenca === 'confirmado'}
                    onChange={e => { set('presenca', e.target.value); setPresencaErr(false) }}
                    className="mr-3 w-5 h-5 accent-rose-600" />
                  <span className="font-medium text-gray-700">✓ Sim, estarei presente!</span>
                </label>
                <label className={`flex items-center cursor-pointer rounded-xl px-6 py-4 transition flex-1 border-2
                  ${form.presenca === 'recusado' ? 'bg-red-100 border-red-500' : 'bg-red-50 border-red-200 hover:border-red-400'}`}>
                  <input type="radio" name="presenca" value="recusado"
                    checked={form.presenca === 'recusado'}
                    onChange={e => { set('presenca', e.target.value); setPresencaErr(false) }}
                    className="mr-3 w-5 h-5 accent-rose-600" />
                  <span className="font-medium text-gray-700">✗ Infelizmente não poderei</span>
                </label>
              </div>
              {presencaErr && <p className="text-red-500 text-sm mt-2">Por favor, selecione uma opção.</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mensagem para os Noivos</label>
              <textarea rows={4} value={form.mensagem} onChange={e => set('mensagem', e.target.value)}
                placeholder="Deixe uma mensagem carinhosa..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                Ocorreu um erro. Verifique a ligação e tente novamente.
              </p>
            )}

            <button type="submit" disabled={status === 'loading'}
              className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg">
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
