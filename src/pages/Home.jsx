import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StoriesPreview from '../components/StoriesPreview'
import Footer from '../components/Footer'

export default function Home(){
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar/>
      <Hero/>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/donate" className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-white">Donate</a>
        <a href="/about" className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-white">About Us</a>
        <a href="/stories" className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-white">Success Stories</a>
      </div>
      <StoriesPreview/>
      <Footer/>
    </div>
  )
}
