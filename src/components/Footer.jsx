import { Mail, MapPin, Phone, Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-semwz-black text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 tracking-widest">
              SEMEWZ
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Be your own muse. Elevate your personal style with our thoughtfully curated collections.
            </p>
            <a href="/" className="inline-block text-semwz-peach hover:text-white transition text-sm font-medium hover:translate-x-1">
              Shop Now →
            </a>
          </div>

          {/* Shopping */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide">SHOP</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition duration-300 hover:translate-x-1 inline-block">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 hover:translate-x-1 inline-block">Jeans</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 hover:translate-x-1 inline-block">Shirts</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 hover:translate-x-1 inline-block">Cord Sets</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 hover:translate-x-1 inline-block">Sale</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide">CUSTOMER SERVICE</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-400 text-xs">
            <div className="flex gap-2">
              <Phone size={16} className="flex-shrink-0 mt-0.5" />
              <span>+91 98125-94125</span>
            </div>
            <div className="flex gap-2">
              <MapPin size={16} className="flex-shrink-0 mt-0.5" />
              <span>India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 md:justify-end">
            <a href="https://www.instagram.com/semewz?igsh=cTk5cHBkcjZ2Z2Z3" className="text-gray-400 hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8"></div>

        {/* Legal Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>&copy; 2026 SEMEWZ. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
