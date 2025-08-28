import React, { useState } from 'react';

function RecommendationType({ onRecommendationTypeChange }) {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onRecommendationTypeChange(type);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Tipo de Recomendação
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedType === 'SingleProduct'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <input
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            checked={selectedType === 'SingleProduct'}
            onChange={() => handleTypeChange('SingleProduct')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <div className="ml-3">
            <div className="font-medium text-gray-800">Produto Único</div>
            <div className="text-sm text-gray-600">
              Receba apenas a melhor recomendação
            </div>
          </div>
        </label>

        <label
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedType === 'MultipleProducts'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <input
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            checked={selectedType === 'MultipleProducts'}
            onChange={() => handleTypeChange('MultipleProducts')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <div className="ml-3">
            <div className="font-medium text-gray-800">Múltiplos Produtos</div>
            <div className="text-sm text-gray-600">
              Veja todas as opções compatíveis
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;
