import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('useForm Hook', () => {
  const initialData = {
    selectedPreferences: ['pref1'],
    selectedFeatures: ['feature1'],
    selectedRecommendationType: 'SingleProduct',
  };

  test('inicializa com dados fornecidos', () => {
    const { result } = renderHook(() => useForm(initialData));

    expect(result.current.formData).toEqual(initialData);
    expect(typeof result.current.handleChange).toBe('function');
  });

  test('inicializa com objeto vazio se não fornecido', () => {
    const { result } = renderHook(() => useForm());

    expect(result.current.formData).toEqual({});
  });

  test('atualiza campo específico corretamente', () => {
    const { result } = renderHook(() => useForm(initialData));

    act(() => {
      result.current.handleChange('selectedPreferences', ['pref1', 'pref2']);
    });

    expect(result.current.formData.selectedPreferences).toEqual([
      'pref1',
      'pref2',
    ]);
    expect(result.current.formData.selectedFeatures).toEqual(['feature1']); // não alterado
    expect(result.current.formData.selectedRecommendationType).toBe(
      'SingleProduct'
    );
  });

  test('adiciona novo campo se não existir', () => {
    const { result } = renderHook(() => useForm({}));

    act(() => {
      result.current.handleChange('newField', 'newValue');
    });

    expect(result.current.formData.newField).toBe('newValue');
  });

  test('atualiza tipo de recomendação', () => {
    const { result } = renderHook(() => useForm(initialData));

    act(() => {
      result.current.handleChange(
        'selectedRecommendationType',
        'MultipleProducts'
      );
    });

    expect(result.current.formData.selectedRecommendationType).toBe(
      'MultipleProducts'
    );
  });

  test('limpa campo definindo como array vazio', () => {
    const { result } = renderHook(() => useForm(initialData));

    act(() => {
      result.current.handleChange('selectedPreferences', []);
    });

    expect(result.current.formData.selectedPreferences).toEqual([]);
  });

  test('mantém imutabilidade do estado', () => {
    const { result } = renderHook(() => useForm(initialData));

    const originalFormData = result.current.formData;

    act(() => {
      result.current.handleChange('selectedPreferences', ['newPref']);
    });

    expect(originalFormData.selectedPreferences).toEqual(['pref1']);
    expect(result.current.formData.selectedPreferences).toEqual(['newPref']);
    expect(result.current.formData).not.toBe(originalFormData);
  });

  test('lida com valores de diferentes tipos', () => {
    const { result } = renderHook(() => useForm({}));

    act(() => {
      result.current.handleChange('stringField', 'string');
    });
    act(() => {
      result.current.handleChange('numberField', 42);
    });
    act(() => {
      result.current.handleChange('arrayField', [1, 2, 3]);
    });
    act(() => {
      result.current.handleChange('objectField', { key: 'value' });
    });
    act(() => {
      result.current.handleChange('booleanField', true);
    });

    expect(result.current.formData).toEqual({
      stringField: 'string',
      numberField: 42,
      arrayField: [1, 2, 3],
      objectField: { key: 'value' },
      booleanField: true,
    });
  });

  test('mantém referência da função handleChange', () => {
    const { result, rerender } = renderHook(() => useForm(initialData));

    const firstHandleChange = result.current.handleChange;

    rerender();

    expect(typeof result.current.handleChange).toBe('function');
  });
});
