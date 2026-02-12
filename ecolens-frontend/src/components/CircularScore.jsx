import { useEffect, useState } from "react";

function CircularScore({ value, label }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      setProgress(start);
      if (start >= value) clearInterval(interval);
    }, 15); // speed of animation

    return () => clearInterval(interval);
  }, [value]);

  const strokeDasharray = 283;
  const strokeDashoffset =
    strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke="#16a34a"
          strokeWidth="10"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="6"
          fontSize="18"
          fontWeight="bold"
          fill="#064e3b"
        >
          {progress}%
        </text>
      </svg>
      <p style={{ marginTop: "6px", fontWeight: "600" }}>{label}</p>
    </div>
  );
}

export default CircularScore;
