// src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Your Render backend base URL
  const BASE_URL = "https://mern-final-project-toluwaseeni-1.onrender.com";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");

        let cleanProducts = (Array.isArray(res.data) ? res.data : []).map(
          (p) => {
            let img = p.image?.replace(/\\/g, "/").replace(/^\//, "");

            return {
              ...p,
              image: img?.startsWith("http") ? img : `${BASE_URL}/${img}`,
            };
          }
        );

        setProducts(cleanProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-600 py-10">Loading products...</p>
    );

  if (error)
    return <p className="text-center text-red-600 py-10">{error}</p>;

  if (!products.length)
    return <p className="text-center py-10">No products available.</p>;

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        Latest Products
      </h1>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      "
      >
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
