// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-brandGreen mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="bg-brandWhite rounded-lg shadow p-4 flex items-center gap-4">
                <img
                    src={
                        item.image?.startsWith("http")
                        ? item.image
                        : `http://localhost:5000/${item.image?.replace(/\\/g, "/").replace(/^\//, "")}`
                 }
                 alt={item.name}
                  className="w-20 h-20 object-cover rounded"
              />
                <div className="flex-1">
                  <h3 className="font-semibold text-brandBlack">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Qty: {item.qty || 1}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-600 font-bold">₦{item.price}</div>
                </div>
              </div>
            ))}

            <div className="bg-brandWhite rounded-lg shadow p-4 flex justify-between items-center">
              <div className="text-lg font-semibold">Total</div>
              <div className="text-xl font-bold text-yellow-600">₦{total}</div>
            </div>

            <Link to="/checkout">
              <button className="w-full bg-brandGreen text-brandWhite py-3 rounded-md font-semibold hover:bg-green-800 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
