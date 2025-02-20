import { useNavigate } from "react-router-dom";

const AnalyzePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Analyze Page</h2>
      <button onClick={() => navigate("/health-chat")}>Health Chat</button>
      <button onClick={() => navigate("/general-chat")}>General Chat</button>
    </div>
  );
};

export default AnalyzePage;
