import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaBirthdayCake } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", age: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login"); // Redirect to login if no user data found
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
        <form>
          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 pl-10 border rounded mt-1"
            />
          </div>
          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              placeholder="Email"
              className="w-full p-2 pl-10 border rounded mt-1 bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="mb-4 relative">
            <FaBirthdayCake className="absolute left-3 top-3 text-gray-500" />
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-2 pl-10 border rounded mt-1"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
