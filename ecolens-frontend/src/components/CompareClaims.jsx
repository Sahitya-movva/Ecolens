import { useState } from "react";
import QRScanner from "./QRScanner";
import CircularScore from "./CircularScore";


function CompareClaims() {
  const [claimA, setClaimA] = useState("");
  const [claimB, setClaimB] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showQRFor, setShowQRFor] = useState(null);
  const [error, setError] = useState("");

  const compare = async () => {
    if (!claimA.trim() || !claimB.trim()) {
      setError("Please provide both claims to compare.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/compare-claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimA, claimB })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Comparison failed. Please try again.");
    }

    setLoading(false);
  };

  const handleQRScan = (qrValue) => {
    if (showQRFor === "A") setClaimA(qrValue);
    if (showQRFor === "B") setClaimB(qrValue);
    setShowQRFor(null);
  };

  return (
    <div className="card">
      <h3>Compare Sustainability Claims</h3>

      {/* Claim A */}
      <div style={{ marginBottom: "14px" }}>
        <textarea
          placeholder="Enter Claim A"
          value={claimA}
          onChange={(e) => setClaimA(e.target.value)}
        />
        <button
          className="secondary-btn"
          onClick={() => setShowQRFor("A")}
        >
          Scan QR for Claim A
        </button>
      </div>

      {/* Claim B */}
      <div style={{ marginBottom: "14px" }}>
        <textarea
          placeholder="Enter Claim B"
          value={claimB}
          onChange={(e) => setClaimB(e.target.value)}
        />
        <button
          className="secondary-btn"
          onClick={() => setShowQRFor("B")}
        >
          Scan QR for Claim B
        </button>
      </div>

      <button
        className="primary-btn"
        onClick={compare}
        disabled={loading}
      >
        {loading ? "Comparing..." : "Compare Claims"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showQRFor && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowQRFor(null)}
        />
      )}

      {result && (
  <div style={{ marginTop: "20px" }}>
    <p><b>Verdict:</b> {result.verdict}</p>

    <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
      <CircularScore
        value={result.claimA.credibility}
        label="Claim A Credibility"
      />
      <CircularScore
        value={result.claimB.credibility}
        label="Claim B Credibility"
      />
    </div>
  </div>
)}

    </div>
  );
}

export default CompareClaims;
