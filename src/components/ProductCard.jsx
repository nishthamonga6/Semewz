import { memo } from "react";
import { useProductDetail } from "../context/ProductDetailContext";

function ProductCard({ product, variants = [] }) {
  const { openProduct } = useProductDetail();
  const productVariants = variants.length > 0 ? variants : [product];
  const displayColor =
    variants.length > 1 ? `${variants.length} colors` : product.color;

  const handleOpen = () => {
    openProduct({
      ...product,
      variants: productVariants,
    });
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="group product-card text-left rounded-2xl overflow-hidden bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-semwz-black"
      aria-label={`View ${product.name} details`}
    >
      {/* Image Container */}
      <div className="product-image-wrapper relative overflow-hidden bg-gray-100 group">
        <img
          src={product.image}
          alt={product.name}
          className="product-image transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop";
          }}
        />

        {/* New Badge */}
        {product.category === "new" && (
          <div className="absolute top-4 left-4 bg-semwz-black text-white px-3 py-1 text-xs font-semibold tracking-wide rounded-lg">
            NEW
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 lg:p-4">
        <h3 className="text-sm lg:text-base font-semibold text-semwz-black mb-0.5 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 mb-1.5">{displayColor}</p>

        {product.sizes?.length > 0 && (
          <p className="text-xs text-gray-600 mb-2">
            Sizes: {product.sizes.join(", ")}
          </p>
        )}

        {product.price != null && (
          <p className="text-base font-bold text-semwz-black mb-2">
            ₹{Number(product.price).toLocaleString()}
          </p>
        )}

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>
    </button>
  );
}

export default memo(ProductCard);
