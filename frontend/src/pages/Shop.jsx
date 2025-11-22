// src/pages/Shop.jsx
import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchQ, setSearchQ] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  // 🔥 Use your Render backend URL
  const BASE_URL = "https://mern-final-project-toluwaseeni-1.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        const processed = res.data.map((p) => {
          let img = p.image || "";

          // Normalize slashes
          img = img.replace(/\\/g, "/").replace(/^\//, "");

          // If already a full URL keep it
          if (img.startsWith("http")) {
            return { ...p, image: img };
          }

          // Otherwise prefix with backend domain
          return {
            ...p,
            image: `${BASE_URL}/${img}`,
          };
        });

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

  // Toast wrapper
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

        <ProductGrid products={filtered} onAdd={handleAddToCart} />
      </main>
    </div>
  );
}
