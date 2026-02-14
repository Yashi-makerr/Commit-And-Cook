import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

export default function Recommendations() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/recipes/recommend");
        setRecipes(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="recommend-page">
        <div className="recommend-hero">
          <h1>✨ AI-Optimized Recipes</h1>
          <p>
            Personalized recommendations generated using hybrid taste,
            molecular matching & health intelligence.
          </p>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Loading recipes...</p>}

        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

        {!loading && recipes.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No recommendations found. Try updating your taste profile.
          </p>
        )}

        <div className="recommend-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
