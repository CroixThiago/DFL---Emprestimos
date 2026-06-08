# DFL Consignado - Landing Page Interativa de Alta Conversão

Este é um projeto web moderno para a **DFL Consignado**, especializado em empréstimos consignados de taxas reduzidas para servidores, pensionistas, de portabilidade de crédito, refinanciamento de contratos e antecipação de FGTS.

Disponibiliza um painel de fomento e cálculo financeiro sob diretrizes do Banco Central do Brasil e total transparência conforme a Lei Geral de Proteção de Dados (LGPD).

---

## 🚀 Como Executar o Ambiente de Desenvolvimento

O projeto foi construído utilizando **React**, **Vite**, **TypeScript** e **Tailwind CSS**. Siga o passo a passo abaixo para rodá-lo localmente:

### 1. Pré-requisitos
Certifique-se de que possui o [Node.js](https://nodejs.org/) instalado na versão LTS recomendada (versão 18 ou superior).

### 2. Instalar Dependências
No terminal, na pasta raiz do projeto, execute o comando para carregar todos os módulos:
```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento
Para iniciar a aplicação em modo de desenvolvimento local com Hot Reload automático, execute:
```bash
npm run dev
```
Acesse a URL apresentada em seu terminal (geralmente [http://localhost:3000](http://localhost:3000)) para visualizar o site.

### 4. Build de Produção
Para gerar uma pasta estática compilada de altíssimo desempenho pronta para deployment comercial:
```bash
npm run build
```
O build criará uma pasta denominada `dist/` na raiz do projeto.

---

## 📂 Onde Encontrar os Arquivos para Manutenção (Guia do Iniciante)

Caso precise reordenar juros, editar telefones ou alterar cores, aqui está um mapa prático dos arquivos principais:

1. **Dados de Taxas, Convênios e FAQs (`/src/data.ts`)**:
   - Para mudar o telefone, as taxas padrão dos benefícios ou adicionar perguntas à FAQ, edite este arquivo. É um local centralizado de dados limpos.
   
2. **Logotipo e Imagens do Site (`/src/assets/manifest.ts`)**:
   - Descreve todas as imagens e marcas oficiais. O logotipo original está referenciado diretamente aqui.

3. **Cabeçalho de Navegação (`/src/components/Header.tsx`)**:
   - Ajuste links de seções rápidos para o menu desktop e o menu móvel hambúrguer.

4. **Painel de Acessibilidade (`/src/components/AccessibilityToolbar.tsx`)**:
   - Gerencia modos de alto contraste, ampliação de fontes, conversão para modo dislexia e síntese de voz (leitor de tela por áudio) para idosos ou pessoas com deficiências de visão.

5. **Formulário de Simulação 3 Passos (`/src/components/SimulateForm.tsx`)**:
   - Controla o formulário de captação de leads. Se precisar mudar campos, CPF/WhatsApp e a mensagem final enviada ao consultor.

6. **Calculadora de Economia de Dívida (`/src/components/EconomyCalculator.tsx`)**:
   - Mostra o comparativo dinâmico de troca de dívida cara (Cartão rotativo/Cheque especial) por taxas reduzidas.

---

## 🌐 Como Fazer Deploy do Site e Hospedagem

Como este é um aplicativo focado exclusivamente no lado do cliente (Client-Side Single Page Application), **ele não necessita de banco de dados complexo ou de servidores de backend rodando em tempo integral**. Você pode hospedá-lo de forma extremamente simples e econômica.

---

### 📦 Deploy em Plataformas Simples (Sem código)

Se você é um produtor ou usuário sem conhecimentos em programação avançada, siga estes três passos simples para colocar seu site no ar:

1. **Gere os Arquivos Finais**:
   No terminal da pasta do projeto, execute o comando de compilação:
   ```bash
   npm run build
   ```
   Isso criará uma pasta chamada `dist` na pasta raiz do projeto. Esta pasta contém todos os arquivos finais compactados (HTML, CSS, imagens e scripts).

2. **Como hospedar em serviços comuns (Drag & Drop / Arrastar e Soltar)**:

   - **Vercel (A mais simples e gratuita)**:
     1. Acesse [vercel.com](https://vercel.com) e crie uma conta gratuita.
     2. No painel de controle, vá na área de **Deploy Rápido** ou arraste a pasta inteira `dist` diretamente para a área de upload no navegador.
     3. Em poucos segundos, sua página estará online com um link seguro e certificado SSL gratuito!

   - **Netlify**:
     1. Entre no site [netlify.com](https://netlify.com) e conecte-se.
     2. Vá até a aba "Deploy" e arraste e solte a sua pasta `dist` compilada.
     3. O Netlify fará a publicação imediata.

   - **Hospedagens tradicionais com cPanel (Hostgator, Hostinger, Locaweb)**:
     1. Compacte toda a pasta `dist` em um formato `.zip` utilizando seu computador.
     2. Acesse o painel **cPanel** ou o gerenciador de arquivos da sua empresa de hospedagem.
     3. Vá até a pasta `public_html` e faça o upload do arquivo `.zip`.
     4. Extraia os arquivos diretamente dentro do `public_html`. Pronto! Suas taxas e simulador já estarão ativos sem precisar de mais nada.

   - **Wix (Utilizando Wix HTML Embed / Wix Developer)**:
     1. Se estiver utilizando o Wix Studio, você pode hospedar os arquivos estáticos ou carregar os componentes de build direto como uma seção HTML customizada (iFrame/Custom Element) incorporando o arquivo compilado index.html e lincando as folhas de estilos e js em um servidor externo gratuito como Vercel, combinando a facilidade de edição visual com as ferramentas avançadas de acessibilidade do nosso projeto.

---

### Opção A: Configuração via Git (Vercel)📐

1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Conecte sua conta do GitHub ao painel Vercel.
3. Selecione este repositório importado.
4. Garanta as seguintes de configurações padrões do build:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Clique em **Deploy** e o site será atualizado automaticamente sempre que você enviar mudanças ao GitHub!

### Opção B: Configuração via Netlify ⚡

1. Visite [netlify.com](https://netlify.com) e acesse o painel.
2. Selecione a opção **Import from Git** e selecione o repositório.
3. Defina os parâmetros de compilação:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
4. Clique em **Deploy site**.

---

## 🎨 Design & Cores Oficiais
O tema oficial de alto engajamento visual do site usa as seguintes cores principais do Tailwind:
- `#120822` (Roxo Profundo Nobre / Fundo Geral)
- `#E8C670` (Dourado Premium de Destaque / Botões e realces)
- `#4C2A7A` (Púrpura Vibrante de Ação)
- `#10B981` (Verde Esmeralda do WhatsApp)

---

## ♿ Acessibilidade WCAG Premium
Este projeto foi rigorosamente testado para conformidade com normas de usabilidade digital:
- **ARIA Landmark Roles**: Para ajudar navegação de leitores de tela NVDA/VoiceOver.
- **Tamanho de Toques Comfort**: Botões e anchors possuem um tamanho maior do que 44px de destino, ideal para usuários idosos ou com tremores motores.
- **Teclado**: Todo o formulário pode ser preenchido inteiramente usando a tecla `Tab` e `Enter`.
