import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";  // Import the Login page
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Analyzepage from "./pages/Analyzepage";
import HealthChatPage from "./pages/HealthchatPage";
import GeneralChatPage from "./pages/GeneralChatPage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/signup" element={<Signup />} />
        <Route path ="/profile" element={<Profile />} />
        <Route path ="/analyzepage" element={<Analyzepage />} />
        <Route path ="/health-chat" element={<HealthChatPage />} />
        <Route path ="/general-chat" element={<GeneralChatPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
