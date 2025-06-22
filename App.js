import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

export default function App() {
  const [totalSales, setTotalSales] = useState('');
  const [totalCosts, setTotalCosts] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [results, setResults] = useState(null);

  const costsInputRef = useRef(null);
  const companyInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const formatInputValue = (value) => {
    // Remove tudo que não é número
    const numericValue = value.replace(/[^\d]/g, '');
    
    if (!numericValue) return '';
    
    // Converte para número e divide por 100 para ter centavos
    const number = parseInt(numericValue) / 100;
    
    // Formata como moeda
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleSalesChange = (text) => {
    const formatted = formatInputValue(text);
    setTotalSales(formatted);
  };

  const handleCostsChange = (text) => {
    const formatted = formatInputValue(text);
    setTotalCosts(formatted);
  };

  const parseInputValue = (value) => {
    if (!value) return 0;
    return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
  };

  const getMarketBenchmark = (profitabilityPercentage) => {
    const percentage = profitabilityPercentage * 100;
    
    if (percentage >= 25) {
      return {
        status: 'Top 5% das empresas',
        context: 'Está entre as empresas mais rentáveis do mercado'
      };
    } else if (percentage >= 15) {
      return {
        status: 'Top 20% das empresas',
        context: 'Performance acima da média do mercado'
      };
    } else if (percentage >= 8) {
      return {
        status: 'Média do mercado',
        context: 'Performance dentro da média esperada'
      };
    } else if (percentage >= 3) {
      return {
        status: 'Abaixo da média',
        context: 'Performance inferior à média do mercado'
      };
    } else if (percentage > 0) {
      return {
        status: 'Baixa performance',
        context: 'Rentabilidade muito abaixo do esperado'
      };
    } else {
      return {
        status: 'Situação crítica',
        context: 'Empresa operando com prejuízo'
      };
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'AOA' // Kwanza Angolano
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const calculateProfitability = () => {
    if (!totalSales || !totalCosts) {
      Alert.alert('⚠️ Campos Obrigatórios', 'Por favor, preencha os campos de Vendas e Custos');
      return;
    }

    const sales = parseInputValue(totalSales);
    const costs = parseInputValue(totalCosts);

    // Validações básicas
    if (isNaN(sales) || sales <= 0) {
      Alert.alert('❌ Erro de Validação', 'Vendas totais deve ser um valor válido maior que zero');
      return;
    }
    if (isNaN(costs) || costs < 0) {
      Alert.alert('❌ Erro de Validação', 'Custos totais deve ser um valor válido (pode ser zero)');
      return;
    }
    if (costs > sales * 10) {
      Alert.alert('🤔 Valores Suspeitos', 'Os custos parecem muito altos em relação às vendas. Verifique os valores digitados.');
      return;
    }

    // Cálculos
    const profit = sales - costs;
    const profitabilityPercentage = sales > 0 ? profit / sales : 0;
    const profitMargin = sales > 0 ? (profit / sales) * 100 : 0;
    const costPercentage = sales > 0 ? (costs / sales) * 100 : 0;

    // Determinar status da empresa com análise profissional
    let businessStatus = '';
    let statusColor = '';
    let interpretation = '';
    let recommendations = [];
    const benchmark = getMarketBenchmark(profitabilityPercentage);
    
    if (profit > 0) {
      if (profitabilityPercentage >= 0.25) {
        businessStatus = 'Excepcional';
        statusColor = '#059669'; // Verde escuro
        interpretation = `Desempenho financeiro excepcional com margem de lucro de ${(profitabilityPercentage * 100).toFixed(1)}%. ${benchmark.context}. A empresa demonstra excelente controle de custos e forte capacidade de geração de valor.`;
        recommendations = [
          'Considere investir em expansão ou novos mercados',
          'Mantenha o foco na eficiência operacional',
          'Avalie oportunidades de diversificação de produtos/serviços'
        ];
      } else if (profitabilityPercentage >= 0.15) {
        businessStatus = 'Muito Boa';
        statusColor = '#10B981'; // Verde
        interpretation = `Performance sólida com margem de lucro de ${(profitabilityPercentage * 100).toFixed(1)}%. ${benchmark.context}. A empresa está bem posicionada no mercado com boa gestão financeira.`;
        recommendations = [
          'Monitore tendências do mercado para identificar oportunidades',
          'Invista em melhorias de processos e tecnologia',
          'Considere aumentar participação de mercado'
        ];
      } else if (profitabilityPercentage >= 0.08) {
        businessStatus = 'Boa';
        statusColor = '#3B82F6'; // Azul
        interpretation = `Rentabilidade adequada de ${(profitabilityPercentage * 100).toFixed(1)}%. ${benchmark.context}. A empresa opera de forma sustentável, mas há espaço para otimizações.`;
        recommendations = [
          'Analise principais centros de custo para identificar ineficiências',
          'Busque eficiências operacionais e automação de processos',
          'Avalie estratégias de precificação e valor agregado'
        ];
      } else if (profitabilityPercentage >= 0.03) {
        businessStatus = 'Regular';
        statusColor = '#F59E0B'; // Laranja
        interpretation = `Margem de lucro baixa de ${(profitabilityPercentage * 100).toFixed(1)}%. ${benchmark.context}. A empresa precisa de atenção imediata para melhorar sua competitividade.`;
        recommendations = [
          'Revise estrutura de custos urgentemente',
          'Identifique e elimine gastos desnecessários',
          'Renegocie contratos com fornecedores e busque melhores condições'
        ];
      } else {
        businessStatus = 'Crítica';
        statusColor = '#F97316'; // Laranja escuro
        interpretation = `Rentabilidade muito baixa de ${(profitabilityPercentage * 100).toFixed(1)}%. ${benchmark.context}. Situação requer intervenção imediata para evitar prejuízos futuros.`;
        recommendations = [
          'Implementar plano de contenção de custos imediatamente',
          'Revisar todos os processos operacionais e eliminar ineficiências',
          'Buscar consultoria especializada em reestruturação empresarial'
        ];
      }
    } else if (profit === 0) {
      businessStatus = 'Ponto de Equilíbrio';
      statusColor = '#6B7280'; // Cinza
      interpretation = `A empresa está no ponto de equilíbrio, onde as receitas cobrem exatamente os custos operacionais. ${benchmark.context}. Não há geração de lucro, mas também não há prejuízo.`;
      recommendations = [
        'Foque em estratégias de aumento de receita e valor agregado',
        'Otimize processos para reduzir custos operacionais',
        'Implemente indicadores de performance (KPIs) para monitoramento'
      ];
    } else {
      const lossPercentage = Math.abs(profitabilityPercentage * 100);
      businessStatus = 'Prejuízo';
      statusColor = '#DC2626'; // Vermelho
      interpretation = `A empresa está operando com prejuízo de ${lossPercentage.toFixed(1)}%. ${benchmark.context}. Esta situação é insustentável e requer ação imediata para reverter o quadro.`;
      recommendations = [
        'Implemente plano de reestruturação urgente com metas claras',
        'Corte custos não essenciais imediatamente',
        'Revise modelo de negócios e estratégia de preços',
        'Busque capital de giro ou financiamento se necessário'
      ];
    }

    setResults({
      sales,
      costs,
      profit,
      profitabilityPercentage,
      profitMargin,
      costPercentage,
      businessStatus,
      statusColor,
      interpretation,
      recommendations,
      benchmark,
      companyName: companyName || 'Empresa'
    });

    // Fechar o teclado
    Keyboard.dismiss();

    // Scroll para a seção de resultados após um pequeno delay
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const clearFields = () => {
    setTotalSales('');
    setTotalCosts('');
    setCompanyName('');
    setResults(null);
    Keyboard.dismiss();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
          <View style={styles.header}>
            <Text style={styles.title}>Calculadora de Rentabilidade</Text>
            <Text style={styles.subtitle}>Analise a eficácia da sua empresa</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome da Empresa (Opcional)</Text>
            <TextInput
              style={styles.companyInput}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Digite o nome da empresa"
              placeholderTextColor="#9CA3AF"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => costsInputRef.current?.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dados Financeiros</Text>
            
            <View style={styles.financialInputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Vendas Totais</Text>
                <TextInput
                  style={styles.input}
                  value={totalSales}
                  onChangeText={handleSalesChange}
                  placeholder="0,00"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => costsInputRef.current?.focus()}
                />
              </View>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Custos Totais</Text>
                <TextInput
                  ref={costsInputRef}
                  style={styles.input}
                  value={totalCosts}
                  onChangeText={handleCostsChange}
                  placeholder="0,00"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={dismissKeyboard}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.calculateButton} onPress={calculateProfitability}>
              <Text style={styles.calculateButtonText}>Calcular Rentabilidade</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Análise Financeira - {results.companyName}</Text>
              
              <View style={styles.statusCard}>
                <Text style={[styles.statusText, { color: results.statusColor }]}>
                  {results.businessStatus}
                </Text>
                <Text style={styles.benchmarkText}>
                  {results.benchmark?.status}
                </Text>
              </View>

              <View style={styles.profitCard}>
                <Text style={styles.profitLabel}>Lucro</Text>
                <Text style={[styles.profitNumber, { color: results.profit >= 0 ? '#10B981' : '#EF4444' }]}>
                  {formatCurrency(results.profit)}
                </Text>
              </View>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailCard}>
                  <Text style={styles.detailNumber}>{formatPercentage(results.profitabilityPercentage)}</Text>
                  <Text style={styles.detailLabel}>Rentabilidade</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.detailNumber}>{results.profitMargin.toFixed(1)}%</Text>
                  <Text style={styles.detailLabel}>Margem de Lucro</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.detailNumber}>{results.costPercentage.toFixed(1)}%</Text>
                  <Text style={styles.detailLabel}>% Custos</Text>
                </View>
              </View>
              
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Vendas Totais:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(results.sales)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Custos Totais:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(results.costs)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.summaryRowHighlight]}>
                  <Text style={styles.summaryLabelBold}>Lucro Líquido:</Text>
                  <Text style={[styles.summaryValueBold, { color: results.profit >= 0 ? '#10B981' : '#EF4444' }]}>
                    {formatCurrency(results.profit)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.interpretationContainer}>
                <Text style={styles.interpretationTitle}>� Análise Profissional</Text>
                <Text style={styles.interpretationText}>{results.interpretation}</Text>
              </View>
              
              {results.recommendations && results.recommendations.length > 0 && (
                <View style={styles.recommendationsContainer}>
                  <Text style={styles.recommendationsTitle}>📋 Recomendações Estratégicas</Text>
                  {results.recommendations.map((recommendation, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <Text style={styles.recommendationBullet}>•</Text>
                      <Text style={styles.recommendationText}>{recommendation}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  companyInput: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  financialInputContainer: {
    gap: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 30,
  },
  calculateButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#475569',
  },
  clearButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '500',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#334155',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  benchmarkText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  profitCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  profitLabel: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 8,
  },
  profitNumber: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    gap: 12,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  detailNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: '#10B981',
  },
  detailLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryRowHighlight: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    marginTop: 12,
    paddingTop: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#94A3B8',
  },
  summaryValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  summaryLabelBold: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryValueBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  interpretationContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  interpretationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  interpretationText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    textAlign: 'justify',
  },
  recommendationsContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationBullet: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 14,
    color: '#E2E8F0',
    lineHeight: 20,
    flex: 1,
  },
});
