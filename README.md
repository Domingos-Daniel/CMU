# Calculadora de Idade - React Native Expo

Um aplicativo móvel moderno e elegante para calcular a idade de uma pessoa a partir da data de nascimento, desenvolvido com React Native e Expo.

## 🎯 Funcionalidades

- **Cálculo preciso de idade**: Insira o dia, mês e ano de nascimento
- **Resultados detalhados**: Mostra a idade em anos, meses e dias
- **Contador de dias vividos**: Exibe o total de dias desde o nascimento
- **Interface moderna**: Design dark theme com gradientes e animações
- **Validação de dados**: Verificação de datas válidas e futuras
- **Design responsivo**: Otimizado para diferentes tamanhos de tela

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

1. **Inserir data de nascimento**:
   - Digite o dia (1-31)
   - Digite o mês (1-12)
   - Digite o ano (1900-ano atual)

2. **Calcular idade**:
   - Toque no botão "Calcular Idade"
   - Veja o resultado detalhado

3. **Limpar campos**:
   - Use o botão "Limpar" para reiniciar

## 🎨 Design

O aplicativo possui um design moderno com:
- **Tema escuro** com cores azul e verde
- **Cards estilizados** para exibir resultados
- **Animações sutis** e feedback visual
- **Layout responsivo** que se adapta a diferentes telas
- **Tipografia hierárquica** para melhor legibilidade

## 🛠️ Tecnologias utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento e deploy
- **JavaScript/React Hooks**: useState para gerenciamento de estado
- **StyleSheet**: Estilização nativa do React Native

## 📦 Estrutura do projeto

```
CMU/
├── App.js              # Componente principal da aplicação
├── package.json        # Dependências e scripts
├── app.json           # Configurações do Expo
├── assets/            # Imagens e recursos
└── README.md          # Documentação
```

## ✨ Funcionalidades técnicas

- **Validação de entrada**: Verificação de campos obrigatórios e formatos
- **Cálculo preciso**: Leva em conta anos bissextos e diferentes durações de meses
- **Tratamento de erros**: Alertas informativos para entradas inválidas
- **KeyboardAvoidingView**: Interface adaptável ao teclado
- **SafeAreaView**: Compatibilidade com diferentes dispositivos

## 🔧 Personalização

Para personalizar o app, você pode:
- Modificar as cores no objeto `styles`
- Ajustar o layout alterando os componentes
- Adicionar novas funcionalidades como próximo aniversário
- Implementar diferentes temas

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Desenvolvedor

Desenvolvido como parte do projeto CMU (Computação Móvel e Ubíqua).
