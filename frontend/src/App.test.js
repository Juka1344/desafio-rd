import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    preferences: ['Automação de marketing', 'Integração com chatbots'],
    features: ['Chat ao vivo', 'Análise de dados'],
    products: [
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
        preferences: ['Automação de marketing'],
        features: ['Chat ao vivo'],
      },
    ],
  }),
}));

jest.mock('./hooks/useForm', () => ({
  __esModule: true,
  default: () => ({
    formData: {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    },
    handleChange: jest.fn(),
  }),
}));

jest.mock('./hooks/useRecommendations', () => ({
  __esModule: true,
  default: () => ({
    getRecommendations: jest.fn(() => []),
  }),
}));

describe('App Component', () => {
  test('renderiza o título principal', () => {
    render(<App />);
    const title = screen.getByRole('heading', {
      name: /recomendador de produtos/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('renderiza seção de introdução', () => {
    render(<App />);
    const introText = screen.getByText(
      /bem-vindo ao recomendador de produtos rd station/i
    );
    expect(introText).toBeInTheDocument();
  });

  test('renderiza seção de recomendações', () => {
    render(<App />);
    const recommendationSection = screen.getByRole('heading', {
      name: /suas recomendações/i,
    });
    expect(recommendationSection).toBeInTheDocument();
  });

  test('renderiza formulário de configuração', () => {
    render(<App />);
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  test('exibe estado inicial sem recomendações', () => {
    render(<App />);
    const noRecommendations = screen.getByText(/nenhuma recomendação ainda/i);
    expect(noRecommendations).toBeInTheDocument();
  });
});
