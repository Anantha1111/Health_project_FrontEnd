import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake } from "react-icons/fa"; // Icons

const api_url = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", api_url); // Debugging

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.name || !user.email || !user.age || !user.password || !user.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${api_url}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Signup failed");
      } else {
        toast.success("Signup Successful! 🎉");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center border p-2 rounded">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4 flex items-center border p-2 rounded">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 flex items-center border p-2 rounded">
            <FaBirthdayCake className="text-gray-500 mr-2" />
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              placeholder="Enter your age"
            />
          </div>
          <div className="mb-4 flex items-center border p-2 rounded">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4 flex items-center border p-2 rounded">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
