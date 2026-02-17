import ProductCardUniqlo from './ProductCardUniqlo'

export default function ProductVariantRow({ baseProduct, variants }) {
  return (
    <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
      {/* Product Group Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        {baseProduct}
      </h3>

      {/* Horizontal Scroll - Mobile First */}
      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 w-full auto-cols-max">
          {variants.map((product) => (
            <div key={product.id} className="w-44 lg:w-auto">
              <ProductCardUniqlo
                product={product}
                variants={variants}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
