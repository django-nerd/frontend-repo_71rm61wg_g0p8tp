import { useEffect, useState } from 'react'

export default function StoriesPreview(){
  const [items,setItems]=useState([])
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    // reuse donations as recent success items for now
    const load = async ()=>{
      try{
        const res = await fetch(`${backend}/donations`)
        const data = await res.json()
        setItems((data.items||[]).slice(0,4))
      }catch(e){
        setItems([])
      }
    }
    if(backend) load()
  },[backend])

  return (
    <section className="py-16 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Recent Success Stories</h2>
        <p className="text-blue-200 mt-2">A glimpse of the lives you helped transform.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.length>0 ? items.map((d,i)=> (
            <article key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-blue-200 text-sm">{new Date(d.created_at).toLocaleString?.() || ''}</div>
              <h3 className="mt-2 text-white font-semibold">{d.name || 'Anonymous Donor'}</h3>
              <p className="text-blue-100 text-sm">Donated {d.currency || 'INR'} {d.amount}</p>
              {d.status && <span className="mt-2 inline-flex text-xs px-2 py-1 rounded bg-green-500/20 text-green-300">{d.status}</span>}
            </article>
          )) : (
            Array.from({length:4}).map((_,i)=> (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6 animate-pulse h-32"/>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
