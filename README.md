# 📦 DeliverLog

## 🌐 Live Demo

👉 **Live Application:**  
http://deliverlog.netlify.app

> ⚠️ Note: Camera-based barcode scanning requires HTTPS and user permission.  
> For best results, open the app on a mobile device.


DeliverLog is a web-based delivery operations application designed to streamline barcode scanning, package tracking, and delivery status management for last-mile delivery teams.

The application enables delivery associates to scan packages using a mobile camera or manual entry, automatically track delivery attempts, assign final delivery statuses, capture driver confirmation with signature, and generate downloadable daily reports.

---

## 🚀 Features

- 📷 **Camera-based Barcode Scanning** (QR & 1D barcodes)
- ⌨️ **Manual Package ID Entry** (fallback option)
- 🔁 **Duplicate Scan Prevention**
- 📦 **Automatic ATTEMPT status** for all scanned packages
- ✅ **Delivery Status Assignment**
  - Delivered  
  - Attempt  
  - Rejected
- 🏬 **Store-wise Package Tracking**
- 👤 **Delivery Associate Identification**
- ✍️ **Digital Signature Capture**
- 📄 **Daily Summary & PDF Report Download**
- 📱 **Mobile-friendly UI** optimized for field use
- ⚠️ **Confirmation prompts** to prevent accidental submission

---

## 🧠 Workflow Overview

1. Select Store & Delivery Associate  
2. Scan packages using camera or manual input  
3. All packages default to **ATTEMPT** status  
4. Assign final delivery status  
5. Capture driver signature  
6. Generate and download daily delivery report  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- CSS (Responsive, mobile-first)
- ZXing (`@zxing/browser`) for barcode scanning

### Backend (optional / extendable)
- Node.js
- Express
- MongoDB

### Tools & Deployment
- Git & GitHub
- Netlify (Frontend Hosting)

---

## 📂 Project Structure
delivery-app/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ └── Css/
│ └── public/
│ └── product.wav
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
├── README.md
├── package.json
└── .gitignore

---

## ⚙️ Installation & Setup

### 1 Clone the repository
```bash
git clone https://github.com/mithun0773/DeliverLog.git
cd DeliverLog

### 2 Install frontend dependencies
cd frontend
npm install

### 3 Run
npm run dev
