import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { Route } from './routes.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <Route pathname={window.location.pathname} />
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
