import React, { useState, useEffect } from "react";
import { X, Ruler } from "lucide-react";
import ImageZoomViewer from "./ImageZoomViewer";
import { variantsArePhotoViews } from "../utils/helpers";

const SIZE_CHART = [
  { size: "XS", chest: "81-86", waist: "61-66", hip: "86-91", length: "64" },
  { size: "S", chest: "86-91", waist: "66-71", hip: "91-96", length: "66" },
  { size: "M", chest: "91-96", waist: "71-76", hip: "96-101", length: "68" },
  { size: "L", chest: "96-101", waist: "76-81", hip: "101-106", length: "70" },
  {
    size: "XL",
    chest: "101-106",
    waist: "81-86",
    hip: "106-111",
    length: "72",
  },
  {
    size: "XXL",
    chest: "106-111",
    waist: "86-91",
    hip: "111-116",
    length: "74",
  },
];

export default function ProductDetailModal({ product, onClose }) {
  const variants =
    Array.isArray(product?.variants) && product.variants.length > 0
      ? product.variants
      : [product];
  const photoViews = variantsArePhotoViews(variants);
  const [selectedVariant, setSelectedVariant] = useState(
    variants[0] || product,
  );
  const [selectedSize, setSelectedSize] = useState(
    variants[0]?.sizes?.[0] || "",
  );
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    const firstVariant = variants[0] || product;
    setSelectedVariant(firstVariant);
    setSelectedSize(firstVariant?.sizes?.[0] || "");
  }, [product]);

  if (!product) return null;

  const availableSizes = selectedVariant?.sizes || [];
  const allSizes = Array.from(
    new Set(variants.flatMap((item) => item.sizes || [])),
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition"
          aria-label="Close"
        >
          <X size={20} className="text-semwz-black" />
        </button>

        {/* Image with Zoom */}
        <div className="lg:w-1/2 aspect-[3/4] bg-gray-100 flex-shrink-0">
          <ImageZoomViewer
            src={selectedVariant?.image || product.image}
            alt={product.name}
          />
        </div>

        {/* Content */}
        <div className="lg:w-1/2 flex flex-col overflow-y-auto p-6 lg:p-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-semwz-black mb-1 pr-10">
            {product.name}
          </h2>
          <p className="text-semwz-black/60 text-sm mb-2">
            {variants.length > 1
              ? photoViews
                ? `${variants.length} views (full look & close-up)`
                : `${variants.length} colours available`
              : selectedVariant?.viewLabel || selectedVariant?.color}
          </p>
          {selectedVariant?.price != null && (
            <p className="text-2xl font-bold text-semwz-black mb-4">
              ₹{selectedVariant.price?.toLocaleString()}
            </p>
          )}
          <p className="text-sm text-gray-600 mb-6">
            {selectedVariant?.description || product.description}
          </p>

          {/* Colours or product photos (e.g. jeans: full look vs close-up) */}
          {variants.length > 1 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-semwz-black">
                  {photoViews ? "Views" : "Available colours"}
                </label>
                <span className="text-xs text-gray-500">
                  {selectedVariant?.viewLabel || selectedVariant?.color}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`py-3 px-2 text-xs rounded-lg text-left border transition ${
                      selectedVariant?.id === variant.id
                        ? "border-semwz-black bg-semwz-black text-white"
                        : "border-gray-200 bg-white text-semwz-black hover:border-semwz-black"
                    }`}
                  >
                    {variant.viewLabel || variant.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-semwz-black">
                Size
              </label>
              <button
                type="button"
                onClick={() => setShowSizeChart(!showSizeChart)}
                className="text-xs font-medium text-semwz-black/70 hover:text-semwz-black flex items-center gap-1"
              >
                <Ruler size={14} />
                Size chart
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(availableSizes || []).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[44px] py-2 px-3 text-sm font-medium rounded-lg border-2 transition ${
                    selectedSize === size
                      ? "bg-semwz-black text-white border-semwz-black"
                      : "bg-white text-semwz-black border-gray-300 hover:border-semwz-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {allSizes.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                {photoViews ? "Available sizes" : "Available sizes across colours"}
                : {allSizes.join(", ")}
              </p>
            )}
          </div>

          {showSizeChart && (
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-xs border border-semwz-black/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-semwz-peach/30">
                    <th className="p-2 text-left font-semibold">Size</th>
                    <th className="p-2 text-left font-semibold">Chest (cm)</th>
                    <th className="p-2 text-left font-semibold">Waist (cm)</th>
                    <th className="p-2 text-left font-semibold">Hip (cm)</th>
                    <th className="p-2 text-left font-semibold">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.filter((row) =>
                    availableSizes.includes(row.size),
                  ).map((row) => (
                    <tr
                      key={row.size}
                      className="border-t border-semwz-black/10"
                    >
                      <td className="p-2 font-medium">{row.size}</td>
                      <td className="p-2">{row.chest}</td>
                      <td className="p-2">{row.waist}</td>
                      <td className="p-2">{row.hip}</td>
                      <td className="p-2">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
