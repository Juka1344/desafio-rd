import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationList from './RecommendationList';

const mockRecommendations = [
  {
    id: 1,
    name: 'RD Station CRM',
    category: 'Vendas',
    preferences: [
      'Integração fácil com ferramentas de e-mail',
      'Personalização de funis de vendas',
    ],
    features: [
      'Gestão de leads e oportunidades',
      'Rastreamento de interações com clientes',
    ],
  },
  {
    id: 2,
    name: 'RD Station Marketing',
    category: 'Marketing',
    preferences: ['Automação de marketing', 'Testes A/B para otimização'],
    features: ['Criação e gestão de campanhas', 'Análise de ROI de campanhas'],
  },
  {
    id: 3,
    name: 'RD Conversas',
    category: 'Omnichannel',
    preferences: ['Integração com chatbots'],
    features: ['Chat ao vivo e mensagens automatizadas'],
  },
  {
    id: 4,
    name: 'RD Mentor AI',
    category: 'Uso de Inteligência Artificial',
    preferences: ['Análise preditiva de dados'],
    features: ['Análise de dados para insights estratégicos'],
  },
];

describe('RecommendationList Component', () => {
  test('exibe estado vazio quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(screen.getByText('Nenhuma recomendação ainda')).toBeInTheDocument();
    expect(
      screen.getByText(/preencha o formulário abaixo/i)
    ).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  test('renderiza lista de recomendações quando fornecidas', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    expect(screen.getByText('RD Conversas')).toBeInTheDocument();
    expect(screen.getByText('RD Mentor AI')).toBeInTheDocument();
  });

  test('exibe contador correto de produtos', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('4 produtos recomendados')).toBeInTheDocument();
  });

  test('exibe contador no singular para um produto', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    expect(screen.getByText('1 produto recomendado')).toBeInTheDocument();
  });

  test('aplica cores corretas por categoria', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    const vendasBadge = screen.getByText('Vendas');
    expect(vendasBadge).toHaveClass(
      'text-blue-700',
      'bg-blue-50',
      'border-blue-200'
    );
  });

  test('renderiza preferências de cada produto', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    expect(screen.getByText('Preferências atendidas:')).toBeInTheDocument();
    expect(
      screen.getByText('Integração fácil com ferramentas de e-mail')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Personalização de funis de vendas')
    ).toBeInTheDocument();
  });

  test('renderiza funcionalidades de cada produto', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    expect(screen.getByText('Principais funcionalidades:')).toBeInTheDocument();
    expect(
      screen.getByText('Gestão de leads e oportunidades')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Rastreamento de interações com clientes')
    ).toBeInTheDocument();
  });

  test('não renderiza seção de preferências se vazia', () => {
    const productWithoutPreferences = {
      ...mockRecommendations[0],
      preferences: [],
    };

    render(
      <RecommendationList recommendations={[productWithoutPreferences]} />
    );

    expect(
      screen.queryByText('Preferências atendidas:')
    ).not.toBeInTheDocument();
  });

  test('não renderiza seção de funcionalidades se vazia', () => {
    const productWithoutFeatures = {
      ...mockRecommendations[0],
      features: [],
    };

    render(<RecommendationList recommendations={[productWithoutFeatures]} />);

    expect(
      screen.queryByText('Principais funcionalidades:')
    ).not.toBeInTheDocument();
  });

  test('aplica estilos de hover e transições', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    // Procura pelo card do produto que contém as classes de hover
    const productCard = screen
      .getByText('RD Station CRM')
      .closest('div[class*="hover:shadow-md"]');
    expect(productCard).toHaveClass(
      'hover:shadow-md',
      'transition-all',
      'duration-200',
      'transform',
      'hover:-translate-y-1'
    );
  });

  test('testa todas as categorias de produtos', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);

    // Vendas - azul
    const vendasBadge = screen.getByText('Vendas');
    expect(vendasBadge).toHaveClass('text-blue-700');

    // Marketing - verde
    const marketingBadge = screen.getByText('Marketing');
    expect(marketingBadge).toHaveClass('text-green-700');

    // Omnichannel - roxo
    const omnichannelBadge = screen.getByText('Omnichannel');
    expect(omnichannelBadge).toHaveClass('text-purple-700');

    // IA - laranja
    const iaBadge = screen.getByText('Uso de Inteligência Artificial');
    expect(iaBadge).toHaveClass('text-orange-700');
  });

  test('aplica categoria padrão para categoria desconhecida', () => {
    const unknownCategoryProduct = {
      ...mockRecommendations[0],
      category: 'Categoria Desconhecida',
    };

    render(<RecommendationList recommendations={[unknownCategoryProduct]} />);

    const badge = screen.getByText('Categoria Desconhecida');
    expect(badge).toHaveClass('text-gray-700');
  });
});
