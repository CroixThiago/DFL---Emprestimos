# Guia de Manutenção Simplificada 🛠️
*Dedicado a Desenvolvedores Júnior, Estagiários e Editores de Conteúdo da DFL Consignado.*

Este documento foi criado para ajudar você a realizar alterações pontuais de design, cor, links e conteúdo de forma segura e rápida sem quebrar a acessibilidade ou a estrutura do site.

---

## 📌 Sumário de Atalhos Rápidos
Se você precisa:
1. **Alterar as cores principais do site** ➜ Vá para [1. Como Mudar Cores e Temas](#1-como-mudar-cores-e-temas-em-indexcss)
2. **Atualizar telefones, links e e-mails** ➜ Vá para [2. Como Alterar Contatos](#2-como-atualizar-links-e-contatos-em-generaljson)
3. **Adicionar novos textos e títulos** ➜ Vá para [3. Como Adicionar Conteúdo de Forma Acessível](#3-como-adicionar-novos-conteúdos-mantendo-hierarquias-de-títulos)
4. **Validar antes de publicar** ➜ Vá para [4. Checklist de Manutenção](#4-checklist-de-manutenção-rápida)

---

## 1. Como Mudar Cores e Temas em `index.css`

Todas as cores do site estão centralizadas no início do arquivo `/src/index.css` dentro do bloco `@theme`. Nós utilizamos as variáveis do Tailwind CSS v4 para garantir harmonia visual e facilidade de manutenção.

### 🎨 Onde alterar as cores no código:
Abra `/src/index.css` e localize a regra `@theme` (linhas 5-20):

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
  
  /* ---- CORES PRINCIPAIS DA MARCA (EDITAR AQUI) ---- */
  --color-brand-purple: #4C2A7A;         /* Roxo Real Principal */
  --color-brand-purple-light: #6B4A9E;   /* Roxo Mais Claro */
  --color-brand-gold: #C9A14A;           /* Ouro Dourado */
  --color-brand-gold-accent: #E8C670;    /* Dourado Claro */
  --color-brand-bg: #F8F6F2;             /* Fundo Creme Premium */
  --color-brand-card: #FFFFFF;           /* Cor padrão de cartões */
  --color-brand-dark: #120822;           /* Roxo Ultra Escuro (Quase Preto) */
  --color-brand-gray: #3B3545;           /* Grafite de Leitura */
}
```

### 💡 Exemplo Prático de Alteração:
Se a empresa decidir mudar o tom de **Dourado** de um tom mais queimado (`#C9A14A`) para um amarelo-mostarda vibrante (`#FFCC00`), altere apenas as linhas correspondentes:

```diff
-  --color-brand-gold: #C9A14A;
+  --color-brand-gold: #FFCC00; /* Novo Dourado DFL */
```
*Toda a interface, botões, bordas e ícones que referenciam `bg-brand-gold` ou `text-brand-gold` assumirão o novo tom imediatamente de forma automática!*

---

## 2. Como Atualizar Links e Contatos em `general.json`

Para evitar que você tenha que procurar números de telefone espalhados por dezenas de arquivos, todos os dados dinâmicos de atendimento estão centralizados no arquivo `/src/content/general.json`.

O arquivo `/src/data.ts` consome esses dados e os expõe globalmente por meio do objeto `GENERAL`.

### 📞 Onde alterar os contatos no código:
Abra `/src/content/general.json` e altere os campos do cabeçalho (linhas 3-5):

```json
{
  "brandName": "DFL CONSIGNADO",
  "phone": "(11) 93455-4478",
  "phoneRaw": "5511934554478",
  "email": "contato@dflemprestimos.com.br",
  ...
}
```

### 💡 Guia de Campos:
* **`phone`**: É o texto formatado amigável que aparece na barra do topo, no header e nos rodapés.
  * *Exemplo:* `(11) 99999-8888`
* **`phoneRaw`**: É o número puro (apenas dígitos) que o navegador usa para abrir o link do WhatsApp (`https://wa.me/...`). **Não insira espaços, parênteses ou traços aqui.** Deve incluir o código do país (`55`) e o DDD.
  * *Exemplo:* `5511999998888`
* **`email`**: O endereço de contato institucional.
  * *Exemplo:* `suporte@dflemprestimos.com.br`

---

## 3. Como Adicionar Novos Conteúdos Mantendo Hierarquias de Títulos

A acessibilidade exige que os leitores de tela entendam a estrutura do site lógica e sequencialmente. Isso significa que você nunca deve pular níveis de títulos para fins estéticos (por exemplo, usar um `<h3>` antes de um `<h2>`).

### 📐 Regra de Ouro da Estrutura Visual acessível:

```text
▲ [Topo da Página]
│
├── <h1> Título Principal (Apenas 1 por página - No caso do site, o Hero em App.tsx)
│
├── <h2> Títulos de Grandes Seções (Por que DFL, Simulador, Contato, etc.)
│   ├── <h3> Subtítulos dentro de Seções (ex: Perguntas Específicas do FAQ)
│   │   └── <h4> Seções internas (ex: Detalhes Técnicos)
│   └── <h3> Outro Subtítulo de Apoio
│
└── <footer> Rodapé com informações de licenciamento
```

### ❌ Erro Comum a Ser Evitado:
```html
<!-- NÃO FAÇA ISSO! Pular de h2 para h4 apenas por ser menor -->
<h2>Por que a DFL é segura?</h2>
<h4>Nós atuamos sob as regras do Banco Central</h4> <!-- ERRADO -->
```

### ✅ Correção Recomendada:
```html
<!-- CORRETO: Siga a ordem matemática natural -->
<h2>Por que a DFL é segura?</h2>
<h3>Nós atuamos sob as regras do Banco Central</h3> <!-- CORRETO -->
```

### Como formatar textos novos usando Tailwind CSS:
Se você deseja que um título `<h3>` pareça menor ou mude de cor, **use classes do Tailwind** para alterar seu tamanho, e não mude a tag HTML!
* Para um visual preto em negrito: `font-extrabold text-brand-dark`
* Para aumentar tamanho de fonte: `text-lg` ou `text-xl` ou `text-2xl`
* Para alterar a fonte para elegante (Serifada): `font-serif`

---

## 4. Checklist de Manutenção Rápida 📝

Toda vez que fizer alguma alteração no design ou no conteúdo, execute estas verificações rápidas:

* [ ] **Cores**: A cor nova tem bom constraste com o fundo? (O texto cinza ou branco deve ser perfeitamente legível sobre o fundo).
* [ ] **Links**: O número de WhatsApp foi alterado também no `phoneRaw` com o formato `55...` corrreto?
* [ ] **Hierarquia**: Se você criou uma seção nova na página, ela começa com a tag `<h2>`?
* [ ] **Ícones**: Todos os ícones adicionados de forma manual estão envoltos por um container `<span role="img" aria-label="...">` descritivo?
* [ ] **Toque**: Botões e formulários mantêm o atributo `min-h-[48px]` para fácil clique em celulares?
* [ ] **Código**: Após alterar os arquivos, execute o build do projeto para verificar se não há erros de sintaxe digitados incorretamente:
  ```bash
  npm run lint
  # e depois
  npm run build
  ```
