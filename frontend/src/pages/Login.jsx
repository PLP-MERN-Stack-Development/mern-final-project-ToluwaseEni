// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(email, password);

    if (!res.success) {
      setMessage(res.message);
      return;
    }

    const loggedUser = res.user;

    setMessage(`Login successful! Welcome ${loggedUser.name}`);

    setTimeout(() => {
      if (loggedUser.role === "designer") {
        navigate("/dashboard");
      } else {
        navigate("/shop");
      }
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {message && <p className="mb-3 text-green-600">{message}</p>}

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
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
