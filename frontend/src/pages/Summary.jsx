import { useAppContext } from "../context/AppContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import "../Css/Summary.css";
import { useState } from "react";


const Summary = () => {
  const {
    store,
    date,
    packages,
    driverName,
    driverSignature,
    deliveryAssociate,
  } = useAppContext();

  const pdfRef = useRef(null);
const [pdfMode, setPdfMode] = useState(false);

  const delivered = packages.filter((p) => p.status === "DELIVERED").length;
  const attempt = packages.filter((p) => p.status === "ATTEMPT").length;
  const rejected = packages.filter((p) => p.status === "REJECTED").length;
  const total = packages.length;

 const downloadPDF = async () => {
   setPdfMode(true); // 🔥 expand content

   // wait for DOM to update
   setTimeout(async () => {
     const canvas = await html2canvas(pdfRef.current, {
       scale: 2, // 🔥 better quality
       useCORS: true,
       windowWidth: pdfRef.current.scrollWidth,
       windowHeight: pdfRef.current.scrollHeight,
     });

     const imgData = canvas.toDataURL("image/png");
     const pdf = new jsPDF("p", "mm", "a4");

     const pageWidth = 210;
     const pageHeight = 297;
     const imgHeight = (canvas.height * pageWidth) / canvas.width;

     let heightLeft = imgHeight;
     let position = 0;

     pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
     heightLeft -= pageHeight;

     // 🔥 handle multi-page (IMPORTANT)
     while (heightLeft > 0) {
       position = heightLeft - imgHeight;
       pdf.addPage();
       pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
       heightLeft -= pageHeight;
     }

     pdf.save(`Delivery_Summary_${store}_${date}.pdf`);

     setPdfMode(false); // 🔥 restore UI
   }, 300);
 };
const downloadCSV = () => {
  if (!packages.length) return;

  const headers = [
    "Date",
    "Store",
    "Delivery Associate",
    "Driver",
    "Package ID",
    "Status",
  ];

  const rows = packages.map((pkg) => [
    date,
    store,
    deliveryAssociate,
    driverName,
    pkg.packageId,
    pkg.status,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((val) => `"${val}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Delivery_Report_${store}_${date}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="summary-page">
      <div className="summary-wrapper" ref={pdfRef}>
        {/* HEADER */}
        <div className="summary-header">
          <h1>Daily Attempt/Return Summary</h1>
          <div className="summary-meta">
            <span>
              <b>Store:</b> {store}
            </span>
            <span>
              <b>Date:</b> {date}
            </span>
            <span>
              <b>Delivery Associate:</b> {deliveryAssociate}
            </span>

            <span>
              <b>Driver:</b> {driverName}
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="summary-stats">
          <div className="stat delivered">
            <h2>{delivered}</h2>
            <p>Delivered</p>
          </div>
          <div className="stat attempt">
            <h2>{attempt}</h2>
            <p>Attempt</p>
          </div>
          <div className="stat rejected">
            <h2>{rejected}</h2>
            <p>Rejected</p>
          </div>
          <div className="stat total">
            <h2>{total}</h2>
            <p>Total</p>
          </div>
        </div>

        {/* PACKAGE LIST */}
        <div className="summary-section">
          <h2>Package Details</h2>

          <div className="package-table">
            <div className="table-header">
              <span>#</span>
              <span>Package ID</span>
              <span>Status</span>
            </div>

            {packages.map((pkg, index) => (
              <div className="table-row" key={index}>
                <span>{index + 1}</span>
                <span>{pkg.packageId}</span>
                <span className={`status ${pkg.status.toLowerCase()}`}>
                  {pkg.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="summary-section">
          <h2>Driver Confirmation</h2>
          <p className="signature-label">Signature:</p>
          {driverSignature && (
            <img
              src={driverSignature}
              alt="Driver Signature"
              className="signature-img"
            />
          )}
        </div>
      </div>

      {/* ACTION */}
      <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
        <button className="primary-btn" onClick={downloadPDF}>
          Download PDF
        </button>

        <button className="secondary-btn" onClick={downloadCSV}>
          Download Excel (CSV)
        </button>
      </div>
    </div>
  );
};

export default Summary;
