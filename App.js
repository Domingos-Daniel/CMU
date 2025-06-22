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
      Alert.alert('Erro', 'Por favor, preencha os campos de Vendas e Custos');
      return;
    }

    const sales = parseFloat(totalSales.replace(/[^\d.,]/g, '').replace(',', '.'));
    const costs = parseFloat(totalCosts.replace(/[^\d.,]/g, '').replace(',', '.'));

    // Validações básicas
    if (isNaN(sales) || sales <= 0) {
      Alert.alert('Erro', 'Vendas totais deve ser um valor válido maior que zero');
      return;
    }
    if (isNaN(costs) || costs < 0) {
      Alert.alert('Erro', 'Custos totais deve ser um valor válido');
      return;
    }

    // Cálculos
    const profit = sales - costs;
    const profitabilityPercentage = sales > 0 ? profit / sales : 0;
    const profitMargin = sales > 0 ? (profit / sales) * 100 : 0;
    const costPercentage = sales > 0 ? (costs / sales) * 100 : 0;

    // Determinar status da empresa
    let businessStatus = '';
    let statusColor = '';
    if (profit > 0) {
      if (profitabilityPercentage >= 0.20) {
        businessStatus = 'Excelente';
        statusColor = '#10B981'; // Verde
      } else if (profitabilityPercentage >= 0.10) {
        businessStatus = 'Boa';
        statusColor = '#3B82F6'; // Azul
      } else {
        businessStatus = 'Regular';
        statusColor = '#F59E0B'; // Laranja
      }
    } else if (profit === 0) {
      businessStatus = 'Ponto de Equilíbrio';
      statusColor = '#6B7280'; // Cinza
    } else {
      businessStatus = 'Prejuízo';
      statusColor = '#EF4444'; // Vermelho
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
                  onChangeText={setTotalSales}
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
                  onChangeText={setTotalCosts}
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
    fontSize: 36,
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
    fontSize: 20,
    fontWeight: 'bold',
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
});
