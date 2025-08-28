// recommendation.service.js

const calculateCompatibilityScore = (selectedItems, productItems) => {
  if (!selectedItems.length) return 0;

  const matches = selectedItems.filter((item) =>
    productItems.some(
      (productItem) =>
        productItem.toLowerCase().includes(item.toLowerCase()) ||
        item.toLowerCase().includes(productItem.toLowerCase())
    )
  );

  return matches.length;
};

const sortProductsByScore = (products, scores) => {
  return products
    .map((product, index) => ({
      product,
      score: scores[index],
      originalIndex: index,
    }))
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      return a.originalIndex - b.originalIndex;
    });
};

const filterEligibleProducts = (sortedProducts) => {
  return sortedProducts.filter(({ score }) => score > 0);
};

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = '',
  } = formData;

  if (!products.length) {
    return [];
  }

  const productScores = products.map((product) => {
    const preferencesScore = calculateCompatibilityScore(
      selectedPreferences,
      product.preferences
    );
    const featuresScore = calculateCompatibilityScore(
      selectedFeatures,
      product.features
    );
    return preferencesScore + featuresScore;
  });

  const sortedProducts = sortProductsByScore(products, productScores);

  const eligibleProducts = filterEligibleProducts(sortedProducts);

  if (!eligibleProducts.length) {
    return [];
  }

  if (selectedRecommendationType === 'SingleProduct') {
    return [eligibleProducts[0].product];
  } else if (selectedRecommendationType === 'MultipleProducts') {
    return eligibleProducts.map(({ product }) => product);
  }

  return [];
};

export default { getRecommendations };
