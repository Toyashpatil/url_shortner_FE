import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthState from './context/AuthState'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthState>
      <App />
    </AuthState>
 </StrictMode>,
)
