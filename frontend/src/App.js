import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import DesignerRoute from "./components/DesignerRoute";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DesignerDashboard from "./pages/DesignerDashboard";
import UploadProduct from "./pages/UploadProduct";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import NewArrivals from "./pages/NewArrivals";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="bottom-center" />

      <NavBar />

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

          {/* AUTH ROUTES */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* DESIGNER ROUTES */}
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

          {/* BUYER ROUTES REMOVED */}
          {/* BuyerDashboard deleted permanently */}

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
