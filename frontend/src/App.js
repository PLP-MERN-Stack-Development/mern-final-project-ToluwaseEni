import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";   // 🔥 HOT TOAST

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";
import DesignerRoute from "./components/DesignerRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DesignerDashboard from "./pages/DesignerDashboard";
import UploadProduct from "./pages/UploadProduct";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import NewArrivals from "./pages/NewArrivals";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* 🌟 GLOBAL TOASTER — optimized visibility + brand colors */}
      <Toaster
        position="bottom-center"     // 👈 More visible than top-right
        reverseOrder={false}
        toastOptions={{
          // Default toast styling
          style: {
            borderRadius: "8px",
            padding: "12px 16px",
            background: "#000",        // Black
            color: "#fff",             // White text
            border: "2px solid #FFD700", // Yellow border
          },

          // Success toast (Add to cart)
          success: {
            style: {
              background: "#0f9d58",      // Brand Green
              color: "#fff",
              border: "2px solid #FFD700",
            },
            iconTheme: {
              primary: "#FFD700",         // Yellow icon
              secondary: "#0f9d58",       // Green background
            },
          },

          // Error toast
          error: {
            style: {
              background: "#b91c1c",      // Red
              color: "#fff",
              border: "2px solid #FFD700",
            },
          },
        }}
      />

      {/* NAVBAR */}
      <NavBar />

      {/* PAGE CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/dashboard"
            element={
              <DesignerRoute>
                <DesignerDashboard />
              </DesignerRoute>
            }
          />

          <Route
            path="/upload-product"
            element={
              <DesignerRoute>
                <UploadProduct />
              </DesignerRoute>
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
