import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const CameraScanner = ({ onScan, active }) => {
  const videoRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    readerRef.current = new BrowserMultiFormatReader(undefined, {
      delayBetweenScanAttempts: 500, // good for barcodes
    });

    let cancelled = false;

    const startCamera = async () => {
      try {
        await readerRef.current.decodeFromVideoDevice(
          null, // auto camera
          videoRef.current,
          (result) => {
            if (result && !cancelled) {
              onScan(result.getText());
            }
          },
        );
      } catch (err) {
        console.error("Camera error:", err);
        alert(
          "Camera access failed. Please refresh and allow camera permission.",
        );
      }
    };

    startCamera();

    return () => {
      cancelled = true;

      // ✅ ONLY stop video tracks (THIS IS ENOUGH)
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      readerRef.current = null;
    };
  }, [active]); // ⚠️ DO NOT add onScan here

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      autoPlay
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        background: "black",
      }}
    />
  );
};

export default CameraScanner;
