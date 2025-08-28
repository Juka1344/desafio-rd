// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Suas Preferências
      </h2>
      <div className="space-y-2">
        {preferences.map((preference, index) => (
          <Checkbox
            key={index}
            value={preference}
            checked={currentPreferences.includes(preference)}
            onChange={() => handlePreferenceChange(preference)}
          >
            {preference}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
