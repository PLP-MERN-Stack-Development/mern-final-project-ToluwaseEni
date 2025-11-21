// src/pages/DesignerDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

const DesignerDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadMyProducts = async () => {
      try {
        const res = await API.get("/products/my-products");

        const processed = res.data.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : `http://localhost:5000/${p.image.replace(/^\//, "")}`,
        }));

        setProducts(processed);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };

    loadMyProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Uploaded Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded-md"
              />

              <h3 className="font-semibold mt-3 text-lg">{p.name}</h3>
              <p className="text-yellow-700 font-bold text-lg">₦{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignerDashboard;
