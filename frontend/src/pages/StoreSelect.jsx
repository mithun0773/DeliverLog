import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../Css/StoreSelect.css";
import { FaStore, FaUserCheck } from "react-icons/fa";

const StoreSelect = () => {
  const [storeName, setStoreName] = useState("");
  const [associateName, setAssociateName] = useState("");

  const { setStore, setDeliveryAssociate } = useAppContext();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!storeName.trim() || !associateName.trim()) {
      alert("Please enter store name and delivery associate name");
      return;
    }

    setStore(storeName.trim().toUpperCase());
    setDeliveryAssociate(associateName.trim());

    navigate("/scan");
  };

  return (
    <div className="store-container">
      <h2>Start Delivery Scan</h2>

      <input
        type="text"
        placeholder="Enter Store Name (Eg: Chennai-Hub-01)"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Delivery Associate Name"
        value={associateName}
        onChange={(e) => setAssociateName(e.target.value)}
      />

      <button className="primary-btn" onClick={handleContinue}>
        Continue → Scan Packages
      </button>
    </div>
  );
};

export default StoreSelect;
