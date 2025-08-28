import { renderHook, waitFor, act } from '@testing-library/react';
import useProducts from './useProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useProducts Hook', () => {
  const mockProducts = [
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
        'Automação de fluxos de trabalho',
      ],
    },
    {
      id: 2,
      name: 'RD Station Marketing',
      category: 'Marketing',
      preferences: ['Automação de marketing', 'Testes A/B para otimização'],
      features: [
        'Criação e gestão de campanhas',
        'Rastreamento de comportamento',
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getProducts.mockResolvedValue([]);
  });

  test('inicializa com arrays vazios', async () => {
    let result;
    await act(async () => {
      const hookResult = renderHook(() => useProducts());
      result = hookResult.result;
    });

    await waitFor(() => {
      expect(result.current.preferences).toEqual([]);
      expect(result.current.features).toEqual([]);
      expect(result.current.products).toEqual([]);
    });
  });

  test('carrega produtos e extrai preferências e features', async () => {
    getProducts.mockResolvedValue(mockProducts);

    let result;
    await act(async () => {
      const hookResult = renderHook(() => useProducts());
      result = hookResult.result;
    });

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.preferences.length).toBeGreaterThan(0);
      expect(result.current.features.length).toBeGreaterThan(0);
    });
  });

  test('chama serviço de produtos na montagem', async () => {
    getProducts.mockResolvedValue(mockProducts);

    await act(async () => {
      renderHook(() => useProducts());
    });

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  });

  test('lida com erro na busca de produtos', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    getProducts.mockRejectedValue(new Error('Erro na API'));

    let result;
    await act(async () => {
      const hookResult = renderHook(() => useProducts());
      result = hookResult.result;
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        expect.any(Error)
      );
    });

    await waitFor(() => {
      expect(result.current.preferences).toEqual([]);
      expect(result.current.features).toEqual([]);
      expect(result.current.products).toEqual([]);
    });

    consoleSpy.mockRestore();
  });

  test('extrai preferências e features dos produtos', async () => {
    getProducts.mockResolvedValue(mockProducts);

    let result;
    await act(async () => {
      const hookResult = renderHook(() => useProducts());
      result = hookResult.result;
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
      expect(result.current.preferences.length).toBeGreaterThan(0);
      expect(result.current.features.length).toBeGreaterThan(0);
    });
  });

  test('não executa fetch novamente em re-renders', async () => {
    getProducts.mockResolvedValue(mockProducts);

    let rerender;
    await act(async () => {
      const hookResult = renderHook(() => useProducts());
      rerender = hookResult.rerender;
    });

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      rerender();
    });

    expect(getProducts).toHaveBeenCalledTimes(1);
  });
});
