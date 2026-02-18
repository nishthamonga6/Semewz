import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package, MapPin, ChevronDown, ChevronUp, ShoppingBag, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const PAYMENT_LABELS = {
  cash_on_delivery: 'Cash on Delivery',
  paytm: 'Paytm',
  qr_code: 'Scan QR Code'
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function Orders() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/orders' } })
      return
    }
    let cancelled = false
    async function fetchOrders() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders?userId=${encodeURIComponent(user.id)}`)
        const data = await res.json()
        if (!cancelled) {
          if (!res.ok) {
            setError(data?.message || 'Failed to load orders')
            setOrders([])
          } else {
            setOrders(data.orders || [])
            setError('')
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError('Unable to connect to server.')
          setOrders([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchOrders()
    return () => { cancelled = true }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="min-h-screen bg-semwz-peach">
      <div className="bg-semwz-peach border-b border-semwz-black/15">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-semwz-black">My Orders</h1>
          <p className="text-semwz-black/60 mt-1">View and track your orders</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-semwz-black animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <Package className="w-16 h-16 text-semwz-black/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-semwz-black mb-2">No orders yet</h2>
            <p className="text-semwz-black/60 mb-6">Place your first order to see it here.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-semwz-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-semwz-black/90 transition"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedId === order.id
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full p-6 flex flex-wrap items-center justify-between gap-4 text-left hover:bg-semwz-peach/10 transition"
                  >
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-xs text-semwz-black/50 uppercase tracking-wide">Order ID</p>
                        <p className="font-mono font-semibold text-semwz-black">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-semwz-black/50">Placed</p>
                        <p className="text-sm font-medium text-semwz-black">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-semwz-black/50">Payment</p>
                        <p className="text-sm font-medium text-semwz-black">{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${order.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-semwz-black">₹{(order.totalAmount || 0).toLocaleString()}</span>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-semwz-black/10 px-6 pb-6 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-bold text-semwz-black mb-2 flex items-center gap-2">
                            <Package size={16} />
                            Items
                          </h3>
                          <ul className="space-y-2">
                            {(order.items || []).map((item, idx) => (
                              <li key={idx} className="flex gap-2 text-sm">
                                <span className="text-semwz-black/70 flex-1 truncate">{item.name}</span>
                                <span className="text-semwz-black/70">×{item.quantity}</span>
                                <span className="font-medium text-semwz-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-3 pt-3 border-t border-semwz-black/10 flex justify-between text-sm">
                            <span className="text-semwz-black/70">Subtotal</span>
                            <span className="font-medium">₹{(order.subtotal || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-semwz-black/70">Tax</span>
                            <span className="font-medium">₹{(order.taxAmount || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold mt-1">
                            <span>Total</span>
                            <span>₹{(order.totalAmount || 0).toLocaleString()}</span>
                          </div>
                        </div>
                        {order.shippingAddress && (
                          <div>
                            <h3 className="text-sm font-bold text-semwz-black mb-2 flex items-center gap-2">
                              <MapPin size={16} />
                              Shipping Address
                            </h3>
                            <p className="text-sm text-semwz-black/80 whitespace-pre-line">
                              {order.shippingAddress.fullName}
                              {'\n'}
                              {order.shippingAddress.street}
                              {'\n'}
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                              {'\n'}
                              {order.shippingAddress.country}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
