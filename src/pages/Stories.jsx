import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function Stories(){
  const backend = import.meta.env.VITE_BACKEND_URL
  const [items,setItems]=useState([])
  useEffect(()=>{
    const load = async ()=>{
      try{
        const res = await fetch(`${backend}/donations`)
        const data = await res.json()
        setItems(data.items||[])
      }catch(e){
        setItems([])
      }
    }
    if(backend) load()
  },[backend])

  return (
    <div className="min-h-screen bg-slate-900 text-blue-100">
      <Navbar/>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl text-white font-bold">Success Stories & Testimonials</h1>
        <p className="mt-2">Stories from people helped, including highlights from Instagram/Facebook.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((d,i)=> (
            <article key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-blue-200 text-sm">{new Date(d.created_at).toLocaleString?.() || ''}</div>
              <h3 className="mt-2 text-white font-semibold">{d.name || 'Anonymous'}</h3>
              <p className="text-sm">Amount: {d.currency || 'INR'} {d.amount}</p>
              {d.receipt_url && <a href={d.receipt_url} className="text-xs text-blue-300 underline">Receipt</a>}
            </article>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  )
}
