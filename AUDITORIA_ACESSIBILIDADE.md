# Guia de Auditoria de Acessibilidade (WCAG AAA) 🔍
*Diretrizes de Teste Manual e Ferramental para os Desenvolvedores da DFL Consignado.*

Este documento serve como um checklist definitivo de conformidade para garantir que o portal da DFL Consignado seja 100% amigável para pessoas com deficiência visual (cegos, baixa visão, daltonismo), auditiva, motora ou cognitiva, atingindo o padrão ouro **WCAG AAA**.

---

## 📌 Sumário
1. [Checklist Geral WCAG AAA](#1-checklist-de-verificao-wcag-aaa)
2. [Teste Manual por Teclado](#2-teste-de-navegao-por-teclado)
3. [Guia de Leitores de Tela (NVDA / JAWS)](#3-guia-de-teste-com-leitores-de-tela)
4. [Como Simular Daltonismo e Alto Contraste no Navegador](#4-uso-das-ferramentas-de-desenvolvedor-dev-tools)
5. [Ferramentas de Auditoria Recomendadas](#5-ferramentas-de-auditoria-automatizada)

---

## 1. Checklist de Verificação WCAG AAA

Para cada alteração ou nova funcionalidade inserida, garanta o cumprimento de cada item abaixo:

| Item | Requisito WCAG AAA | Descrição e Ação |
| :--- | :--- | :--- |
| **1.1** | **Contraste Mínimo 7:1** | Textos grandes devem ter contraste de 4.5:1. Textos comuns devem ter contraste de **pelo menos 7:1** contra o fundo. |
| **1.2** | **Aria-Label em Ícones** | Todos os links e botões que possuem apenas ícones visuais (sem texto visível) devem possuir um `aria-label` descritivo. |
| **1.3** | **Tamanho do Toque (48px)** | Todas as áreas interativas tocáveis (botões, links de navegação, checkboxes) devem possuir no mínimo **48x48px** de largura e altura. |
| **1.4** | **Foco Visível (Teclado)** | É expressamente proibido remover a borda de foco (`outline: none` sem alternativa). O indicador de foco (`*:focus-visible`) deve ser grosso e perfeitamente perceptível. |
| **1.5** | **Skip Links (Pular Menu)** | Pessoas utilizando teclado devem ser capazes de saltar o header do site e ir direto ao conteúdo com um atalho na primeira tabulação (Skip Link). |
| **1.6** | **Sem Autoplay de Som** | O site não pode tocar áudios ou vídeos em segundo plano sem que haja o consentimento e clique explícito do usuário. |

---

## 2. Teste de Navegação por Teclado

Muitos usuários com dificuldades motoras ou cegos navegam na internet sem o uso de mouse. Faça este teste manual em toda página modificada:

### Como Testar:
1. Feche o mouse e use apenas as teclas **Tab** (avançar) e **Shift + Tab** (retroceder).
2. Tente preencher e enviar o formulário de simulação apenas usando o teclado.

### O que validar durante o teste:
- [ ] Aparece o botão invisível `"Pular para o Simulador de Crédito"` logo ao teclar a primeira vez a tecla **Tab**?
- [ ] O indicador de foco se movimenta de cima para baixo de forma lógica na ordem visual da tela?
- [ ] O foco nunca entra em um "beco sem saída" (Foco some ou fica preso dentro de um elemento invisível)?
- [ ] É possível abrir o menu hambúrguer móvel apertando a tecla **Enter** ou **Espaço** sobre ele?
- [ ] É possível fechar o menu hambúrguer clicando em **Esc** ou navegando com a tecla **Tab** até o botão de fechar?

---

## 3. Guia de Teste com Leitores de Tela

A melhor forma de auditar a acessibilidade semântica de um código é utilizando leitores de tela reais.

### 🌐 Ferramenta para Windows: **NVDA** (Gratuito / Open Source)
### 🌐 Ferramenta para macOS: **VoiceOver** (Nativo / Já Instalado)

---

### ⌨️ Tabela de Atalhos para Teste Rápido de Leitores

Use esta lista de atalhos em seu teclado físico para simular a navegação de um deficiente visual no Windows com o **NVDA**:

| Tecla de Atalho | Descrição do Comando | O que isso ajuda a Auditores a Verificar? |
| :--- | :---: | :--- |
| **Insert + N** | Abre o menu do NVDA | Configurar detalhes rápidos do leitor de tela. |
| **Ctrl** | Silencia a voz temporariamente | Cortar falas longas enquanto testa. |
| **Down Arrow ⬇️**| Lê a próxima linha descritiva | Verificar se o conteúdo estático do site está sendo lido na ordem correta da leitura humana. |
| **H** | Pula para o próximo título | Verifica se os títulos (`<h1>`, `<h2>`, `<h3>`) estão semanticamente hierárquicos. |
| **F** | Pula para o próximo campo de formulário | Verifica se cada input de dados possui uma tag `<label>` ou `aria-label` associada. |
| **B** | Pula para o próximo botão | Garante que botões foram catalogados como `<button>` (e não como `<div>` sem acessibilidade). |
| **Insert + F7** | Lista de Elementos | Abre uma janela flutuante compilando todos os links, botões e títulos contidos na página para auditar se fazem sentido de forma isolada (ex: se existe links genéricos do tipo "Clique Aqui"). |

---

## 4. Uso das Ferramentas de Desenvolvedor (DevTools)

O Google Chrome e o Microsoft Edge possuem utilitários espetaculares nativos em suas ferramentas para simulação de condições especiais de visão.

### 👓 Como Simular Daltonismo (Protanopia, Deuteranopia, Tritanopia):
1. No seu site, abra as Ferramentas do Desenvolvedor apertando a tecla **F12** ou clicando em `Inspecionar`.
2. Abra o menu de comandos rápidos digitando: `Ctrl + Shift + P` (no Windows) ou `Cmd + Shift + P` (no macOS).
3. Digite a palavra **Rendering** (ou Renderização) e selecione a opção `"Show Rendering"`.
4. Role o novo painel inferior que se abrirá até a seção **Emular deficiências visuais** (Emulate vision deficiencies).
5. Selecione as diferentes deficiências na cortina para atestar se as cores do simulador e badges mantêm boa identificação visual sob todas as formas de daltonismo:
   - **Protanopia**: Ausência de receptores de cor vermelha.
   - **Deuteranopia**: Ausência de receptores de cor verde.
   - **Achromatopsia**: Visão em tons de cinza puro.

---

### ☯️ Como Forçar a Simulação de Alto Contraste (High Contrast):
Sob o mesmo painel de renderização (Rendering) descrito no item anterior:
1. Encontre o campo **Emulate CSS media feature forced-colors** (Emular preferências de cores forçadas).
2. Selecione a opção **forced-colors: active**.
3. O navegador forçará o carregamento no modo de alto contraste do sistema operacional. Certifique-se de que nenhum texto foi cortado (Double Text/Overlap) e que as cores amarela e preta do nosso arquivo `index.css` foram aplicadas com sucesso e com nitidez cristalina!

---

## 5. Ferramentas de Auditoria Automatizada

Sempre execute uma varredura automatizada antes de enviar seu código para homologação:

1. **Lighthouse (Interno do Chrome):**
   - Com o DevTools aberto, clique na aba **Lighthouse**.
   - Defina a categoria de auditoria para **Acessibilidade** (Acessibility).
   - Clique em **Gerar Relatório**.
   - A pontuação final de acessibilidade deve ser mantida em **100/100** verde!

2. **Extensão Axe DevTools (Recomendado):**
   - Instale a extensão oficial do Axe DevTools em seu navegador de desenvolvimento.
   - Ela ajudará você a capturar erros sutis de hierarquia e aninhamentos ARIA que o Lighthouse básico pode pular.
