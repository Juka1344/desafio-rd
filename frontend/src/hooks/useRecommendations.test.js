import { renderHook, act } from '@testing-library/react';
import useRecommendations from './useRecommendations';
import recommendationService from '../services/recommendation.service';

jest.mock('../services/recommendation.service', () => ({
  getRecommendations: jest.fn(),
}));

describe('useRecommendations Hook', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'RD Station CRM',
      category: 'Vendas',
      preferences: ['Automação de marketing'],
      features: ['Gestão de leads'],
    },
    {
      id: 2,
      name: 'RD Station Marketing',
      category: 'Marketing',
      preferences: ['Testes A/B'],
      features: ['Campanhas de e-mail'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('inicializa com array vazio de recomendações', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    expect(result.current.recommendations).toEqual([]);
    expect(typeof result.current.getRecommendations).toBe('function');
    expect(typeof result.current.setRecommendations).toBe('function');
  });

  test('getRecommendations chama o serviço com parâmetros corretos', () => {
    const mockFormData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Gestão de leads'],
      selectedRecommendationType: 'SingleProduct',
    };

    const mockResult = [mockProducts[0]];
    recommendationService.getRecommendations.mockReturnValue(mockResult);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const recommendations = result.current.getRecommendations(mockFormData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      mockFormData,
      mockProducts
    );
    expect(recommendations).toEqual(mockResult);
  });

  test('getRecommendations funciona sem produtos', () => {
    recommendationService.getRecommendations.mockReturnValue([]);

    const { result } = renderHook(() => useRecommendations([]));

    const formData = {
      selectedPreferences: ['test'],
      selectedFeatures: ['test'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = result.current.getRecommendations(formData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      []
    );
    expect(recommendations).toEqual([]);
  });

  test('setRecommendations atualiza estado corretamente', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    const newRecommendations = [mockProducts[0], mockProducts[1]];

    act(() => {
      result.current.setRecommendations(newRecommendations);
    });

    expect(result.current.recommendations).toEqual(newRecommendations);
  });

  test('getRecommendations retorna resultado do serviço para SingleProduct', () => {
    const mockFormData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Gestão de leads'],
      selectedRecommendationType: 'SingleProduct',
    };

    const expectedResult = [mockProducts[0]];
    recommendationService.getRecommendations.mockReturnValue(expectedResult);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const recommendations = result.current.getRecommendations(mockFormData);

    expect(recommendations).toEqual(expectedResult);
    expect(recommendations).toHaveLength(1);
  });

  test('getRecommendations retorna resultado do serviço para MultipleProducts', () => {
    const mockFormData = {
      selectedPreferences: ['Automação de marketing', 'Testes A/B'],
      selectedFeatures: ['Gestão de leads', 'Campanhas de e-mail'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const expectedResult = mockProducts;
    recommendationService.getRecommendations.mockReturnValue(expectedResult);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const recommendations = result.current.getRecommendations(mockFormData);

    expect(recommendations).toEqual(expectedResult);
    expect(recommendations).toHaveLength(2);
  });

  test('lida com dados de formulário inválidos graciosamente', () => {
    recommendationService.getRecommendations.mockReturnValue([]);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const recommendations = result.current.getRecommendations(null);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      null,
      mockProducts
    );
    expect(recommendations).toEqual([]);
  });

  test('preserva referência da função getRecommendations entre renders', () => {
    const { result, rerender } = renderHook(() =>
      useRecommendations(mockProducts)
    );

    const firstGetRecommendations = result.current.getRecommendations;

    rerender();

    expect(typeof result.current.getRecommendations).toBe('function');
  });

  test('atualiza quando produtos mudam', () => {
    const { result, rerender } = renderHook(
      ({ products }) => useRecommendations(products),
      { initialProps: { products: [mockProducts[0]] } }
    );

    const formData = {
      selectedPreferences: ['test'],
      selectedFeatures: ['test'],
      selectedRecommendationType: 'SingleProduct',
    };

    result.current.getRecommendations(formData);
    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      [mockProducts[0]]
    );

    rerender({ products: mockProducts });

    result.current.getRecommendations(formData);
    expect(recommendationService.getRecommendations).toHaveBeenLastCalledWith(
      formData,
      mockProducts
    );
  });
});
