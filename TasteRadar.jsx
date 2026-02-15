import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function TasteRadar({ tasteProfile }) {
  const data = {
    labels: ["Sweet", "Spicy", "Bitter", "Sour", "Umami"],
    datasets: [
      {
        data: [
          tasteProfile?.sweet || 5,
          tasteProfile?.spicy || 5,
          tasteProfile?.bitter || 5,
          tasteProfile?.sour || 5,
          tasteProfile?.umami || 5,
        ],
        backgroundColor: "rgba(139, 92, 246, 0.35)",
        borderColor: "#a78bfa",
        borderWidth: 2,
        pointBackgroundColor: "#c4b5fd",
        pointBorderColor: "#fff",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          display: false,   // remove ugly numbers
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
        angleLines: {
          color: "rgba(255,255,255,0.1)",
        },
        pointLabels: {
          color: "#e2e8f0",
          font: {
            size: 14,
            weight: "500",
          },
        },
        
      },
    },
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <Radar data={data} options={options} />
    </div>
  );
}
<p style={{ textAlign: "center", opacity: 0.7 }}>
  Flavor Vector Representation of User Preference
</p>

