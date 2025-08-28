// recommendation.service.js

/**
 * Calcula score de compatibilidade entre preferências/features selecionadas e produto
 * Usado porque precisamos quantificar o quanto cada produto atende aos critérios do usuário
 */
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

/**
 * Ordena produtos por score de compatibilidade
 * Usado porque em caso de empate, devemos retornar o último produto que atende aos critérios
 */
const sortProductsByScore = (products, scores) => {
  return products
    .map((product, index) => ({
      product,
      score: scores[index],
      originalIndex: index,
    }))
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score; // Score maior primeiro
      }
      // Em caso de empate, mantém a ordem original (último produto com mesmo score fica depois)
      return a.originalIndex - b.originalIndex;
    });
};

/**
 * Filtra produtos que atendem aos critérios mínimos
 * Usado porque só devemos recomendar produtos que tenham alguma compatibilidade
 */
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

  // Valida se há produtos disponíveis
  if (!products.length) {
    return [];
  }

  // Calcula scores de compatibilidade para cada produto
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

  // Ordena produtos por score (com tratamento de empate)
  const sortedProducts = sortProductsByScore(products, productScores);

  // Filtra apenas produtos elegíveis (com score > 0)
  const eligibleProducts = filterEligibleProducts(sortedProducts);

  // Se não há produtos elegíveis, retorna array vazio
  if (!eligibleProducts.length) {
    return [];
  }

  // Retorna baseado no tipo de recomendação
  if (selectedRecommendationType === 'SingleProduct') {
    // Retorna apenas o produto com maior score (ou último em caso de empate)
    return [eligibleProducts[0].product];
  } else if (selectedRecommendationType === 'MultipleProducts') {
    // Retorna todos os produtos elegíveis ordenados por score
    return eligibleProducts.map(({ product }) => product);
  }

  // Se tipo não foi especificado, retorna array vazio
  return [];
};

export default { getRecommendations };
