const generateTasteVector = (tasteProfile) => {
  return [
    tasteProfile.sweet,
    tasteProfile.spicy,
    tasteProfile.bitter,
    tasteProfile.sour,
    tasteProfile.umami
  ];
};

module.exports = { generateTasteVector };
