import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from './contexts/auth-context'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider> 
                    <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
