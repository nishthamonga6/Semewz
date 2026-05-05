import { memo } from "react";
import { useProductDetail } from "../context/ProductDetailContext";
import { variantsArePhotoViews } from "../utils/helpers";

function ProductCard({ product, variants = [] }) {
  const { openProduct } = useProductDetail();
  const productVariants = variants.length > 0 ? variants : [product];
  const photoViews = variantsArePhotoViews(productVariants);
  const displayColor =
    productVariants.length > 1
      ? photoViews
        ? `${productVariants.length} views`
        : `${productVariants.length} colors`
      : product.viewLabel || product.color;

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
        <div className="product-image-frame">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop";
            }}
          />
        </div>

        {/* New Badge */}
        {product.category === "new" && (
          <div className="absolute top-4 left-4 bg-semwz-black text-white px-3 py-1 text-xs font-semibold tracking-wide rounded-lg z-10">
            NEW
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 lg:p-4">
        <h3 className="text-sm lg:text-base font-semibold text-semwz-black mb-0.5 line-clamp-2">
          {product.name}
        </h3>

        {displayColor ? (
          <p className="text-xs text-gray-600 mb-1.5">{displayColor}</p>
        ) : null}

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
