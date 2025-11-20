import { Link, NavLink } from 'react-router-dom'
import { HeartHandshake, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const navItem = (to, label) => (
    <NavLink
      to={to}
      className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}
      onClick={() => setOpen(false)}
    >{label}</NavLink>
  )
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white">
            <HeartHandshake className="w-6 h-6 text-blue-400"/>
            <span className="font-semibold">CareNow Foundation</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItem('/', 'Home')}
            {navItem('/about', 'About Us')}
            {navItem('/stories', 'Success Stories')}
            {navItem('/contact', 'Contact')}
            {navItem('/donate', 'Donate')}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/admin" className="hidden md:inline-flex px-3 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white">Admin</Link>
            <button className="md:hidden text-blue-100" onClick={()=>setOpen(v=>!v)}><Menu/></button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-3 flex flex-col gap-2">
            {navItem('/', 'Home')}
            {navItem('/about', 'About Us')}
            {navItem('/stories', 'Success Stories')}
            {navItem('/contact', 'Contact')}
            {navItem('/donate', 'Donate')}
            <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white text-center">Admin</Link>
          </div>
        </div>
      )}
    </header>
  )
}
