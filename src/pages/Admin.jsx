import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function Admin(){
  const backend = import.meta.env.VITE_BACKEND_URL
  const [token,setToken]=useState(null)
  const [login,setLogin]=useState({email:'', password:''})
  const [send,setSend]=useState({patient_name:'', phone:'', email:'', file:null, file_name:'', via:'email', message:''})
  const [history,setHistory]=useState([])
  const [patients,setPatients]=useState([])

  useEffect(()=>{ if(token){ loadHistory(); loadPatients(); } },[token])

  const doLogin = async (e)=>{
    e.preventDefault()
    const form = new URLSearchParams()
    form.append('username', login.email)
    form.append('password', login.password)
    const res = await fetch(`${backend}/auth/login`, {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: form})
    const data = await res.json()
    if(data.access_token){ setToken(data.access_token) }
  }

  const uploadFile = async()=>{
    if(!send.file) return
    const fd = new FormData()
    fd.append('file', send.file)
    const res = await fetch(`${backend}/files/upload`, {method:'POST', body: fd})
    const data = await res.json()
    if(data.ok){ setSend(s=>({...s, file_name:data.file_name})) }
  }

  const sendFile = async()=>{
    const payload = {patient_name: send.patient_name, phone: send.phone || undefined, email: send.email || undefined, file_name: send.file_name, via: send.via, message: send.message}
    const res = await fetch(`${backend}/files/send`, {method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(payload)})
    const data = await res.json()
    if(data.ok){ await loadHistory(); await loadPatients(); }
  }

  const loadHistory = async()=>{
    const res = await fetch(`${backend}/files/history`)
    const data = await res.json()
    setHistory(data.items||[])
  }

  const loadPatients = async()=>{
    const res = await fetch(`${backend}/patients`)
    const data = await res.json()
    setPatients(data.items||[])
  }

  return (
    <div className="min-h-screen bg-slate-900 text-blue-100">
      <Navbar/>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl text-white font-bold">Admin Dashboard</h1>

        {!token ? (
          <form onSubmit={doLogin} className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 max-w-md">
            <div className="space-y-3">
              <input placeholder="Email" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={login.email} onChange={e=>setLogin({...login, email:e.target.value})}/>
              <input type="password" placeholder="Password" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3" value={login.password} onChange={e=>setLogin({...login, password:e.target.value})}/>
              <button className="px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full">Log In</button>
            </div>
          </form>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-white font-semibold">Send File to Patient</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <input placeholder="Patient Name" className="rounded-md bg-white/5 border border-white/10 px-4 py-3" value={send.patient_name} onChange={e=>setSend({...send, patient_name:e.target.value})}/>
                <input placeholder="Phone" className="rounded-md bg-white/5 border border-white/10 px-4 py-3" value={send.phone} onChange={e=>setSend({...send, phone:e.target.value})}/>
                <input placeholder="Email" className="rounded-md bg-white/5 border border-white/10 px-4 py-3" value={send.email} onChange={e=>setSend({...send, email:e.target.value})}/>
                <div className="flex items-center gap-2">
                  <input type="file" onChange={e=>setSend({...send, file:e.target.files?.[0]})} className="text-sm"/>
                  <button onClick={uploadFile} className="px-3 py-2 rounded-md bg-blue-500 text-white">Upload</button>
                </div>
                <select value={send.via} onChange={e=>setSend({...send, via:e.target.value})} className="rounded-md bg-white/5 border border-white/10 px-4 py-3">
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
                <input placeholder="Message (optional)" className="rounded-md bg-white/5 border border-white/10 px-4 py-3" value={send.message} onChange={e=>setSend({...send, message:e.target.value})}/>
              </div>
              <button onClick={sendFile} className="mt-4 px-5 py-3 rounded-md bg-emerald-600 text-white">Send</button>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-white font-semibold">Patients</h3>
              <div className="mt-3 max-h-80 overflow-auto divide-y divide-white/10">
                {patients.map(p=> (
                  <div key={p._id} className="py-2 text-sm">
                    <div className="text-white">{p.name}</div>
                    <div className="text-blue-300">{p.phone || p.email}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-white font-semibold">File History</h3>
              <div className="mt-3 overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-blue-300">
                      <th className="py-2">Patient</th>
                      <th>File</th>
                      <th>Sent Via</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {history.map(h=> (
                      <tr key={h._id}>
                        <td className="py-2">{h.patient_name} <span className="text-blue-300">({h.patient_phone || h.patient_email})</span></td>
                        <td>{h.file_name}</td>
                        <td className="capitalize">{h.sent_via}</td>
                        <td>{new Date(h.created_at).toLocaleString?.() || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer/>
    </div>
  )
}
