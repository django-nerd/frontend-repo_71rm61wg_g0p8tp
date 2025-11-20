import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Legal(){
  return (
    <div className="min-h-screen bg-slate-900 text-blue-100">
      <Navbar/>
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div>
          <h1 className="text-3xl md:text-4xl text-white font-bold">Terms & Conditions</h1>
          <p className="mt-4 text-sm leading-6">By using this website, you agree to our terms including acceptable use, refunds according to local regulations, and data protection guidelines.</p>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl text-white font-bold">Privacy Policy</h2>
          <p className="mt-4 text-sm leading-6">We respect your privacy. We collect only essential data and never sell your information. Payments are processed by secure providers. You can request data deletion via email.</p>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
