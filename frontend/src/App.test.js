import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
  test('renderiza o título principal corretamente', () => {
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

  test('renderiza seção de recomendações acima da configuração', () => {
    render(<App />);

    const recommendationSection = screen.getByRole('heading', {
      name: /suas recomendações/i,
    });
    const configSection = screen.getByRole('heading', {
      name: /configure suas preferências/i,
    });

    expect(recommendationSection).toBeInTheDocument();
    expect(configSection).toBeInTheDocument();

    const sections = screen.getAllByRole('heading', { level: 3 });
    const recommendationIndex = sections.findIndex((h) =>
      h.textContent.includes('recomendações')
    );
    const configIndex = sections.findIndex((h) =>
      h.textContent.includes('Configure')
    );

    expect(recommendationIndex).toBeLessThan(configIndex);
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

  test('aplica classes CSS responsivas corretamente', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('container', 'mx-auto', 'px-4', 'py-12');
  });

  test('renderiza header com gradiente', () => {
    render(<App />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(
      'bg-gradient-to-r',
      'from-blue-600',
      'to-indigo-700'
    );
  });
});
