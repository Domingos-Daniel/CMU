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
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
  const [ageDetails, setAgeDetails] = useState(null);

  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const calculateAge = () => {
    if (!day || !month || !year) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Validações básicas
    if (dayNum < 1 || dayNum > 31) {
      Alert.alert('Erro', 'Dia deve estar entre 1 e 31');
      return;
    }
    if (monthNum < 1 || monthNum > 12) {
      Alert.alert('Erro', 'Mês deve estar entre 1 e 12');
      return;
    }
    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      Alert.alert('Erro', 'Ano inválido');
      return;
    }

    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();

    // Verificar se a data é válida
    if (birthDate.getDate() !== dayNum || birthDate.getMonth() !== monthNum - 1) {
      Alert.alert('Erro', 'Data inválida');
      return;
    }

    if (birthDate > today) {
      Alert.alert('Erro', 'Data de nascimento não pode ser no futuro');
      return;
    }

    // Calcular idade
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonth.getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    // Calcular dias totais vividos
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setAge(ageYears);
    setAgeDetails({
      years: ageYears,
      months: ageMonths,
      days: ageDays,
      totalDays: diffDays
    });

    // Fechar o teclado
    Keyboard.dismiss();

    // Scroll para a seção de resultados após um pequeno delay
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const clearFields = () => {
    setDay('');
    setMonth('');
    setYear('');
    setAge(null);
    setAgeDetails(null);
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
            <Text style={styles.title}>Calculadora de Idade</Text>
            <Text style={styles.subtitle}>Descubra sua idade exata</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data de Nascimento</Text>
            
            <View style={styles.dateInputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Dia</Text>
                <TextInput
                  style={styles.input}
                  value={day}
                  onChangeText={setDay}
                  placeholder="DD"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={2}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => monthInputRef.current?.focus()}
                />
              </View>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Mês</Text>
                <TextInput
                  ref={monthInputRef}
                  style={styles.input}
                  value={month}
                  onChangeText={setMonth}
                  placeholder="MM"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={2}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => yearInputRef.current?.focus()}
                />
              </View>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Ano</Text>
                <TextInput
                  ref={yearInputRef}
                  style={[styles.input, styles.yearInput]}
                  value={year}
                  onChangeText={setYear}
                  placeholder="AAAA"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={4}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={dismissKeyboard}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.calculateButton} onPress={calculateAge}>
              <Text style={styles.calculateButtonText}>Calcular Idade</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {ageDetails && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Sua Idade</Text>
              <View style={styles.ageCard}>
                <Text style={styles.ageNumber}>{age}</Text>
                <Text style={styles.ageText}>{age === 1 ? 'ano' : 'anos'}</Text>
              </View>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailCard}>
                  <Text style={styles.detailNumber}>{ageDetails.years}</Text>
                  <Text style={styles.detailLabel}>{ageDetails.years === 1 ? 'Ano' : 'Anos'}</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.detailNumber}>{ageDetails.months}</Text>
                  <Text style={styles.detailLabel}>{ageDetails.months === 1 ? 'Mês' : 'Meses'}</Text>
                </View>
                <View style={styles.detailCard}>
                  <Text style={styles.detailNumber}>{ageDetails.days}</Text>
                  <Text style={styles.detailLabel}>{ageDetails.days === 1 ? 'Dia' : 'Dias'}</Text>
                </View>
              </View>
              
              <View style={styles.totalDaysContainer}>
                <Text style={styles.totalDaysText}>
                  Você viveu <Text style={styles.totalDaysNumber}>{ageDetails.totalDays}</Text> {ageDetails.totalDays === 1 ? 'dia' : 'dias'}
                </Text>
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
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
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
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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
  yearInput: {
    flex: 1.5,
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
  },
  ageCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  ageNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  ageText: {
    fontSize: 18,
    color: '#94A3B8',
    marginTop: 4,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  detailLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  totalDaysContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  totalDaysText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  totalDaysNumber: {
    fontWeight: 'bold',
    color: '#F59E0B',
  },
});
