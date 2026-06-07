# 📝 Pasta de Conteúdos da DFL Consignado

Esta pasta foi criada especialmente para que **qualquer pessoa possa alterar os textos, depoimentos, dúvidas frequentes (FAQ) ou bancos parceiros e serviços** do site de forma extremamente simples, rápida e segura, sem o risco de quebrar o código visual da página!

Cada arquivo corresponde a uma seção específica do site. Basta abrir o arquivo correspondente e modificar o texto ou valores dentro de cada bloco.

---

## 📂 Guia de Arquivos

Aqui está o que cada arquivo controla:

| Nome do Arquivo | Seção do Site que Ele Altera | O que você pode mudar |
| :--- | :--- | :--- |
| **`benefitTypes.ts`** | Simulador de Crédito | Opções de benefícios (INSS, Servidor, FGTS), prazos máximos e taxas de juros padrão. |
| **`coreBenefits.ts`** | Nossos Diferenciais | Título e descrição dos motivos para escolher a DFL (ex: Segurança, Dinheiro Rápido). |
| **`services.ts`** | Nossos Serviços | Os cards de serviços oferecidos com seus respectivos ícones e resumos de ofertas. |
| **`workflow.ts`** | Passo a Passo (Como Funciona) | Título de cada etapa (01 a 04) para a liberação do empréstimo de forma digital. |
| **`testimonials.ts`** | Depoimentos de Clientes | Nome, idade, profissão, cidade, avaliação (estrelas) e relato de satisfação dos clientes. |
| **`partners.ts`** | Logos dos Bancos Parceiros | Bancos integrados oficializados pela DFL (Caixa, BB, Itaú, Bradesco, etc). |
| **`faqs.ts`** | Perguntas Frequentes | Dúvidas dos usuários com perguntas e respostas diretas sobre taxas, segurança e portabilidade. |

---

## 🛠️ Como Editar um Texto?

### Exemplo: Alterando uma pergunta frequente (`faqs.ts`)

Se você quiser alterar a pergunta **"Quem pode fazer empréstimo consignado?"**, abra o arquivo `src/content/faqs.ts`:

```typescript
// Antes da edição:
{
  id: "faq-1",
  question: "Quem pode fazer empréstimo consignado?",
  answer: "Aposentados e pensionistas do INSS..."
}

// Depois que você alterar o texto:
{
  id: "faq-1",
  question: "Quais perfis a DFL atende para consignado?",
  answer: "Nós atendemos de forma prioritária aposentados e pensionistas do INSS..."
}
```

Apenas mantenha as aspas (`"`) abertas e fechadas ao redor de seus textos e a vírgula ao final de cada linha! O site será atualizado automaticamente com o novo texto de forma linda.

---

💡 *Dica:* Se você precisar redefinir os ícones que aparecem nos benefícios ou serviços, use nomes válidos da biblioteca **Lucide React** (ex: `ShieldCheck`, `Zap`, `TrendingDown`, `HeartHandshake`, `Users`, `Briefcase`, `ArrowRightLeft`, `RefreshCw`, `Coins`).
