# 🛠️ Guia de Manutenção Completo (Dedicado a Estagiários e Devs Juniors)

Seja muito bem-vindo ao projeto da **DFL Consignado**! Este documento foi escrito pensando em você, de forma didática, direta e simples, para que você possa entender a estrutura do site e realizar alterações cotidianas (como atualizar taxas, telefones, links do WhatsApp, logotipos ou cores) com 100% de segurança e sem medo de quebrar nada!

---

## 📂 Visão Geral da Arquitetura do Site
Esta é uma aplicação construída em **React + TypeScript + Vite**. O site é estático (não necessita de banco de dados do lado do servidor), o que facilita muito o hospedagem e o desenvolvimento.

Tudo é modular: as telas estão divididas em **Componentes** (pequenas partes reutilizáveis como `Header`, `SimulateForm`, etc.), mantendo o código limpo e organizado.

---

## 💸 1. Onde Alterar Taxas de Juros e Perfis

Se a taxaSelic subir ou descer e você precisar reajustar as taxas dos perfis (INSS, Servidor, Portabilidade, FGTS) que aparecem sob o simulador:

*   **Onde alterar**: Abra o arquivo `/src/data.ts`.
*   **O que procurar**: Você encontrará uma constante chamada `BENEFIT_TYPES`. Cada item representa um perfil de convênio com dados como:
    *   `minRate`: A taxa de juros nominal mínima calculada ao mês (ex: `1.66`).
    *   `maxMonths`: O prazo máximo de amortização permitido (ex: `84` ou `96`).
*   **Como atualizar**: Basta alterar o valor numérico puro. O simulador reajustará os cálculos de parcelas em tempo real baseado no novo valor.

```typescript
// Exemplo no arquivo /src/data.ts:
{
  id: "inss",
  title: "Aposentados & Pensionistas INSS",
  minRate: 1.66, // <-- Mude a taxa nominal aqui!
  maxMonths: 84,
  ...
}
```

---

## 📱 2. Onde Atualizar WhatsApp, Telefones e URLs

Para alterar os canais oficiais de atendimento, atualizar o número do WhatsApp com novas contas DDD, ou alterar o link Wa.me do site:

1.  **WhatsApp do Link Principal / Toast / Floating Button**:
    *   **Onde alterar**: Vá no arquivo `/src/App.tsx`.
    *   **O que procurar**: Procure pelo método `handleWhatsappDirect` ou pelo número `5511934554478` em links de âncora `<a>`.
    *   **Como atualizar**: Modifique tanto o número do celular com DDD, quanto as strings de texto das mensagens automáticas de boas-vindas do WhatsApp.

2.  **Telefone exibido no Cabeçalho (Header)**:
    *   **Onde alterar**: Abra `/src/components/Header.tsx`.
    *   **O que procurar**: Procure pelo texto `(11) 93455-4478` e o correspondente link `wa.me/5511934554478`.
    *   **Como atualizar**: Edite o texto visível ao usuário e o número no link `href` que inicia o aplicativo de chat seguro.

3.  **Telefone exibido no Rodapé (Footer)**:
    *   **Onde alterar**: Abra `/src/App.tsx` e vá até a seção do rodapé (tag `<footer>`).
    *   **O que procurar**: Procure pelo bloco "Fale Conosco" em conformidade com o número institucional.

---

## 🎨 3. Como Trocar ou Adicionar Ícones SVG

O site utiliza **Lucide Icons** combinados com o componente centralizado `AssetIcon` para renderização acessível.

*   **Onde alterar**:
    *   As regras de entrega estão em `/src/components/AssetFactory.tsx`.
    *   O catálogo de ícones padrão está em `/src/assets/manifest.ts`.

### Se quiser usar um ícone padrão do repositório Lucide (Recomendado):
Basta alterar a prop `name` passada para o `AssetIcon` no componente que você estiver editando. O componente resolverá e injetará o ícone automaticamente como um SVG inline com suporte automático a cores adaptativas.

*Exemplo*:
```tsx
// Se quiser mudar um ícone do card de "Coins" para "Lock":
<AssetIcon name="Lock" size={24} />
```

### Por que os ícones antes sumiam e agora estão funcionando?
Anteriormente, o sistema utilizava máscaras CSS (`mask-image` com caminhos de arquivo separados). O que impedia de carregar em navegadores que bloqueavam requisições de origem cruzada de SVG locais. O novo componente renderiza os ícones inlined direto na árvore do DOM. Isso significa que eles funcionam de forma independente de rede (Offline First) e herdam perfeitamente a propriedade `currentColor` do CSS sob o Tema de Alto Contraste (W3C/WCAG AAA).

---

## 🖼️ 4. Onde Alterar Logotipos e Logomarcas

*   **Onde alterar**: Abra `/src/assets/manifest.ts`.
*   **O que procurar**: A constante `ASSET_MANIFEST`.
*   **Como atualizar**:
    *   Adicione o arquivo SVG do novo logo na pasta `/src/assets/images/`.
    *   Importe-o no cabeçalho do `manifest.ts` e associe-o à propriedade `logo`.
    *   O cabeçalho e o rodapé serão atualizados ao mesmo tempo de forma unificada!

---

## ♿ 5. Regras Importantes de Acessibilidade (Não cometa estes erros!)

Nosso site é considerado **Classe Premium de Acessibilidade (Acessível por Padrão)**. Quando você estiver atualizando qualquer botão ou de imagem, siga estas 3 regras de ouro para não violar as normas WCAG 2.1 AAA:

1.  **Sempre mantenha a tag `alt` nas imagens**:
    Nenhuma imagem (`<img>`) pode ficar sem o atributo `alt`. Se for uma imagem meramente decorativa, use `alt=""`. Se for o logotipo, use `alt="DFL Consignado"`.

2.  **Nunca retire o `aria-label` de botões de ícone**:
    Um botão ou de link do WhatsApp que contém somente um ícone (sem texto plano) é invisível para leitores de tela de pessoas cegas. Sempre use `aria-label="Falar com suporte pelo WhatsApp"` para que o robô do leitor possa ler em áudio para o usuário.

3.  **Use classes estruturadas de Contraste (`dark:`)**:
    Se você introduzir um texto ou cor de fundo customizado, certifique-se de validar se o contraste entre a letra e o fundo atende ao mínimo de 4.5:1. Quando o usuário ativa as classes `.dark` ou `.high-contrast-mode`, utilize cores que permitam leitura total das taxas bancárias.

---

### 🚀 Recapitulando o Fluxo de Trabalho de Alterações

1.  Edite os arquivos correspondentes seguindo este manual.
2.  Teste rodando o comando local: `npm run dev`.
3.  Abra o site, faça os testes visuais e ative a barra de acessibilidade (Alt+C) para ver se as novas cores e fontes estão perfeitamente ajustadas.
4.  Gere a versão final com `npm run build`.
5.  Upe a pasta `dist/` para o servidor ou Vercel!

Bom desenvolvimento! Se tiver dúvidas, verifique os JSDocs explicativos no cabeçalho dos próprios componentes da aplicação. 🚀
