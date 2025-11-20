import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'

const AMOUNTS=[100,250,500,1000]

export default function Donate(){
  const backend = import.meta.env.VITE_BACKEND_URL
  const [form,setForm]=useState({name:'', email:'', phone:'', amount:AMOUNTS[1], currency:'INR'})
  const [status,setStatus]=useState(null)

  const initiate = async()=>{
    setStatus('Processing...')
    try{
      const res = await fetch(`${backend}/donations/initiate`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form, method:'upi'})})
      const data = await res.json()
      if(data.ok){ setStatus('Donation initiated. Complete payment via your preferred method.') }
      else setStatus('Failed to start donation')
    }catch(e){ setStatus('Failed to start donation') }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-blue-100">
      <Navbar/>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl text-white font-bold">Donate</h1>
        <p className="mt-2">Choose an amount or enter a custom value. We support UPI, Netbanking, Cards in India and Stripe for international cards.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {AMOUNTS.map(a=> (
                <button key={a} onClick={()=>setForm({...form, amount:a})} className={`px-4 py-2 rounded-md border ${form.amount===a?'bg-blue-500 text-white border-blue-500':'border-white/20 text-white/80 hover:bg-white/10'}`}>₹{a}</button>
              ))}
              <input type="number" min={1} value={form.amount} onChange={e=>setForm({...form, amount:Number(e.target.value)})} className="px-4 py-2 rounded-md bg-white/5 border border-white/10 w-32"/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder="Full Name" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
              <input type="email" placeholder="Email" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
              <input placeholder="Phone" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-blue-300">Payment Methods</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded bg-white/10 text-white text-sm">UPI</span>
                <span className="px-3 py-1 rounded bg-white/10 text-white text-sm">Netbanking</span>
                <span className="px-3 py-1 rounded bg-white/10 text-white text-sm">Cards</span>
                <span className="px-3 py-1 rounded bg-white/10 text-white text-sm">Stripe (International)</span>
              </div>
            </div>

            <button onClick={initiate} className="px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold">Proceed to Pay</button>
            {status && <div className="text-sm text-blue-200">{status}</div>}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-white font-semibold">How your donation helps</h3>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Urgent medicines and diagnostics</li>
              <li>Meal support for patients and families</li>
              <li>Post-surgery care kits</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
