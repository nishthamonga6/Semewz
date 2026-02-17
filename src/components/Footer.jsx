import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-semwz-black text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-medium tracking-widest mb-4">SEMWZ</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Curated fashion for the modern individual. Premium quality, thoughtful design.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-white/80 mb-4">SHOP</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/new-arrivals" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link to="/jeans" className="hover:text-white transition">Jeans</Link></li>
              <li><Link to="/shirts" className="hover:text-white transition">Shirts</Link></li>
              <li><Link to="/co-ord-sets" className="hover:text-white transition">Co-ord Sets</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-white/80 mb-4">CUSTOMER SERVICE</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-white/80 mb-4">CONTACT</h4>
            <p className="text-sm text-white/70 mb-4">1800-833-4488</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/semewz" className="text-white/60 hover:text-white transition" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} SEMWZ. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
