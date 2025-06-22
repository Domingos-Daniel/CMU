# Calculadora de Rentabilidade Empresarial - React Native Expo

Um aplicativo móvel moderno e elegante para calcular a rentabilidade e eficácia financeira de empresas, desenvolvido com React Native e Expo.

## 🎯 Funcionalidades

- **Cálculo de rentabilidade**: Insira vendas totais e custos para análise completa
- **Formatação automática**: Valores monetários formatados em tempo real
- **Análise inteligente**: Status da empresa baseado na margem de lucro
- **Interpretação detalhada**: Dicas e explicações dos resultados
- **Interface moderna**: Design dark theme com cores intuitivas
- **Validação robusta**: Verificação de dados com alertas informativos
- **Design responsivo**: Otimizado para diferentes tamanhos de tela

## 💼 Análises Disponíveis

### Métricas Calculadas:
1. **Lucro Líquido**: Vendas Totais - Custos Totais
2. **Rentabilidade**: (Lucro ÷ Vendas) × 100%
3. **Margem de Lucro**: Percentual de lucro sobre vendas
4. **Percentual de Custos**: Participação dos custos nas vendas

### Status da Empresa:
- **Excelente** (≥20% rentabilidade): Verde 🟢
- **Boa** (10-19% rentabilidade): Azul 🔵
- **Regular** (1-9% rentabilidade): Laranja 🟠
- **Ponto de Equilíbrio** (0% rentabilidade): Cinza ⚪
- **Prejuízo** (<0% rentabilidade): Vermelho 🔴

## 🚀 Como executar

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

1. **Nome da empresa** (opcional):
   - Digite o nome para personalizar o relatório

2. **Inserir dados financeiros**:
   - **Vendas Totais**: Receita total da empresa
   - **Custos Totais**: Soma de todos os custos operacionais

3. **Calcular rentabilidade**:
   - Toque no botão "Calcular Rentabilidade"
   - Visualize a análise completa com interpretação

4. **Limpar campos**:
   - Use o botão "Limpar" para nova análise

## 🎨 Design

O aplicativo possui um design moderno com:
- **Tema escuro** profissional
- **Formatação automática** de valores monetários (Kwanza AOA)
- **Cards informativos** com métricas importantes
- **Código de cores** para rápida interpretação
- **Interpretação inteligente** dos resultados
- **Layout responsivo** que se adapta a diferentes telas

## 🛠️ Tecnologias utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento e deploy
- **JavaScript/React Hooks**: useState, useRef para gerenciamento de estado
- **StyleSheet**: Estilização nativa do React Native
- **Intl.NumberFormat**: Formatação de valores monetários

## 📦 Estrutura do projeto

```
CMU/
├── App.js                    # Componente principal da aplicação
├── package.json             # Dependências e scripts
├── app.json                # Configurações do Expo
├── eas.json                # Configuração para build
├── assets/                 # Imagens e recursos
├── README.md              # Esta documentação
├── GERAR_APK.md          # Instruções para gerar APK
└── ICON_INSTRUCTIONS.md  # Instruções para criar ícone
```

## ✨ Funcionalidades técnicas

- **Formatação em tempo real**: Valores formatados conforme digitação
- **Validação inteligente**: Verificações avançadas de dados
- **Interpretação automática**: Análise contextual dos resultados
- **Navegação fluida**: Transição automática between campos
- **Feedback visual**: Cores e ícones para diferentes status
- **KeyboardAvoidingView**: Interface adaptável ao teclado
- **ScrollView inteligente**: Scroll automático para resultados

## 📊 Exemplos de Uso

### Empresa Lucrativa:
- **Vendas**: 100.000,00 AOA
- **Custos**: 70.000,00 AOA
- **Resultado**: Lucro de 30.000,00 AOA (30% rentabilidade - Excelente)

### Empresa no Prejuízo:
- **Vendas**: 50.000,00 AOA
- **Custos**: 60.000,00 AOA
- **Resultado**: Prejuízo de -10.000,00 AOA (-20% rentabilidade)

## 📱 Gerar APK

Para gerar o APK da aplicação, consulte o arquivo [`GERAR_APK.md`](GERAR_APK.md) com instruções detalhadas.

## 🎯 Melhorias Futuras

- Histórico de cálculos salvos
- Comparação entre períodos
- Gráficos interativos
- Exportação de relatórios
- Múltiplas moedas
- Análise de tendências
- Modo claro/escuro alternável

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Desenvolvedor

Desenvolvido como parte do projeto CMU (Computação Móvel e Ubíqua) - Calculadora de Rentabilidade Empresarial.
