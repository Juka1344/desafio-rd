import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationList from './RecommendationList';

const mockRecommendations = [
  {
    id: 1,
    name: 'RD Station CRM',
    category: 'Vendas',
    preferences: ['Integração fácil com ferramentas de e-mail'],
    features: ['Gestão de leads e oportunidades'],
  },
  {
    id: 2,
    name: 'RD Station Marketing',
    category: 'Marketing',
    preferences: ['Automação de marketing'],
    features: ['Criação e gestão de campanhas'],
  },
];

describe('RecommendationList Component', () => {
  test('exibe estado vazio quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(screen.getByText('Nenhuma recomendação ainda')).toBeInTheDocument();
    expect(
      screen.getByText(/preencha o formulário abaixo/i)
    ).toBeInTheDocument();
  });

  test('renderiza lista de recomendações quando fornecidas', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
  });

  test('exibe contador correto de produtos', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('2 produtos recomendados')).toBeInTheDocument();
  });

  test('exibe contador no singular para um produto', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    expect(screen.getByText('1 produto recomendado')).toBeInTheDocument();
  });

  test('renderiza preferências e funcionalidades', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    expect(screen.getByText('Preferências atendidas:')).toBeInTheDocument();
    expect(screen.getByText('Principais funcionalidades:')).toBeInTheDocument();
    expect(
      screen.getByText('Integração fácil com ferramentas de e-mail')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Gestão de leads e oportunidades')
    ).toBeInTheDocument();
  });

  test('não renderiza seções vazias', () => {
    const productWithoutData = {
      ...mockRecommendations[0],
      preferences: [],
      features: [],
    };

    render(<RecommendationList recommendations={[productWithoutData]} />);

    expect(
      screen.queryByText('Preferências atendidas:')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Principais funcionalidades:')
    ).not.toBeInTheDocument();
  });

  test('aplica estilos básicos de categoria', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    const categoryBadge = screen.getByText('Vendas');
    expect(categoryBadge).toBeInTheDocument();

    const productCard = screen.getByText('RD Station CRM').closest('div');
    expect(productCard).toBeInTheDocument();
  });
});
