// src/pages/UploadProduct.jsx
import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UploadProduct() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();   // <-- ADD NAVIGATE

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMsg("Please upload a product image.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("image", image);

      const token = localStorage.getItem("token");

      const res = await API.post("/products/upload", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("Product uploaded successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
      });
      setImage(null);
      setPreview("");

      // ⭐ Redirect after successful upload
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      console.error("Upload error:", err);
      setMsg(
        err.response?.data?.message || "Something went wrong during upload."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "designer") {
    return (
      <div className="text-center mt-10 text-red-500">
        You are not authorized to upload products.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Upload New Product</h1>

      {msg && <p className="mb-4 text-center font-medium text-red-500">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price (₦)"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          rows="4"
        ></textarea>

        {/* Image upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded border mb-3"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-semibold text-white rounded ${
            loading ? "bg-gray-400" : "bg-brandGreen hover:bg-green-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
