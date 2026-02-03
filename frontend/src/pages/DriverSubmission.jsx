import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignaturePad from "../components/SignaturePad";
import "../Css/DriverSubmission.css";

const DriverSubmission = () => {
  const { store, date, setDriverName, setDriverSignature } = useAppContext();

  const [name, setName] = useState("");
  const [signature, setSignature] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !signature) {
      alert("Driver name and signature required");
      return;
    }

    setDriverName(name);
    setDriverSignature(signature);

    navigate("/summary");
  };

  return (
    <div className="driver-container">
      <h2>Driver Submission</h2>

      <p>
        <b>Store:</b> {store}
      </p>
      <p>
        <b>Date:</b> {date}
      </p>

      <input
        type="text"
        placeholder="Driver Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="signature-box">
        <SignaturePad onSave={setSignature} />
      </div>

      <button className="primary-btn" onClick={handleSubmit}>
        Submit & View Summary
      </button>
    </div>
  );
};

export default DriverSubmission;
