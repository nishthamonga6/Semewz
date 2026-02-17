import React from 'react'
import { useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'

const map = {
  'new-arrivals': { items: products.new, title: 'New Arrivals', subtitle: "Fresh pieces just dropped — explore what's new this season" },
  'jeans': { items: products.jeans, title: 'Jeans', subtitle: 'Perfectly crafted jeans for every occasion and style' },
  'shirts': { items: products.shirts, title: 'Shirts', subtitle: 'Premium quality shirts that define your everyday aesthetic' },
  'co-ord-sets': { items: products.cordsets, title: 'Co-ord Sets', subtitle: 'Effortless matching pieces that take the guesswork out of getting dressed' },
}

export default function CategoryPage({ staticSlug }) {
  const { slug: paramSlug } = useParams()
  const slug = staticSlug || paramSlug
  const entry = map[slug]

  if (!entry) {
    return (
      <div className="min-h-screen bg-semwz-peach flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-semwz-black">Category not found</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProductGrid products={entry.items} title={entry.title} subtitle={entry.subtitle} id={slug} />
    </div>
  )
}
