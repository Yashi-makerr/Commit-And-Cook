import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("report", file);

    try {
      await axios.post("/auth/upload-report", formData);
      setStatus("Upload Successful ✔ Health Profile Updated");
    } catch (err) {
      setStatus("Upload Failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="upload-page">

        <div className="upload-card">

          <h1>📄 Upload Medical Report</h1>
          <p className="upload-subtitle">
            Upload your PDF report to enable intelligent health-based filtering.
          </p>

          <label className="upload-box">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <span>
              {file ? file.name : "Drag & Drop or Click to Upload PDF"}
            </span>
          </label>

          <button className="upload-btn" onClick={handleUpload}>
            Upload & Analyze
          </button>

          {status && <div className="upload-status">{status}</div>}

        </div>

      </div>
    </>
  );
}
