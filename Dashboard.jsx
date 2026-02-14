import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import TasteRadar from "../components/TasteRadar";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [topRecipe, setTopRecipe] = useState(null);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const { data } = await axios.get("/recipes/recommend");
        if (data && data.length > 0) {
          setTopRecipe(data[0]);
        }
      } catch (err) {
        console.log("Recommendation fetch failed");
      }
    };

    fetchTop();
  }, []);

  if (!user) return null;

  const healthScore = user.healthScore || 100;

  return (
    <>
      <Navbar />

      <div className="dashboard-wrapper">
        
        <div className="glass-card">
          <h2 className="section-title">🩺 Health Intelligence</h2>
          <div className="health-score">{healthScore}</div>
          <div className="status-item">
            Diabetes: {user.healthProfile?.diabetes ? "Yes" : "No"}
          </div>
          <div className="status-item">
            Hypertension: {user.healthProfile?.hypertension ? "Yes" : "No"}
          </div>
          <div className="status-item">
            Cholesterol: {user.healthProfile?.cholesterol}
          </div>
        </div>

        <div className="glass-card">
          <h2 className="section-title">🔬 System Status</h2>
          <div className="status-item">Prescription Parsing ✓</div>
          <div className="status-item">Safety Filtering ✓</div>
          <div className="status-item">Flavor Matching ✓</div>
          <div className="status-item">Hybrid Engine ✓</div>
        </div>

        <div className="glass-card radar-wrapper">
          <TasteRadar tasteProfile={user.tasteProfile} />
        </div>

        {topRecipe && (
          <div className="glass-card">
            <h2 className="section-title">🍽 Top Recommendation</h2>
            <h3>{topRecipe.title}</h3>
            <div className="score-badge">
              Hybrid Score {topRecipe.hybridScore}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
