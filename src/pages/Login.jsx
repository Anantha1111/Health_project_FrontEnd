import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const api_url = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", api_url); // Debugging

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state added
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new request

    if (!email || !password) {
      setError("Both fields are required");
      toast.error("Both fields are required");
      return;
    }

    try {
      const response = await fetch(`${api_url}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      } else {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            name: data.user.name,
            email: data.user.email,
          })
        );
        toast.success("Login Successful!");
        navigate("/analyzepage");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center border p-2 rounded">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 flex items-center border p-2 rounded">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
