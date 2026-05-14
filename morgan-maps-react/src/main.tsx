import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.tsx'
import { GalleryPage } from './pages/GalleryPage.tsx'
import { ViewerApp } from './pages/ViewerApp.tsx'
import { AdminPage } from './pages/AdminPage.tsx'
import './index.css'

// Vite's BASE_URL comes from vite.config.ts, e.g. base: '/servicemap/'
// Normalise it so this app works both locally at '/' and when hosted in
// a subfolder such as https://yourdomain.com/servicemap/.
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const currentPath = window.location.pathname

const routePath =
  basePath && currentPath.startsWith(basePath)
    ? currentPath.slice(basePath.length) || '/'
    : currentPath

let root: React.ReactNode

if (routePath === '/gallery' || routePath.startsWith('/gallery/')) {
  root = <GalleryPage />
} else if (routePath === '/admin' || routePath.startsWith('/admin/')) {
  root = <AdminPage />
} else {
  const viewMatch = routePath.match(/^\/view\/([^/]+)/)
  if (viewMatch) {
    root = <ViewerApp mapId={decodeURIComponent(viewMatch[1])} />
  } else {
    root = <App />
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {root}
    <Analytics />
  </React.StrictMode>,
)
