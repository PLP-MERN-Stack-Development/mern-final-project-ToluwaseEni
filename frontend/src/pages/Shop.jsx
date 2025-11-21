// src/pages/Shop.jsx
import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";   // ✅ ADD TOAST

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchQ, setSearchQ] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext); // already correct

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        // Fix image paths and normalize
        const processed = res.data.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : `http://localhost:5000/${p.image
                .replace(/\\/g, "/")
                .replace(/^\//, "")}`,
        }));

        setProducts(processed);
        setFiltered(processed);

        const uniqueCategories = [
          "All",
          ...new Set(processed.map((p) => p.category).filter(Boolean)),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Shop fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtering logic
  useEffect(() => {
    let list = [...products];

    if (searchQ.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchQ.toLowerCase())
      );
    }

    if (category !== "All") {
      list = list.filter(
        (p) =>
          p.category?.toLowerCase().trim() === category.toLowerCase().trim()
      );
    }

    setFiltered(list);
  }, [searchQ, category, products]);

  // ✅ Wrap addToCart with Toast
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Shop</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filtered}
          onAdd={handleAddToCart}   // ✅ FIX: NOW SHOWS TOAST
        />
      </main>
    </div>
  );
}
