const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 Generate Token
const generateToken = (id) => {
    console.log("JWT SECRET:", process.env.JWT_SECRET);

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};


// 🟢 REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔵 LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟡 GET PROFILE (Protected)
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};
// 🟣 UPDATE TASTE PROFILE
const updateTasteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 If tasteProfile does not exist, create it
    if (!user.tasteProfile) {
      user.tasteProfile = {};
    }

    const { sweet, spicy, bitter, sour, umami, cuisinePreference } = req.body;

    user.tasteProfile.sweet = sweet ?? user.tasteProfile.sweet;
    user.tasteProfile.spicy = spicy ?? user.tasteProfile.spicy;
    user.tasteProfile.bitter = bitter ?? user.tasteProfile.bitter;
    user.tasteProfile.sour = sour ?? user.tasteProfile.sour;
    user.tasteProfile.umami = umami ?? user.tasteProfile.umami;

    if (cuisinePreference) {
      user.cuisinePreference = cuisinePreference;
    }

    await user.save();

    res.json({
      message: "Taste profile updated",
      tasteProfile: user.tasteProfile,
      cuisinePreference: user.cuisinePreference
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// SAVE RECIPE
const saveRecipe = async (req, res) => {
  const { recipeId, title, image } = req.body;

  const user = await User.findById(req.user.id);

  const alreadySaved = user.savedRecipes.find(
    r => r.recipeId === recipeId
  );

  if (alreadySaved) {
    return res.status(400).json({ message: "Recipe already saved" });
  }

  user.savedRecipes.push({ recipeId, title, image });

  await user.save();

  res.json({ message: "Recipe saved successfully" });
};


// GET SAVED RECIPES
const getSavedRecipes = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json(user.savedRecipes);
};


// REMOVE SAVED RECIPE
const removeSavedRecipe = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.savedRecipes = user.savedRecipes.filter(
    r => r.recipeId !== req.params.id
  );

  await user.save();

  res.json({ message: "Recipe removed" });
};




module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateTasteProfile,   // ✅ ADD THIS
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe
};

