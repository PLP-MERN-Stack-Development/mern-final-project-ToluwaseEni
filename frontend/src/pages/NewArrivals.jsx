// src/pages/NewArrivals.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  // 🔥 Use your Render backend URL
  const BASE_URL = "https://mern-final-project-toluwaseeni-1.onrender.com";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");

        // Sort newest first
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Fix broken image paths for deployment
        const processed = sorted.slice(0, 12).map((p) => {
          let img = p.image || "";

          // normalize slashes
          img = img.replace(/\\/g, "/").replace(/^\//, "");

          // if already full URL, keep it
          if (img.startsWith("http")) {
            return { ...p, image: img };
          }

          // otherwise prefix backend domain
          return {
            ...p,
            image: `${BASE_URL}/${img}`,
          };
        });

        setProducts(processed);
      } catch (error) {
        console.error("New Arrivals Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Add-to-cart with toast
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

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
          <ProductGrid products={products} onAdd={handleAddToCart} />
        )}
      </main>
    </div>
  );
}
