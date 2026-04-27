import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

/** Même build servi à la racine (minimoapps.fr) et sous /suhab (minimoapps.fr/suhab). */
function routerBasename(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const p = window.location.pathname
  if (p === '/suhab' || p.startsWith('/suhab/')) return '/suhab'
  return undefined
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)