import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, ArrowLeft, ShoppingBag, Loader2, QrCode, Smartphone, Banknote } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function Checkout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [error, setError] = useState('')
  const [location, setLocation] = useState({ latitude: null, longitude: null, address: '' })
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery')
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'India'
  })

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    if (cartItems.length === 0) {
      navigate('/cart')
      return
    }
    setAddress(prev => ({ ...prev, fullName: user.fullName || '' }))
  }, [user, cartItems.length, navigate])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setError('')
    setLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          address: `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`
        })
        setLocationLoading(false)
      },
      () => {
        setError('Could not get your location. You can still enter address manually.')
        setLocationLoading(false)
      }
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  const subtotal = getTotalPrice()
  const taxAmount = Math.round(subtotal * 0.18)
  const totalAmount = subtotal + taxAmount

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setError('')
    if (!address.street?.trim() || !address.city?.trim() || !address.state?.trim() || !address.zip?.trim()) {
      setError('Please fill in all address fields.')
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
            image: i.image
          })),
          shippingAddress: address,
          location: (location.latitude != null && location.longitude != null) ? location : undefined,
          subtotal,
          taxAmount,
          totalAmount,
          paymentMethod
        })
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data?.message || 'Order failed')
        setLoading(false)
        return
      }
      clearCart()
      navigate('/order-success', { state: { order: data.order } })
    } catch (err) {
      setError('Unable to connect to server. Please try again.')
      setLoading(false)
    }
  }

  if (!user || cartItems.length === 0) return null

  return (
    <div className="min-h-screen bg-semwz-peach">
      <div className="bg-semwz-peach border-b border-semwz-black/15 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <Link to="/cart" className="inline-flex items-center gap-2 text-semwz-black hover:text-semwz-black/70 transition mb-4">
            <ArrowLeft size={18} />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold text-semwz-black">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-semwz-black mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-semwz-black mb-1">Full Name</label>
                  <input name="fullName" value={address.fullName} onChange={handleChange} required placeholder="Your name" className="w-full px-4 py-3 bg-semwz-peach/20 border border-semwz-black/10 rounded-lg focus:outline-none focus:border-semwz-black/30" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-semwz-black mb-1">Street Address</label>
                  <input name="street" value={address.street} onChange={handleChange} required placeholder="House no., building, street" className="w-full px-4 py-3 bg-semwz-peach/20 border border-semwz-black/10 rounded-lg focus:outline-none focus:border-semwz-black/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-semwz-black mb-1">City</label>
                  <input name="city" value={address.city} onChange={handleChange} required placeholder="City" className="w-full px-4 py-3 bg-semwz-peach/20 border border-semwz-black/10 rounded-lg focus:outline-none focus:border-semwz-black/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-semwz-black mb-1">State</label>
                  <input name="state" value={address.state} onChange={handleChange} required placeholder="State" className="w-full px-4 py-3 bg-semwz-peach/20 border border-semwz-black/10 rounded-lg focus:outline-none focus:border-semwz-black/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-semwz-black mb-1">ZIP / PIN</label>
                  <input name="zip" value={address.zip} onChange={handleChange} required placeholder="ZIP code" className="w-full px-4 py-3 bg-semwz-peach/20 border border-semwz-black/10 rounded-lg focus:outline-none focus:border-semwz-black/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-semwz-black mb-1">Country</label>
                  <input name="country" value={address.country} onChange={handleChange} required className="w-full px-4 py-3 bg-semwz-peach/20 border border-semwz-black/10 rounded-lg focus:outline-none focus:border-semwz-black/30" />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-semwz-black mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'cash_on_delivery' ? 'border-semwz-black bg-semwz-peach/20' : 'border-semwz-black/15 hover:border-semwz-black/30'}`}>
                  <input type="radio" name="payment" value="cash_on_delivery" checked={paymentMethod === 'cash_on_delivery'} onChange={() => setPaymentMethod('cash_on_delivery')} className="sr-only" />
                  <Banknote className="w-6 h-6 text-semwz-black flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-semwz-black block">Cash on Delivery</span>
                    <span className="text-sm text-semwz-black/60">Pay when your order is delivered</span>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'paytm' ? 'border-semwz-black bg-semwz-peach/20' : 'border-semwz-black/15 hover:border-semwz-black/30'}`}>
                  <input type="radio" name="payment" value="paytm" checked={paymentMethod === 'paytm'} onChange={() => setPaymentMethod('paytm')} className="sr-only" />
                  <Smartphone className="w-6 h-6 text-semwz-black flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-semwz-black block">Paytm</span>
                    <span className="text-sm text-semwz-black/60">Pay via Paytm wallet or UPI linked to Paytm</span>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'qr_code' ? 'border-semwz-black bg-semwz-peach/20' : 'border-semwz-black/15 hover:border-semwz-black/30'}`}>
                  <input type="radio" name="payment" value="qr_code" checked={paymentMethod === 'qr_code'} onChange={() => setPaymentMethod('qr_code')} className="sr-only" />
                  <QrCode className="w-6 h-6 text-semwz-black flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-semwz-black block">Scan QR Code</span>
                    <span className="text-sm text-semwz-black/60">Scan QR at delivery to pay via UPI</span>
                  </div>
                </label>
              </div>
              {paymentMethod === 'qr_code' && (
                <div className="mt-4 p-4 bg-semwz-peach/30 rounded-xl border border-semwz-black/10">
                  <p className="text-sm text-semwz-black/80">A QR code will be shown at the time of delivery. Scan with any UPI app to pay.</p>
                </div>
              )}
            </div>

            {/* Exact location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-semwz-black mb-2">Exact Location</h2>
              <p className="text-sm text-semwz-black/60 mb-3">Optional: use your current GPS location for delivery.</p>
              <button type="button" onClick={getCurrentLocation} disabled={locationLoading} className="inline-flex items-center gap-2 px-4 py-2 bg-semwz-black/10 text-semwz-black rounded-lg hover:bg-semwz-black/20 transition disabled:opacity-50">
                {locationLoading ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
                Use my location
              </button>
              {location.address && <p className="mt-2 text-sm text-green-700">Location: {location.address}</p>}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-semwz-black mb-4 flex items-center gap-2">
                <ShoppingBag size={20} />
                Order Summary
              </h2>
              <div className="space-y-2 mb-4">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm text-gray-700">
                    <span>{item.name.substring(0, 22)}... x {item.quantity}</span>
                    <span className="font-semibold text-semwz-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-semwz-black/10 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span>Tax (18%)</span><span className="font-semibold">₹{taxAmount.toLocaleString()}</span></div>
              </div>
              <div className="flex justify-between items-center border-t border-semwz-black/10 pt-4 mb-6">
                <span className="font-bold text-lg text-semwz-black">Total</span>
                <span className="font-bold text-lg text-semwz-black">₹{totalAmount.toLocaleString()}</span>
              </div>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
              <button type="submit" disabled={loading} className="w-full py-3 bg-semwz-black text-white font-semibold rounded-lg hover:bg-semwz-black/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <Loader2 size={20} className="animate-spin" /> : null}
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
