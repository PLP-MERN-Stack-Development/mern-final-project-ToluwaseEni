// src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products"); // baseURL includes /api
        console.log("Fetched products:", res.data);

        let cleanProducts = (Array.isArray(res.data) ? res.data : []).map((p) => {
          // 🔥 FIX IMAGE PATH HERE
          return {
            ...p,
            image: p.image?.startsWith("http")
              ? p.image
              : `http://localhost:5000/${p.image?.replace(/^\//, "")}`,
          };
        });

        setProducts(cleanProducts);

      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!products.length)
    return <p>No products available.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {/* Debug view */}
      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p><strong>Name:</strong> {p.name || "Unnamed Product"}</p>
          <p><strong>Price:</strong> ₦{p.price || "0.00"}</p>

          {/* Show image (for debugging) */}
          {p.image && (
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "120px", marginTop: "10px", borderRadius: "6px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
