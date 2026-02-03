import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CameraScanner from "../components/CameraScanner";
import { useAppContext } from "../context/AppContext";
import "../Css/Scan.css";

const Scan = () => {
  const { packages, setPackages, store, date, deliveryAssociate } =
    useAppContext();

  const [manualCode, setManualCode] = useState("");
  const [mode, setMode] = useState(""); // "" | "CAMERA"
  const [scanFlash, setScanFlash] = useState(false);

  const navigate = useNavigate();

  /* ================= AUDIO (MANUAL ONLY) ================= */
  const beepRef = useRef(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const unlockAudio = () => {
    if (audioUnlocked) return;

    const audio = new Audio("/product.wav");
    audio.volume = 1;

    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        beepRef.current = audio;
        setAudioUnlocked(true);
      })
      .catch(() => {});
  };

  const playBeep = () => {
    if (!beepRef.current || !audioUnlocked) return;
    beepRef.current.currentTime = 0;
    beepRef.current.play().catch(() => {});
  };

  /* ================= SCAN LOCK ================= */
  const lastScannedRef = useRef("");
  const scanTimeoutRef = useRef(null);

  const addScan = (code, fromCamera = false) => {
    const cleanCode = code.trim();
    if (!cleanCode) return;

    // block continuous same scan
    if (lastScannedRef.current === cleanCode) return;

    // prevent duplicates
    const exists = packages.some((p) => p.packageId === cleanCode);
    if (exists) {
      lastScannedRef.current = cleanCode;
      return;
    }

    setPackages((prev) => [
      ...prev,
      { packageId: cleanCode, status: "ATTEMPT" },
    ]);

    // ✅ feedback
    if (fromCamera) {
      if (navigator.vibrate) navigator.vibrate(80); // 📳 camera feedback
    } else {
      playBeep(); // 🔊 manual feedback
    }

    setScanFlash(true);
    setTimeout(() => setScanFlash(false), 250);

    lastScannedRef.current = cleanCode;
    clearTimeout(scanTimeoutRef.current);
    scanTimeoutRef.current = setTimeout(() => {
      lastScannedRef.current = "";
    }, 1500);
  };

  /* ================= HANDLERS ================= */
  const handleManualAdd = () => {
    unlockAudio(); // 🔓 required for sound
    addScan(manualCode, false);
    setManualCode("");
  };

  const handleCameraScan = (code) => {
    addScan(code, true);
  };

  const removePackage = (id) => {
    if (!window.confirm(`Remove package ${id}?`)) return;
    setPackages((prev) => prev.filter((p) => p.packageId !== id));
  };

  useEffect(() => {
    return () => {
      lastScannedRef.current = "";
      clearTimeout(scanTimeoutRef.current);
    };
  }, []);

  /* ================= UI ================= */
  return (
    <div className="scan-container">
      {/* HEADER */}
      <div className="scan-header">
        <h2>Scan Packages</h2>
        <p>
          {store} • {date} <br />
          <small>Associate: {deliveryAssociate}</small>
        </p>
      </div>

      {/* MODE SELECT */}
      {!mode && (
        <div className="mode-select">
          <button
            className="primary-btn"
            onClick={() => {
              unlockAudio(); // 🔓 unlock sound once
              setMode("CAMERA");
            }}
          >
            📷 Scan with Camera
          </button>
          <p className="hint">Align barcode horizontally inside the box</p>
        </div>
      )}

      {/* CAMERA MODE */}
      {mode === "CAMERA" && (
        <>
          <p className="hint">Hold steady • Vibration confirms scan</p>

          <div className={`camera-box ${scanFlash ? "flash" : ""}`}>
            <CameraScanner onScan={handleCameraScan} active={true} />
          </div>

          <button className="link-btn" onClick={() => setMode("")}>
            ← Back
          </button>
        </>
      )}

      {/* MANUAL ENTRY */}
      <div className="manual-box">
        <input
          type="text"
          placeholder="Enter package ID manually"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
        />
        <button onClick={handleManualAdd}>Add</button>
      </div>

      {/* LIST */}
      {packages.length > 0 && (
        <>
          <h3 className="list-title">Scanned Packages ({packages.length})</h3>

          <ul className="list-box">
            {packages.map((pkg, index) => (
              <li
                key={pkg.packageId}
                className={index === packages.length - 1 ? "latest" : ""}
              >
                <span>{pkg.packageId}</span>
                <button
                  className="remove-btn"
                  onClick={() => removePackage(pkg.packageId)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            className="primary-btn"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/status")}
          >
            Continue → Assign Status
          </button>
        </>
      )}
    </div>
  );
};

export default Scan;
