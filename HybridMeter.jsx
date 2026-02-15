import { useEffect, useState } from "react";

export default function HybridMeter({ score }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= score) {
        clearInterval(interval);
      }
      setDisplayScore(start);
    }, 15);
  }, [score]);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `conic-gradient(#8b5cf6 ${displayScore * 3.6}deg, #1e293b 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: "bold" }}>
          {displayScore}
        </div>
      </div>
      <p>Hybrid Optimization Score</p>
    </div>
  );
}
