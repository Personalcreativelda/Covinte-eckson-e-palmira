import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [senha, setSenha]       = useState('')
  const [erro, setErro]         = useState('')
  const [loading, setLoading]   = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
      if (error) throw error
      onLogin()
    } catch (err) {
      setErro('Email ou senha incorrectos. Verifique as credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl font-serif font-bold text-rose-600 mb-2">E &amp; P</div>
          <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-500 mt-2">Gestão de Confirmações de Presença</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Senha</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required
              placeholder="A sua senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" />
          </div>

          {erro && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">
              <i className="fa-solid fa-circle-exclamation mr-1" />{erro}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition">
            {loading
              ? <><i className="fa-solid fa-spinner fa-spin mr-2" />A entrar…</>
              : <><i className="fa-solid fa-lock-open mr-2" />Entrar</>
            }
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm transition">
            <i className="fa-solid fa-arrow-left mr-1" />Voltar ao site
          </a>
        </div>
      </div>
    </div>
  )
}
