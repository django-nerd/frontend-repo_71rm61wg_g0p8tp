import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function Contact(){
  const backend = import.meta.env.VITE_BACKEND_URL
  const [form, setForm] = useState({name:'', email:'', phone:'', message:''})
  const [status, setStatus] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    setStatus('Submitting...')
    try{
      const res = await fetch(`${backend}/contact`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
      const data = await res.json()
      if(data.ok){ setStatus('Thank you! We will reach out soon.') }
      else setStatus('Submission failed')
    }catch(e){ setStatus('Submission failed') }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-blue-100">
      <Navbar/>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl text-white font-bold">Contact Us</h1>
        <p className="mt-2">Reach us via WhatsApp or email, or use the form below.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <form onSubmit={submit} className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Name" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
              <input required type="email" placeholder="Email" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
            </div>
            <input placeholder="Phone" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
            <textarea required rows={6} placeholder="Message" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
            <button className="px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold">Submit</button>
            {status && <div className="text-sm text-blue-200">{status}</div>}
          </form>
          <aside className="space-y-4">
            <a className="block px-4 py-3 rounded-md bg-emerald-600 text-white text-center" href="https://wa.me/919999999999" target="_blank">WhatsApp Us</a>
            <a className="block px-4 py-3 rounded-md bg-blue-600 text-white text-center" href="mailto:hello@carenow.org">Email Us</a>
          </aside>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
