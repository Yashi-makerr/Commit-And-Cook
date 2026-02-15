const calculateHybridScore = ({
  tasteScore,
  molecularScore,
  healthScore
}) => {
  return (
    tasteScore * 0.4 +
    molecularScore * 0.35 +
    healthScore * 0.25
  );
};

module.exports = { calculateHybridScore };
