# Calculadora de Rentabilidade - React Native Expo

Um aplicativo móvel moderno e elegante para calcular a rentabilidade e eficácia empresarial, desenvolvido com React Native e Expo.

## 🎯 Funcionalidades

- **Cálculo de rentabilidade**: Insira vendas totais e custos totais
- **Análise automática**: Calcula lucro, margem de lucro e percentual de custos
- **Status empresarial**: Classifica a empresa (Excelente, Boa, Regular, Prejuízo)
- **Interface moderna**: Design dark theme com cores dinâmicas
- **Validação de dados**: Verificação de valores válidos
- **Design responsivo**: Otimizado para diferentes tamanhos de tela

## � Fórmulas Utilizadas

1. **Lucro = Vendas Totais - Custos Totais**
2. **Rentabilidade = Lucro ÷ Vendas Totais**
3. **Margem de Lucro = (Lucro ÷ Vendas Totais) × 100**
4. **% Custos = (Custos ÷ Vendas Totais) × 100**

## �🚀 Como executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Aplicativo Expo Go no seu dispositivo móvel (opcional)

### Instalação

1. Clone o repositório ou baixe os arquivos
2. Navegue até a pasta do projeto:
   ```bash
   cd CMU
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Executando o projeto

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   ou
   ```bash
   expo start
   ```

2. Escolha uma das opções:
   - **Dispositivo físico**: Escaneie o QR code com o app Expo Go
   - **Emulador Android**: Pressione 'a' no terminal
   - **Simulador iOS**: Pressione 'i' no terminal (apenas no macOS)
   - **Navegador web**: Pressione 'w' no terminal

## 📱 Como usar

1. **Inserir dados da empresa**:
   - Digite o nome da empresa (opcional)
   - Digite as vendas totais
   - Digite os custos totais

2. **Calcular rentabilidade**:
   - Toque no botão "Calcular Rentabilidade"
   - Veja a análise completa dos resultados

3. **Interpretar resultados**:
   - **Excelente**: Rentabilidade ≥ 20%
   - **Boa**: Rentabilidade ≥ 10%
   - **Regular**: Rentabilidade > 0% e < 10%
   - **Ponto de Equilíbrio**: Lucro = 0
   - **Prejuízo**: Lucro < 0

## 🎨 Design

O aplicativo possui um design moderno com:
- **Tema escuro** com cores dinâmicas baseadas no desempenho
- **Cards estilizados** para exibir resultados
- **Status visual** com cores que indicam a saúde financeira
- **Layout responsivo** que se adapta a diferentes telas
- **Formatação de moeda** em Kwanza Angolano (AOA)

## 🛠️ Tecnologias utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento e deploy
- **JavaScript/React Hooks**: useState, useRef para gerenciamento de estado
- **Intl API**: Para formatação de moeda e números
- **StyleSheet**: Estilização nativa do React Native

## 📦 Estrutura do projeto

```
CMU/
├── App.js              # Componente principal da aplicação
├── package.json        # Dependências e scripts
├── app.json           # Configurações do Expo
├── eas.json           # Configurações do EAS Build
├── assets/            # Imagens e recursos
└── README.md          # Documentação
```

## ✨ Funcionalidades técnicas

- **Validação de entrada**: Verificação de campos obrigatórios e valores válidos
- **Cálculos financeiros**: Algoritmos precisos para análise empresarial
- **Formatação de moeda**: Exibição em Kwanza Angolano
- **Status dinâmico**: Cores e mensagens que mudam baseadas no desempenho
- **KeyboardAvoidingView**: Interface adaptável ao teclado
- **ScrollView otimizado**: Navegação suave para os resultados

## � Exemplos de uso

### Empresa Lucrativa:
- **Vendas**: 1.000.000 AOA
- **Custos**: 600.000 AOA
- **Resultado**: Lucro de 400.000 AOA (40% de rentabilidade) - **Excelente**

### Empresa em Prejuízo:
- **Vendas**: 500.000 AOA
- **Custos**: 700.000 AOA
- **Resultado**: Prejuízo de -200.000 AOA - **Prejuízo**

## 🔧 Para gerar APK

```bash
# Usando EAS Build
npx eas build --platform android --profile preview

# Ou para build de produção
npx eas build --platform android
```

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Desenvolvedor

Desenvolvido como parte do projeto CMU (Computação Móvel e Ubíqua) - Calculadora de Rentabilidade Empresarial.
