import React from 'react';

function RecommendationList({ recommendations }) {
  const getCategoryStyle = (category) => {
    const styles = {
      Vendas: {
        bg: 'bg-white',
        border: 'border-[#003D5C]',
        text: 'text-black',
      },
      Marketing: {
        bg: 'bg-white',
        border: 'border-[#003D5C]',
        text: 'text-black',
      },
      Omnichannel: {
        bg: 'bg-white',
        border: 'border-[#003D5C]',
        text: 'text-black',
      },
      'Uso de Inteligência Artificial': {
        bg: 'bg-white',
        border: 'border-[#003D5C]',
        text: 'text-black',
      },
    };
    return (
      styles[category] || {
        bg: 'bg-white',
        border: 'border-gray-200',
        text: 'text-black',
      }
    );
  };

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">?</span>
        </div>
        <h3 className="text-lg font-medium text-black mb-2">
          Nenhuma recomendação ainda
        </h3>
        <p className="text-gray-500">
          Preencha o formulário abaixo para receber recomendações personalizadas
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          {recommendations.length}{' '}
          {recommendations.length === 1
            ? 'produto recomendado'
            : 'produtos recomendados'}
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => {
          const categoryStyle = getCategoryStyle(recommendation.category);

          return (
            <div
              key={index}
              className={`rounded-xl border-2 ${categoryStyle.border} ${categoryStyle.bg} p-6 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1`}
            >
              <div className="mb-4">
                <h3 className="font-bold text-lg text-black mb-2">
                  {recommendation.name}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.text} ${categoryStyle.bg} border ${categoryStyle.border}`}
                >
                  {recommendation.category}
                </span>
              </div>

              {recommendation.preferences &&
                recommendation.preferences.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Preferências atendidas:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.preferences.map((preference, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white rounded-lg text-sm text-gray-600 border border-gray-200 shadow-sm"
                        >
                          {preference}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {recommendation.features &&
                recommendation.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Principais funcionalidades:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white rounded-lg text-sm text-gray-600 border border-gray-200 shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendationList;
