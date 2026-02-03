import { useNavigate } from "react-router-dom";
import "../Css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>📦 Return/Attempt Scan System</h1>
        <p>Scan packages store-wise and generate daily reports</p>

        <button className="primary-btn" onClick={() => navigate("/store")}>
          Start Scanning
        </button>
      </div>
    </div>
  );
};

export default Home;
