import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent pointer-events-none"/>
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Support a Life Today</h1>
          <p className="mt-4 text-blue-100 text-lg">Your contribution helps patients access urgent care, medicines, and support. Together we create real impact.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/donate" className="px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold">Donate Now</Link>
            <Link to="/about" className="px-5 py-3 rounded-md border border-white/20 text-blue-100 hover:text-white hover:border-white/40">About Us</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
