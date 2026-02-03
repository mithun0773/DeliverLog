import { useRef, useState, useEffect } from "react";

const SignaturePad = ({ onSave }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  // Setup canvas for high DPI screens (mobile smoothness)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = 350 * ratio;
    canvas.height = 180 * ratio;
    canvas.style.width = "350px";
    canvas.style.height = "180px";

    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 3; // 🔥 smoother line
    ctx.lineCap = "round"; // 🔥 smooth edges
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDraw = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const image = canvasRef.current.toDataURL("image/png");
    onSave(image);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{
          border: "2px dashed #888",
          borderRadius: "8px",
          background: "#fff",
          touchAction: "none", // 🔥 required for mobile
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />

      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <button type="button" onClick={clearSignature}>
          Clear
        </button>
        <button type="button" onClick={saveSignature}>
          Save Signature
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
