# Onion S.A.

O projeto é um sistema desenvolvido para a empresa **Onion S.A.**, referência no setor de eletrônicos.  
O projeto foi criado para otimizar o **controle, manutenção das vendas e logística**, oferecendo ferramentas modernas para **importação de planilhas de pedidos**, **análise de desempenho em gráficos interativos**, e **consulta de endereços via CEP**.

---

## 🧩 Funcionalidades

- **Importação de Planilhas:** permite importar planilhas de pedidos no formato XLSX usando o MiniExcel.  
- **Visualização de Gráficos:** exibe gráficos dinâmicos de vendas por região e por produto com amCharts 5.  
- **Lista de Vendas:** apresenta uma listagem detalhada de todas as vendas registradas.  
- **Consulta de Localização:** integra com a API **ViaCEP** para obter endereços com base no CEP informado.  

---

## 🧠 Tecnologias Utilizadas

### **Backend**
- [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- **Entity Framework Core** (com banco **InMemory**)
- **MiniExcel**
- **AutoMapper**
- **FluentValidation**
- **Swagger** (documentação e testes de API)
- **CORS** configurado para integração com o front-end

### **Frontend**
- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [TailwindCSS 3](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [amCharts 5](https://www.amcharts.com/)
- [HeroIcons](https://heroicons.com/)
- [React Router DOM 7](https://reactrouter.com/)

---

## ⚙️ Como Executar o Projeto

### **Backend**
1. Certifique-se de ter o **.NET 8 SDK** instalado.  
2. Clone o repositório e acesse a pasta do back-end:
   ```bash
   cd Server
   dotnet restore
   dotnet watch run
   
3. A API estará disponível em:
   https://localhost:7281/api

### **Frontend**
1. Certifique-se de ter o Node.js instalado.  
2. Acesse a pasta do front-end:
   ```bash
   cd onion-client
3. Instale as dependências e execute o projeto:
   ```bash
   npm install
   npm run dev
4. O sistema estará disponível em:
   http://localhost:5173

---
