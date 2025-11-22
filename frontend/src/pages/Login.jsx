// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(email, password);

    // ❌ Invalid login → toast error
    if (!res.success) {
      toast.error(res.message || "Login failed");
      return;
    }

    // Clear form
    setEmail("");
    setPassword("");

    const user = res.user;

    // ✅ Success toast
    toast.success(`Welcome back, ${user.name}!`, {
      duration: 1500,
    });

    // Redirect roles
    setTimeout(() => {
      if (user.role === "designer") {
        navigate("/dashboard");
      } else {
        navigate("/shop");
      }
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-2 rounded transition 
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Logging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
