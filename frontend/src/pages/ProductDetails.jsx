// src/pages/ProductDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart: addToCartContext } = useContext(CartContext) || {};

  // Render backend URL
  const BASE_URL = "https://mern-final-project-toluwaseeni-1.onrender.com";

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        let p = res.data;

        if (p?.image) {
          let img = p.image.replace(/\\/g, "/").replace(/^\//, "");
          p.image = img.startsWith("http") ? img : `${BASE_URL}/${img}`;
        }

        setProduct(p);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };

    loadProduct();
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (addToCartContext) addToCartContext(product);

    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* IMAGE */}
        <div className="flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-96 rounded"
            />
          ) : (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded">
              No image
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            {product.name}
          </h1>

          <div className="text-yellow-600 font-bold text-xl mb-4">
            ₦{product.price?.toLocaleString()}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-3">
            <button
              onClick={addToCart}
              className="px-4 py-2 bg-green-700 text-white rounded-md font-semibold hover:bg-green-800 transition"
            >
              Add to Cart
            </button>

            <a
              href="#contact"
              className="px-4 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              Contact Designer
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <div>Category: {product.category || "—"}</div>
            <div>Designer: {product.designerName || "Unknown"}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
