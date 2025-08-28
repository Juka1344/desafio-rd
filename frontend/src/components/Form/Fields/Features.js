import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Funcionalidades Desejadas
      </h2>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <Checkbox
            key={index}
            value={feature}
            checked={currentFeatures.includes(feature)}
            onChange={() => handleFeatureChange(feature)}
          >
            {feature}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Features;
