import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './Contexts/UserContext.tsx'
import { ThemeProvider } from './Contexts/ThemeContext.tsx'
import axios from 'axios'

// Configure axios base URL and credentials from environment
const apiBase = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
if (apiBase) {
  axios.defaults.baseURL = apiBase;
}
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
      <App/>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)
