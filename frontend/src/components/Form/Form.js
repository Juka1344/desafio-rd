// Form.js

import React, { useEffect } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsUpdate }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecommendations = getRecommendations(formData);

    if (onRecommendationsUpdate) {
      onRecommendationsUpdate(newRecommendations);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Layout responsivo para preferências e features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Preferences
          preferences={preferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
        />
        <Features
          features={features}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
        />
      </div>

      {/* Tipo de recomendação */}
      <div>
        <RecommendationType
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
        />
      </div>

      {/* Botão como footer ocupando toda largura */}
      <div className="pt-4 border-t border-gray-200">
        <SubmitButton text="Obter recomendação" />
      </div>
    </form>
  );
}

export default Form;
