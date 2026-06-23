import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GuestPage from './pages/GuestPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 3 páginas de convite */}
        <Route path="/sabado"  element={<GuestPage tipo="sabado"  />} />
        <Route path="/ambos"   element={<GuestPage tipo="ambos"   />} />
        <Route path="/domingo" element={<GuestPage tipo="domingo" />} />

        {/* Redireciona a raiz para /ambos (página mais completa) */}
        <Route path="/" element={<Navigate to="/ambos" replace />} />

        {/* Painel admin */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Qualquer outra rota → /ambos */}
        <Route path="*" element={<Navigate to="/ambos" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
