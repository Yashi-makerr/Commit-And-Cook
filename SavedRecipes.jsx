import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const { data } = await axios.get("/auth/saved");
      setRecipes(data);
    };
    fetchSaved();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Saved Recipes</h2>
      {recipes.map((r, i) => (
        <div key={i}>
          <h3>{r.title}</h3>
          {r.image && <img src={r.image} width="120" />}
        </div>
      ))}
    </div>
  );
}
