export default function Footer(){
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-semibold">CareNow Foundation</h4>
          <p className="text-blue-200 mt-2 text-sm">A non-profit focused on timely medical support for those in need.</p>
        </div>
        <div>
          <h5 className="text-white font-medium">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-blue-200 text-sm">
            <li><a href="/donate" className="hover:text-white">Donate</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/stories" className="hover:text-white">Success Stories</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-medium">Connect</h5>
          <ul className="mt-3 space-y-2 text-blue-200 text-sm">
            <li><a href="https://instagram.com" target="_blank" className="hover:text-white">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" className="hover:text-white">Facebook</a></li>
            <li><a href="mailto:hello@carenow.org" className="hover:text-white">hello@carenow.org</a></li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-center text-blue-300/70 text-sm border-t border-white/10">© {new Date().getFullYear()} CareNow Foundation. All rights reserved.</div>
    </footer>
  )
}
