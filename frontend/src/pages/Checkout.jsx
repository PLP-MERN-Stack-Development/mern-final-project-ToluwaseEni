// src/pages/Checkout.jsx
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, setCart, total, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, [setCart]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const completeOrder = () => {
    alert("Order placed successfully!");
    clearCart();
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-brandGreen mb-6">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="bg-brandWhite rounded-lg shadow p-4 flex justify-between"
              >
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.qty || 1}</p>
                </div>
                <div className="text-yellow-600 font-bold">₦{item.price}</div>
              </div>
            ))}

            <div className="bg-brandWhite rounded-lg shadow p-4 flex justify-between items-center">
              <div className="font-semibold">Total Items</div>
              <div className="font-bold text-yellow-600">{cart.length}</div>
            </div>

            <div className="bg-brandWhite rounded-lg shadow p-4 flex justify-between items-center">
              <div className="font-semibold">Total Amount</div>
              <div className="font-bold text-yellow-600">₦{totalAmount}</div>
            </div>

            <button
              onClick={completeOrder}
              className="w-full bg-brandGreen text-brandWhite py-3 rounded-md font-semibold hover:bg-green-800 transition"
            >
              Place Order
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
