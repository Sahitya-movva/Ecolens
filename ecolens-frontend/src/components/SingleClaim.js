import { useState } from "react";
import ResultSection from "./ResultSection";
import QRScanner from "./QRScanner";

function SingleClaim() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [productURL, setProductURL] = useState("");


  // 🔹 TEXT ANALYSIS (Manual input)
  const analyze = async () => {
    if (!text.trim()) {
      setError("Please enter a sustainability claim.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim_text: text })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Unable to analyze claim. Please try again.");
    }

    setLoading(false);
  };

  // 🔹 QR ANALYSIS
  const handleQRScan = async (qrValue) => {
  setShowQR(false);
  setText(qrValue); // 👈 ADD THIS LINE
  setLoading(true);
  setResult(null);
  setError("");

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/analyze-qr/${qrValue}`
    );
    const data = await response.json();
    setResult(data);
  } catch (err) {
    setError("QR code could not be analyzed.");
  }

  setLoading(false);
  };
  // product url
  const analyzeProductURL = async () => {
  if (!productURL.trim()) {
    setError("Please enter a product URL.");
    return;
  }

  setError("");
  setLoading(true);
  setResult(null);

  try {
    const response = await fetch("http://127.0.0.1:8000/analyze-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: productURL })
    });

    const data = await response.json();
    setResult(data);
  } catch {
    setError("Unable to analyze product URL.");
  }

  setLoading(false);
};



  return (
    <div className="card">

      {/* Section 1: Context */}
      <div className="intro-box">
        <h3>Analyze Environmental Claims</h3>
        <p>
          Enter a sustainability claim manually or scan a product QR code.
          EcoLens evaluates credibility, transparency, and greenwashing risk
          using AI-based natural language analysis.
        </p>
      </div>

      {/* Section 2: Manual Input */}
      <div className="input-box">
        <textarea
          placeholder="Paste product sustainability claim here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={analyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Claim"}
        </button>

        <p style={{ textAlign: "center", margin: "12px 0" }}>OR</p>

        <button
          className="secondary-btn"
          onClick={() => setShowQR(true)}
          disabled={loading}
        >
          Scan QR Code
        </button>
        <p style={{ textAlign: "center", margin: "14px 0" }}>OR</p>

<input
  type="text"
  placeholder="Paste product page URL (Amazon, Flipkart, etc.)"
  value={productURL}
  onChange={(e) => setProductURL(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px"
  }}
/>

<button
  className="primary-btn"
  onClick={analyzeProductURL}
  disabled={loading}
>
  Analyze Product URL
</button>

        

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>

      {/* Section 3: QR Scanner */}
      {showQR && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowQR(false)}
        />
      )}

      {/* Section 4: Loader */}
      {loading && <div className="loader"></div>}

      {/* Section 5: Results */}
      {result && !loading && <ResultSection data={result} />}

    </div>
  );
}

export default SingleClaim;
