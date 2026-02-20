import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import RoommateProfile from './pages/RoommateProfile'
import ApartmentDetail from './pages/ApartmentDetail'
import Messaging from './pages/Messaging'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/roommate/:id" element={<RoommateProfile />} />
      <Route path="/apartment/:id" element={<ApartmentDetail />} />
      <Route path="/messaging" element={<Messaging />} />
    </Routes>
  )
}
export default App
