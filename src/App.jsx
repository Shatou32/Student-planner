import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './components/DashboardPage.jsx'
import LandingPage from './components/LandingPage.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
