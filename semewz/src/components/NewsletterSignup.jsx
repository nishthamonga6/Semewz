import { Mail } from 'lucide-react'
import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      console.log('Newsletter signup:', email)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-semwz-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <Mail className="mx-auto mb-6 text-semwz-peach" size={32} />
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Stay in the Loop
          </h2>
          
          <p className="text-gray-400 text-lg mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration delivered to your inbox.
          </p>

          {submitted ? (
            <div className="bg-green-50 text-green-700 px-6 py-4 rounded-lg mb-6">
              <p className="font-medium">Check your email for our welcome offer! 🎉</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-white text-semwz-black rounded-lg focus:outline-none focus:ring-2 focus:ring-semwz-peach text-sm"
              />
              <button
                type="submit"
                className="button button-primary px-6 inline-flex items-center"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-gray-500 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
