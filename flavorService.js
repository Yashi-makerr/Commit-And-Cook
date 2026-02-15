const axios = require("axios");
const FlavorCompound = require("../models/FlavorCompound");

const fetchFlavorCompounds = async (ingredient) => {
  const cached = await FlavorCompound.findOne({ ingredient });
  if (cached) return cached.compounds;

  try {
    const response = await axios.get(
      `https://real-flavordb-api/ingredient/${ingredient}`
    );

    const compounds = response.data.compounds;

    await FlavorCompound.create({ ingredient, compounds });

    return compounds;

  } catch {
    return [];
  }
};

module.exports = { fetchFlavorCompounds };
