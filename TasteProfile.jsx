import { useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function TasteProfile() {
  const { user, loadUser } = useContext(AuthContext);

  const [taste, setTaste] = useState({
    sweet: 5,
    spicy: 5,
    bitter: 5,
    sour: 5,
    umami: 5,
  });

  // Load user taste when component mounts
  useEffect(() => {
    if (user?.tasteProfile) {
      setTaste(user.tasteProfile);
    }
  }, [user]);

  const updateTaste = async () => {
    try {
      await axios.put("/auth/taste", taste);

      await loadUser(); // refresh user data
      alert("Taste profile updated!");
    } catch (err) {
      console.log(err);
      alert("Failed to update taste profile");
    }
  };

  const renderSlider = (label, value) => (
    <div className="slider-group" key={label}>
      <div className="slider-label">
        <span>{label}</span>
        <span className="value-badge">{value}</span>
      </div>

      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) =>
          setTaste({
            ...taste,
            [label.toLowerCase()]: Number(e.target.value),
          })
        }
      />
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="taste-page">
        <div className="taste-card">
          <h1>🌶 Personal Taste Intelligence</h1>
          <p className="taste-subtitle">
            Adjust your flavor spectrum to refine AI recommendations.
          </p>

          {renderSlider("Sweet", taste.sweet)}
          {renderSlider("Spicy", taste.spicy)}
          {renderSlider("Bitter", taste.bitter)}
          {renderSlider("Sour", taste.sour)}
          {renderSlider("Umami", taste.umami)}

          <button
            className="save-profile-btn"
            onClick={updateTaste}
          >
            Save Taste Profile
          </button>
        </div>
      </div>
    </>
  );
}
