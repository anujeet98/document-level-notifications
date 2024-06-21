import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Authentication from './pages/Authentication'
import { useContext } from 'react'
import { AuthContext } from './contexts/auth-context';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import { socket } from './socket';


function App() {
    const ctx = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={ctx.user ? <Home/> : <Authentication/>}/>
            <Route path="/admin" element={ctx.user ? <AdminPage /> : <Authentication/>} />
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    )
}

export default App
