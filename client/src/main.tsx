import App from '@/App'
import '@/assets/styles/index.css'
import { AuthProvider } from '@/context/AuthContext'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
