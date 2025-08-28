import React, { useState, useCallback } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommendationsUpdate = useCallback((newRecommendations) => {
    setRecommendations(newRecommendations);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Recomendador de Produtos
          </h1>
          <p className="text-blue-100 text-center mt-2 text-lg">
            RD Station - Encontre a solução perfeita para seu negócio
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Descubra as melhores soluções para seu negócio
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Bem-vindo ao Recomendador de Produtos RD Station. Aqui você
              encontra uma variedade de produtos projetados para atender às
              necessidades específicas do seu negócio. De CRM a Marketing, de
              Conversas a Inteligência Artificial, temos uma solução para ajudar
              você a alcançar seus objetivos.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Suas recomendações
          </h3>
          <RecommendationList recommendations={recommendations} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Configure suas preferências
          </h3>
          <Form onRecommendationsUpdate={handleRecommendationsUpdate} />
        </div>
      </main>
    </div>
  );
}

export default App;
