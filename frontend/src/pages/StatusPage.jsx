import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../Css/Status.css";

const Status = () => {
  const { packages, setPackages } = useAppContext();
  const navigate = useNavigate();

  if (packages.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>No packages scanned</h3>
      </div>
    );
  }

  const updateStatus = (index, status) => {
    const updated = [...packages];
    updated[index].status = status;
    setPackages(updated);
  };
const handleContinue = () => {
  const confirmProceed = window.confirm(
    "Have you finalized all package statuses?\n\nYou can still edit them if needed.",
  );

  if (!confirmProceed) return;

  navigate("/driver");
};

  return (
    <div className="status-container">
      <h2>Assign Package Status</h2>
      <p>Total Packages: {packages.length}</p>

      <div className="status-list">
        {packages.map((pkg, index) => (
          <div className="status-row" key={index}>
            <span className="pkg-id">
              {index + 1}. {pkg.packageId}
            </span>

            <select
              value={pkg.status}
              onChange={(e) => updateStatus(index, e.target.value)}
            >
              <option value="ATTEMPT">Attempt</option>
              <option value="DELIVERED">Delivered</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        ))}
      </div>

      <button className="primary-btn" onClick={handleContinue}>
        Continue → Driver Confirmation
      </button>
    </div>
  );
};

export default Status;
