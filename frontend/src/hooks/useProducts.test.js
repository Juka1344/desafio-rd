import { renderHook, waitFor } from '@testing-library/react';
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
        'Relatórios avançados de desempenho',
      ],
      features: [
        'Gestão de leads e oportunidades',
        'Automação de fluxos de trabalho',
        'Rastreamento de interações',
      ],
    },
    {
      id: 2,
      name: 'RD Station Marketing',
      category: 'Marketing',
      preferences: [
        'Automação de marketing',
        'Testes A/B para otimização',
        'Segmentação avançada',
      ],
      features: [
        'Criação e gestão de campanhas',
        'Rastreamento de comportamento',
        'Análise de ROI',
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    Math.random.mockRestore();
  });

  test('inicializa com arrays vazios', () => {
    getProducts.mockResolvedValue([]);

    const { result } = renderHook(() => useProducts());

    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
    expect(result.current.products).toEqual([]);
  });

  test('carrega produtos e extrai preferências e features', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.preferences).toHaveLength(4);
      expect(result.current.features).toHaveLength(4);
    });
  });

  test('chama serviço de produtos na montagem', async () => {
    getProducts.mockResolvedValue(mockProducts);

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  });

  test('lida com erro na busca de produtos', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    getProducts.mockRejectedValue(new Error('Erro na API'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        expect.any(Error)
      );
    });

    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
    expect(result.current.products).toEqual([]);

    consoleError.mockRestore();
  });

  test('extrai exatamente 2 preferências por produto', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
      expect(result.current.preferences).toHaveLength(4);
      expect(result.current.features).toHaveLength(4);
    });
  });

  test('randomiza seleção de preferências e features', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(2);
      expect(result.current.preferences.length).toBeGreaterThan(0);
      expect(result.current.features.length).toBeGreaterThan(0);
    });
  });

  test('não executa fetch novamente em re-renders', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { rerender } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  test('lida com produtos sem preferências ou features', async () => {
    const productsWithoutData = [
      {
        id: 1,
        name: 'Produto Vazio',
        category: 'Test',
        preferences: [],
        features: [],
      },
    ];

    getProducts.mockResolvedValue(productsWithoutData);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(productsWithoutData);
    });

    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
  });

  test('lida com produtos que têm menos de 2 preferências/features', async () => {
    const productsWithLimitedData = [
      {
        id: 1,
        name: 'Produto Limitado',
        category: 'Test',
        preferences: ['Única preferência'],
        features: ['Única feature'],
      },
    ];

    getProducts.mockResolvedValue(productsWithLimitedData);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(productsWithLimitedData);
    });

    expect(result.current.preferences).toEqual(['Única preferência']);
    expect(result.current.features).toEqual(['Única feature']);
  });

  test('retorna diferentes conjuntos com diferentes sementes de random', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { result: result1 } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result1.current.products).toHaveLength(2);
    });

    const firstPreferences = result1.current.preferences;

    Math.random.mockReturnValue(0.1);

    const { result: result2 } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result2.current.products).toHaveLength(2);
      expect(result2.current.preferences).toBeDefined();
      expect(result2.current.features).toBeDefined();
    });
  });
});
