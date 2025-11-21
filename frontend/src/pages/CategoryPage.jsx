// src/pages/CategoryPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/products");
        setProducts((res.data || []).filter(p => p.category === category));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Category: {category}</h1>
        <ProductGrid products={products} onAdd={addToCart} />
      </main>
    </div>
  );
}
