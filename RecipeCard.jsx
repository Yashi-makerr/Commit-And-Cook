export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card-advanced">

      <div className="image-wrapper">
        <img
          src={
            recipe.image ||
            "https://images.unsplash.com/photo-1604908176997-431a4c84cbb9"
          }
          alt={recipe.title}
        />
        <div className="image-overlay" />
      </div>

      <div className="card-body">
        <h3>{recipe.title}</h3>

        <div className="score-badge">
          Hybrid Score {recipe.hybridScore}
        </div>

        <p>{recipe.explanation?.tasteMatch}</p>
        <p>{recipe.explanation?.healthCompliance}</p>

        <button className="save-btn">Save Recipe</button>
      </div>

    </div>
  );
}
