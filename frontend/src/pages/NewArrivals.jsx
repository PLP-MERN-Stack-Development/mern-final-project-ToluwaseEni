// src/pages/NewArrivals.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");

        // Sort newest first
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Fix image paths
        const processed = sorted.slice(0, 12).map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : `http://localhost:5000/${p.image.replace(/^\//, "")}`,
        }));

        setProducts(processed);
      } catch (error) {
        console.error("New Arrivals Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-green-700 text-xl">
        Loading new arrivals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          New Arrivals
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-600 text-lg">No new products available.</p>
        ) : (
          <ProductGrid products={products} onAdd={addToCart} />
        )}
      </main>
    </div>
  );
}
