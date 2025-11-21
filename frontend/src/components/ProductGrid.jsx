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

  // Normalize image URLs for safety
  const processed = products.map((p) => ({
    ...p,
    image: p.image?.startsWith("http")
      ? p.image
      : `http://localhost:5000/${p.image?.replace(/^\//, "")}`,
  }));

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {processed.map((p) => (
        <ProductCard key={p._id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
