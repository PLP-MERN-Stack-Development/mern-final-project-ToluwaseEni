// src/components/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        No products found.
      </div>
    );
  }

  // Render backend base URL
  const BASE_URL = "https://mern-final-project-toluwaseeni-1.onrender.com";

  // Normalize every product image
  const processed = products.map((p) => {
    if (!p.image) return p;

    let img = p.image.replace(/\\/g, "/").replace(/^\//, "");

    // If already a full URL, keep it
    if (img.startsWith("http")) {
      return { ...p, image: img };
    }

    // Otherwise prefix backend domain
    return { ...p, image: `${BASE_URL}/${img}` };
  });

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
        mt-6
      "
    >
      {processed.map((p) => (
        <ProductCard key={p._id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
