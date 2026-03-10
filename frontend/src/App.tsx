import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Login from './pages/Login'
import RoommateDetail from './pages/RoommateDetail'
import ApartmentDetail from './pages/ApartmentDetail'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/roommate/:id" element={<RoommateDetail />} />
      <Route path="/apartment/:id" element={<ApartmentDetail />} />
    </Routes>
  )
}
export default App
