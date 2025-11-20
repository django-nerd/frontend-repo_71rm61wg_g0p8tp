import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const team = [
  {name:'Asha Verma', role:'Admin', img:'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop', bio:'Leads our mission and partnerships.'},
  {name:'Rohit Singh', role:'Manager', img:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop', bio:'Operations and patient onboarding.'},
  {name:'Sara Khan', role:'Salesperson', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', bio:'Donor relations and outreach.'},
]

export default function About(){
  return (
    <div className="min-h-screen bg-slate-900 text-blue-100">
      <Navbar/>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl text-white font-bold">About Us</h1>
        <p className="mt-4 max-w-3xl">We are a charity dedicated to supporting patients in urgent need of medical care. We believe in transparency, compassion, and technology-driven impact.</p>
        <h2 className="mt-10 text-2xl text-white font-semibold">Management Team</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((m)=> (
            <div key={m.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <img src={m.img} alt={m.name} className="w-full h-40 object-cover rounded-lg"/>
              <div className="mt-3">
                <div className="text-white font-medium">{m.name}</div>
                <div className="text-sm text-blue-300">{m.role}</div>
                <p className="text-sm mt-2">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  )
}
