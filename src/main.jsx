import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CitiesProvider } from './context/CitiesContext.jsx'
import { AuthProvider } from './context/FakeAuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </AuthProvider>
  </React.StrictMode>,
)
