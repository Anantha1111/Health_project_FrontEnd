import { useState } from "react";
import axios from "axios";

// Ensure environment variables are loaded correctly
const api_url = import.meta.env.VITE_BACKEND_URL;
console.log("API URL:", api_url);

const GeneralChatPage = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${api_url}/api/health/general_chat`, { message });
      setResponse(res.data.response);
    } catch (err) {
      console.error("Error:", err);
      setResponse("Error processing the query.");
    }
  };

  return (
    <div>
      <h2>General Chat</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Ask anything..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default GeneralChatPage;
