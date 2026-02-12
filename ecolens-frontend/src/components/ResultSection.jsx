import CircularScore from "./CircularScore";

function ResultSection({ data }) {

  // 🔹 Share Report
  const handleShare = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/share-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: data })
    });

    const res = await response.json();
    navigator.clipboard.writeText(res.share_url);
    alert("Share link copied to clipboard!");
  } catch (err) {
    alert("Unable to generate share link.");
  }
};


  // 🔹 Download PDF Report
  const handleDownload = async () => {
  const response = await fetch("http://127.0.0.1:8000/download-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ result: data })
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "EcoLens_Report.pdf";
  a.click();
};


  return (
    <div className="results-grid">

      {/* Risk */}
      <div className="result-card risk">
        <h4>⚠️ Greenwashing Risk</h4>
        <p>{data.risk}</p>
      </div>

      {/* Why Flagged */}
      <div className="result-card">
        <h4>🧐 Why This Claim Was Flagged</h4>
        <ul>
          {data.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      {/* Type */}
      <div className="result-card">
        <h4>🧪 Greenwashing Type</h4>
        <p>{data.type}</p>
      </div>

      {/* Scores */}
      <div className="result-card">
        <h4>📊 Impact Scores</h4>

        <p>Consumer Risk Level</p>
        <div className="bar red">
          <div style={{ width: `${data.consumerRisk}%` }}></div>
        </div>

        <p>Environmental Impact Confidence</p>
        <div className="bar green">
          <div style={{ width: `${data.envConfidence}%` }}></div>
        </div>

        <div className="result-card">
            <h4>✅ Credibility Score</h4>
            <CircularScore
            value={data.credibility}
            label="Credibility Level"
        />
        </div>

      </div>

      {/* Alternatives */}
      <div className="result-card">
        <h4>🌱 Eco-Friendly Alternatives</h4>
        <ul>
          {data.alternatives.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Waste */}
      <div className="result-card">
        <h4>♻️ Waste Awareness & Disposal</h4>
        <ul>
          {data.waste.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div
        className="result-card"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button onClick={handleShare}>Share Report</button>
        <button onClick={handleDownload}>Download PDF</button>
      </div>

    </div>
  );
}

export default ResultSection;
