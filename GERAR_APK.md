# 📱 Como Gerar o APK da Calculadora de Idade

## 🎯 **Status do Projeto**
✅ **Código concluído e funcional**  
✅ **Export para Android realizado**  
⏳ **APK pronto para ser gerado**

## 🔧 **Métodos para Gerar o APK**

### **Método 1: EAS Build (Recomendado) - Online**

1. **Fazer login no Expo** (já feito):
   ```bash
   npx expo login
   ```

2. **Configurar o projeto EAS**:
   ```bash
   npx eas build:configure
   ```

3. **Gerar o APK**:
   ```bash
   npx eas build --platform android --profile preview
   ```

4. **Aguardar o build** (será feito nos servidores da Expo)
5. **Download do APK** via link fornecido

### **Método 2: EAS Build Local**

1. **Instalar dependências locais**:
   ```bash
   npm install -g @expo/ngrok
   ```

2. **Gerar build local**:
   ```bash
   npx eas build --platform android --local
   ```

### **Método 3: APK de Desenvolvimento (Mais Rápido)**

1. **Exportar projeto**:
   ```bash
   npx expo export --platform android
   ```

2. **Usar Android Studio ou Gradle** para gerar APK

## 📋 **Passos Detalhados - EAS Build Online**

### 1. **Preparação do Projeto**
```bash
# Verifique se está logado
npx expo whoami

# Configure o projeto (se ainda não fez)
npx eas build:configure
```

### 2. **Gerar APK Preview**
```bash
npx eas build --platform android --profile preview
```

### 3. **Monitorar o Build**
- O comando mostrará um link para acompanhar o progresso
- O build acontece nos servidores da Expo
- Tempo estimado: 5-15 minutos

### 4. **Download do APK**
- Após concluído, você receberá um link para download
- O APK estará pronto para instalação

## ⚙️ **Configurações do Projeto**

### **app.json** - Configurado ✅
```json
{
  "expo": {
    "name": "Calculadora de Idade",
    "version": "1.0.0",
    "android": {
      "package": "com.cmu.calculadoraidade",
      "versionCode": 1
    }
  }
}
```

### **eas.json** - Configurado ✅
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

## 🚀 **Para Executar Agora**

Execute este comando para gerar o APK:

```bash
npx eas build --platform android --profile preview
```

## 📱 **Funcionalidades do App**

- ✅ **Cálculo de idade preciso**
- ✅ **Interface moderna (dark theme)**
- ✅ **Validação de dados**
- ✅ **Navegação entre campos**
- ✅ **Scroll automático para resultados**
- ✅ **Labels plurais/singulares**
- ✅ **Fechar teclado ao clicar fora**

## 📋 **Troubleshooting**

### Se der erro no EAS Build:
1. Verifique se está logado: `npx expo whoami`
2. Atualize o EAS CLI: `npm install -g @expo/eas-cli`
3. Tente novamente o comando de build

### Para build local:
1. Instale Android Studio
2. Configure as variáveis de ambiente do Android SDK
3. Use `npx eas build --platform android --local`

## 📂 **Arquivos Gerados**

- `dist/` - Arquivos exportados para Android
- `eas.json` - Configuração do EAS Build
- `app.json` - Configuração do app atualizada

**O projeto está pronto para gerar o APK! 🎉**
