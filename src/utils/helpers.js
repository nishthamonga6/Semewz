/**
 * Format price to Indian currency (INR)
 * @param {number} price - The price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

/**
 * Truncate text to specified length
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 50) => {
  if (text.length <= length) return text;
  return text.substr(0, length) + "...";
};

/**
 * Check if product is in stock
 * @param {object} product - Product object
 * @returns {boolean}
 */
export const isInStock = (product) => {
  return product.stock !== undefined ? product.stock > 0 : true;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice
 * @param {number} discountedPrice
 * @returns {number}
 */
export const calculateDiscount = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function}
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 */
export const smoothScroll = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Group products with same name or baseProduct into a single listing.
 * @param {Array} products - Array of product objects
 * @returns {Array} grouped product objects with combined variants
 */
export const groupProductsByBaseName = (products) => {
  const groups = new Map();

  products.forEach((product) => {
    const baseName =
      product.baseProduct?.trim() || product.name?.trim() || `${product.id}`;
    if (!groups.has(baseName)) {
      groups.set(baseName, []);
    }
    groups.get(baseName).push(product);
  });

  return Array.from(groups.entries()).map(([baseName, variants]) => {
    const allSizes = Array.from(
      new Set(variants.flatMap((item) => item.sizes || [])),
    );
    const representative = variants[0];
    return {
      ...representative,
      name: baseName,
      color:
        variants.length > 1
          ? `${variants.length} colors`
          : representative.color,
      sizes: allSizes,
      variants,
    };
  });
};
