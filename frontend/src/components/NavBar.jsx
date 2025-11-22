import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/novaafriq-logo.jpg";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const getUserName = () =>
    user?.name || user?.firstName || user?.username || "";

  return (
    <nav className="bg-green-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={Logo}
            alt="NovaAfriq Logo"
            className="w-12 h-12 object-cover rounded-full border border-yellow-400"
          />
          <span className="text-2xl font-bold tracking-wide">
            NovaAfriq
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6 text-lg">

          <Link to="/shop" className="hover:text-yellow-300">Shop</Link>
          <Link to="/new-arrivals" className="hover:text-yellow-300">New Arrivals</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
          <Link to="/cart" className="hover:text-yellow-300">Cart</Link>

          {/* If NOT logged in */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-yellow-300">Login</Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-yellow-300 font-semibold">
                Hi {getUserName()}
              </span>

              {/* Designer Dashboard only */}
              {user.role === "designer" && (
                <Link to="/dashboard" className="hover:text-yellow-300">
                  Designer Dashboard
                </Link>
              )}

              {/* Buyer: NO dashboard link, no extra Shop link */}
              {/* Buyers automatically use regular site pages */}

              <button
                onClick={logout}
                className="hover:text-yellow-300 ml-3"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
