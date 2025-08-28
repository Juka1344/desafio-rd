import React, { useState } from 'react';

function RecommendationType({ onRecommendationTypeChange }) {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onRecommendationTypeChange(type);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-black mb-4">
        Tipo de Recomendação
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedType === 'SingleProduct'
              ? 'border-[#00D4FF] bg-white'
              : 'border-gray-300 hover:border[#00F2C9] hover:bg-white'
          }`}
        >
          <input
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            checked={selectedType === 'SingleProduct'}
            onChange={() => handleTypeChange('SingleProduct')}
            className="w-4 h-4 text-[#003D5C] bg-gray-100 border-gray-300"
          />
          <div className="ml-3">
            <div className="font-medium text-black">Produto Único</div>
            <div className="text-sm text-black">
              Receba apenas a melhor recomendação
            </div>
          </div>
        </label>

        <label
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedType === 'MultipleProducts'
              ? 'border-[#00D4FF] bg-white'
              : 'border-gray-300 hover:border[#00F2C9] hover:bg-white'
          }`}
        >
          <input
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            checked={selectedType === 'MultipleProducts'}
            onChange={() => handleTypeChange('MultipleProducts')}
            className="w-4 h-4 text-[#003D5C] bg-gray-100 border-gray-300"
          />
          <div className="ml-3">
            <div className="font-medium text-black">Múltiplos Produtos</div>
            <div className="text-sm text-black">
              Veja todas as opções compatíveis
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;
