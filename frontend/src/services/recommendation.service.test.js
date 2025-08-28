import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna array vazio quando não há produtos disponíveis', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Chat ao vivo'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      []
    );
    expect(recommendations).toEqual([]);
  });

  test('Retorna array vazio quando produtos é undefined', () => {
    const formData = {
      selectedPreferences: ['test'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      undefined
    );
    expect(recommendations).toEqual([]);
  });

  test('Retorna array vazio quando não há matches', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: ['Feature inexistente'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Lida com formData vazio graciosamente', () => {
    const recommendations = recommendationService.getRecommendations(
      {},
      mockProducts
    );
    expect(recommendations).toEqual([]);
  });

  test('Lida com formData undefined', () => {
    const recommendations = recommendationService.getRecommendations(
      undefined,
      mockProducts
    );
    expect(recommendations).toEqual([]);
  });

  test('Retorna array vazio para tipo de recomendação inválido', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'InvalidType',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );
    expect(recommendations).toEqual([]);
  });

  test('Produtos com score maior aparecem primeiro em MultipleProducts', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations[0].name).toBe('RD Station CRM');
    expect(recommendations[1].name).toBe('RD Station Marketing');
  });

  test('Score combina preferências e features corretamente', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Rastreamento de comportamento do usuário'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Case insensitive matching funciona corretamente', () => {
    const formData = {
      selectedPreferences: ['AUTOMAÇÃO DE MARKETING'],
      selectedFeatures: ['gestão de leads'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations.length).toBeGreaterThan(0);
  });

  test('Matching parcial funciona (contains)', () => {
    const formData = {
      selectedPreferences: ['marketing'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Funciona corretamente com todos os produtos do mock', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
        'Integração com chatbots',
        'Análise preditiva de dados',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(4);
    expect(recommendations.map((p) => p.name)).toContain('RD Station CRM');
    expect(recommendations.map((p) => p.name)).toContain(
      'RD Station Marketing'
    );
    expect(recommendations.map((p) => p.name)).toContain('RD Conversas');
    expect(recommendations.map((p) => p.name)).toContain('RD Mentor AI');
  });
});
