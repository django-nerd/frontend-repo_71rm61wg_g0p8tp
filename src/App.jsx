import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Stories from './pages/Stories'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import Legal from './pages/Legal'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/stories" element={<Stories/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/donate" element={<Donate/>} />
      <Route path="/legal" element={<Legal/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  )
}

export default App
