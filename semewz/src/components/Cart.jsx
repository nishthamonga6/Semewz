import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-semwz-peach flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-16 h-16 text-semwz-black/40 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-semwz-black mb-2">Your Cart is Empty</h1>
          <p className="text-semwz-black/60 mb-6">Looks like you haven't added anything yet.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-semwz-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-semwz-black/90 transition-all duration-300"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-semwz-peach">
      {/* Header */}
      <div className="bg-semwz-peach border-b border-semwz-black/15 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-semwz-black hover:text-semwz-black/70 transition mb-4">
            <ArrowLeft size={18} />
            Back to Shopping
          </Link>
          <h1 className="text-4xl font-bold text-semwz-black">Shopping Cart</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=200&h=300&fit=crop'
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-semwz-black text-sm lg:text-base mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{item.color}</p>
                    
                    {/* Size and Price */}
                    <div className="flex items-center justify-between mb-3 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">Size:</span>
                        <span className="text-xs font-bold bg-semwz-black text-white px-2 py-1 rounded">
                          {item.size}
                        </span>
                      </div>
                      <span className="font-bold text-semwz-black">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-semwz-black/20 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-1 hover:bg-semwz-peach/50 transition"
                          title="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 font-semibold text-sm text-semwz-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-1 hover:bg-semwz-peach/50 transition"
                          title="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Remove from cart"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 h-fit">
              <h2 className="text-lg font-bold text-semwz-black mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-semwz-black/10">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm text-gray-700">
                    <span>
                      {item.name.substring(0, 20)}... x {item.quantity}
                    </span>
                    <span className="font-semibold text-semwz-black">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-semwz-black">
                    ₹{getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-semibold text-semwz-black">
                    ₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-semwz-black/10 pt-4 mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-semwz-black text-lg">Total</span>
                  <span className="font-bold text-semwz-black text-lg">
                    ₹{Math.round(getTotalPrice() * 1.18).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600">incl. 18% GST</p>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-3 bg-semwz-black text-white font-semibold rounded-lg hover:bg-semwz-black/90 transition-all duration-300 hover:shadow-lg mb-3">
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/"
                className="w-full py-3 bg-white border-2 border-semwz-black text-semwz-black font-semibold rounded-lg hover:bg-semwz-peach/50 transition-all duration-300 inline-block text-center"
              >
                Continue Shopping
              </Link>

              {/* Items Count */}
              <div className="mt-6 pt-4 border-t border-semwz-black/10 text-center">
                <p className="text-xs text-gray-600">
                  Items in cart: <span className="font-bold text-semwz-black">{getTotalItems()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
