import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';

const mockHandleChange = jest.fn();
const mockGetRecommendations = jest.fn();
const mockOnRecommendationsUpdate = jest.fn();

jest.mock('../../hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    preferences: ['Automação de marketing', 'Integração com chatbots'],
    features: ['Chat ao vivo e mensagens automatizadas', 'Gestão de leads'],
    products: [
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
        preferences: ['Automação de marketing'],
        features: ['Gestão de leads'],
      },
    ],
  }),
}));

jest.mock('../../hooks/useForm', () => ({
  __esModule: true,
  default: () => ({
    formData: {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    },
    handleChange: mockHandleChange,
  }),
}));

jest.mock('../../hooks/useRecommendations', () => ({
  __esModule: true,
  default: () => ({
    getRecommendations: mockGetRecommendations,
  }),
}));

describe('Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRecommendations.mockReturnValue([
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
      },
    ]);
  });

  test('renderiza todos os campos do formulário', () => {
    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);
    expect(screen.getByText('Suas Preferências')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades Desejadas')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Recomendação')).toBeInTheDocument();
  });

  test('renderiza checkboxes de preferências', () => {
    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);
    expect(screen.getByLabelText('Automação de marketing')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Integração com chatbots')
    ).toBeInTheDocument();
  });

  test('renderiza checkboxes de funcionalidades', () => {
    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);
    expect(
      screen.getByLabelText('Chat ao vivo e mensagens automatizadas')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Gestão de leads')).toBeInTheDocument();
  });

  test('renderiza radio buttons para tipo de recomendação', () => {
    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);
    expect(screen.getByLabelText(/produto único/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/múltiplos produtos/i)).toBeInTheDocument();
  });

  test('renderiza botão de submit', () => {
    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);
    const submitButton = screen.getByRole('button', {
      name: /obter recomendação/i,
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  test('chama onRecommendationsUpdate ao submeter formulário', async () => {
    render(<Form onRecommendationsUpdate={mockOnRecommendationsUpdate} />);
    const form = document.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockGetRecommendations).toHaveBeenCalledWith({
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: 'SingleProduct',
      });
      expect(mockOnRecommendationsUpdate).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'RD Station CRM',
          category: 'Vendas',
        },
      ]);
    });
  });

  test('não chama onRecommendationsUpdate se callback não fornecido', async () => {
    render(<Form />);
    const form = document.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockGetRecommendations).toHaveBeenCalled();
      expect(mockOnRecommendationsUpdate).not.toHaveBeenCalled();
    });
  });
});
