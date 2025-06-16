# Instruções para o GitHub Copilot

## Contexto do Projeto

Este é um aplicativo React Native desenvolvido com Expo para calcular a idade de uma pessoa a partir da data de nascimento.

## Tecnologias e Frameworks

- **React Native**: Framework principal
- **Expo**: Plataforma de desenvolvimento
- **JavaScript**: Linguagem de programação
- **React Hooks**: Para gerenciamento de estado (useState)

## Arquitetura e Padrões

- **Componente funcional único**: Todo o código está no App.js
- **Estado local**: Usando hooks do React para gerenciar estado
- **Validação no frontend**: Verificações de data e entrada do usuário
- **Design responsivo**: Layout que se adapta a diferentes telas

## Convenções de Código

- **CamelCase**: Para nomes de variáveis e funções
- **PascalCase**: Para componentes React
- **Constantes em UPPERCASE**: Para valores fixos
- **Comentários descritivos**: Para lógica complexa

## Funcionalidades Principais

1. **Entrada de dados**: Campos para dia, mês e ano
2. **Validação**: Verificação de datas válidas
3. **Cálculo de idade**: Algoritmo preciso considerando anos bissextos
4. **Exibição de resultados**: Idade em anos, meses, dias e total de dias
5. **Interface moderna**: Design dark theme estilizado

## Estrutura de Estilos

- **Tema escuro**: Cores principais #0F172A, #1E293B
- **Cores de destaque**: Azul (#3B82F6), Verde (#10B981), Laranja (#F59E0B)
- **Layout flexível**: Usando Flexbox para responsividade
- **Cards e bordas**: Design com cantos arredondados e sombras

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run android`: Executa no emulador Android
- `npm run ios`: Executa no simulador iOS
- `npm run web`: Executa no navegador

## Diretrizes para Modificações

1. **Mantenha a consistência visual**: Use as cores e espaçamentos definidos
2. **Teste em diferentes dispositivos**: Verifique responsividade
3. **Valide entradas**: Sempre verifique dados do usuário
4. **Documente mudanças**: Atualize README se necessário
5. **Preserve a experiência do usuário**: Mantenha interface intuitiva

## Melhorias Futuras Sugeridas

- Internacionalização (i18n)
- Animações mais elaboradas
- Tema claro/escuro alternável
- Histórico de cálculos
- Compartilhamento de resultados
- Notificações de aniversário
