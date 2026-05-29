import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NoteProvider } from './context/NoteContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
