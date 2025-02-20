import { useState } from "react";
import axios from "axios";

const api_url = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", api_url); // Debugging

const HealthChatPage = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState({ systolic: "", diastolic: "" });
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${api_url}/api/health/health_chat`, {
        height,
        weight,
        bloodPressure,
      });
      setResponse(res.data.analysis);
    } catch (err) {
      console.error(err);
      setResponse("Error analyzing health data.");
    }
  };

  return (
    <div>
      <h2>Health Chat</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
        <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <input type="number" placeholder="Systolic BP" value={bloodPressure.systolic} onChange={(e) => setBloodPressure({ ...bloodPressure, systolic: e.target.value })} />
        <input type="number" placeholder="Diastolic BP" value={bloodPressure.diastolic} onChange={(e) => setBloodPressure({ ...bloodPressure, diastolic: e.target.value })} />
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default HealthChatPage;
