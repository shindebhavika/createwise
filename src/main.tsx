import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TableProvider } from './lib/TableContext.tsx'  // adjust the import path

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableProvider>
      <App />
    </TableProvider>
  </StrictMode>,
)
