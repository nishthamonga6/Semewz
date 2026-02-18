import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, ArrowRight, ShoppingBag, Package, MapPin } from 'lucide-react'

const PAYMENT_LABELS = {
  cash_on_delivery: 'Cash on Delivery',
  paytm: 'Paytm',
  qr_code: 'Scan QR Code'
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function OrderSuccess() {
  const location = useLocation()
  const order = location.state?.order

  return (
    <div className="min-h-screen bg-semwz-peach py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-semwz-black mb-2">Order Placed!</h1>
          <p className="text-semwz-black/70">Thank you for shopping with SEMWZ.</p>
        </div>

        {order && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-semwz-black/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-semwz-black/60">Order ID</p>
                <p className="font-mono font-semibold text-semwz-black">{order.id}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                <p className="text-sm text-semwz-black/60">Placed on</p>
                <p className="text-sm font-medium text-semwz-black">{formatDate(order.createdAt)}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                <p className="text-sm text-semwz-black/60">Payment</p>
                <p className="text-sm font-medium text-semwz-black">{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                <p className="text-sm text-semwz-black/60">Status</p>
                <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{order.status || 'Pending'}</span>
              </div>
            </div>

            <div className="p-6 border-b border-semwz-black/10">
              <h2 className="text-sm font-bold text-semwz-black mb-3 flex items-center gap-2">
                <Package size={18} />
                Items
              </h2>
              <ul className="space-y-3">
                {(order.items || []).map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-14 h-18 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">—</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-semwz-black truncate">{item.name}</p>
                      <p className="text-xs text-semwz-black/60">Size: {item.size} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-semwz-black">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>

            {order.shippingAddress && (
              <div className="p-6 border-b border-semwz-black/10">
                <h2 className="text-sm font-bold text-semwz-black mb-3 flex items-center gap-2">
                  <MapPin size={18} />
                  Shipping Address
                </h2>
                <p className="text-sm text-semwz-black/80">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            )}

            <div className="p-6 bg-semwz-peach/20">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-semwz-black/70">Subtotal</span>
                <span className="font-medium text-semwz-black">₹{(order.subtotal || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-semwz-black/70">Tax</span>
                <span className="font-medium text-semwz-black">₹{(order.taxAmount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-semwz-black/10 mt-3">
                <span className="font-bold text-semwz-black">Total</span>
                <span className="font-bold text-lg text-semwz-black">₹{(order.totalAmount || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {!order && location.state?.orderId && (
          <p className="text-center text-semwz-black/60 mb-6">Order ID: {location.state.orderId}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-semwz-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-semwz-black/90 transition"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 border-2 border-semwz-black text-semwz-black font-semibold px-6 py-3 rounded-lg hover:bg-semwz-peach/50 transition"
          >
            View All Orders
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center justify-center gap-2 border-2 border-semwz-black/30 text-semwz-black font-semibold px-6 py-3 rounded-lg hover:bg-semwz-peach/30 transition"
          >
            Cart
          </Link>
        </div>
      </div>
    </div>
  )
}
