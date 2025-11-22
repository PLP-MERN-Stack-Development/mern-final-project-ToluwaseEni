import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DesignerDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const BASE_URL = "https://mern-final-project-toluwaseeni-1.onrender.com";

  useEffect(() => {
    const loadMyProducts = async () => {
      try {
        const res = await API.get("/products/my-products");

        const processed = res.data.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : `${BASE_URL}/${p.image.replace(/^\//, "")}`,
        }));

        setProducts(processed);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };

    if (user?.role === "designer") {
      loadMyProducts();
    }
  }, [user]);

  // ---------- DELETE PRODUCT ----------
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      // CORRECT DELETE ROUTE
      await API.delete(`/products/delete/${id}`);

      // Safe functional update
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting product.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  if (!user)
    return <div className="p-6 text-red-600">You must be logged in.</div>;

  if (user.role !== "designer")
    return (
      <div className="p-6 text-red-600">
        Access denied — Only designers can view this page.
      </div>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Uploaded Products</h2>

        <Link
          to="/upload-product"
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow"
        >
          + Upload Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">You have not uploaded any products yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition relative"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded-md"
              />

              <h3 className="font-semibold mt-3 text-lg">{p.name}</h3>
              <p className="text-yellow-700 font-bold text-lg">₦{p.price}</p>

              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg shadow"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignerDashboard;
