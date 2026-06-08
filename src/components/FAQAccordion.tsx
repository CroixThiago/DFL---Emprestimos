import { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";

/**
 * ============================================================================
 * GUIA DE MANUTENÇÃO DAS PERGUNTAS FREQUENTES (Dedicado a Estagiários e Junior Devs)
 * ============================================================================
 * Olá! Este componente controla a seção de Perguntas Frequentes (FAQ).
 * 
 * 1. COMO ADICIONAR OU EDITAR DÚVIDAS DO SITE?
 *    As perguntas e respostas não ficam escritas diretamente aqui para manter o código limpo.
 *    Elas estão centralizadas no arquivo `/src/data.ts` sob a constante `FAQS`.
 *    Vá até lá, adicione seu objeto contendo { id: "faq-X", question: "Sua Pergunta", answer: "Sua Resposta" } e pronto!
 * 
 * 2. COMPORTAMENTO DE SELEÇÃO:
 *    - O estado `openId` guarda qual FAQ está visível no momento (por padrão começa com o ID "faq-1" aberto).
 *    - Ao clicar em outra dúvida, a anterior fecha automaticamente, melhorando a escaneabilidade.
 * 
 * 3. ACESSIBILIDADE WCAG EM ACORDEÕES:
 *    - Cada item possui um botão `<button>` nativo com `aria-expanded` para informar leitores de tela se o painel está aberto.
 *    - Vinculamos o gatilho com o texto usando `aria-controls` e `id` correspondente nos painéis HTML.
 * ============================================================================
 */

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div 
      className="w-full max-w-3xl mx-auto flex flex-col gap-3.5 text-left" 
      role="presentation"
    >
      {FAQS.map((faq) => {
        const isOpen = openId === faq.id;
        const panelId = `faq-panel-${faq.id}`;
        const buttonId = `faq-btn-${faq.id}`;

        return (
          <div
            key={faq.id}
            className={`border rounded-xl transition-all duration-300 ${
              isOpen
                ? "border-brand-purple dark:border-brand-gold-accent bg-brand-card shadow-sm"
                : "border-brand-border bg-brand-card hover:bg-brand-card-hover"
            }`}
          >
            <button
              id={buttonId}
              onClick={() => toggleFaq(faq.id)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-extrabold text-brand-dark cursor-pointer select-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple rounded-xl min-h-[44px]"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <div className="flex items-center gap-3">
                <HelpCircle
                  size={18}
                  className={`shrink-0 ${isOpen ? "text-brand-purple dark:text-brand-gold-accent" : "text-brand-gray dark:text-stone-300"}`}
                  aria-hidden="true"
                />
                <span className="font-serif text-[15px] sm:text-base leading-tight md:leading-normal">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-brand-purple dark:text-brand-gold-accent shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-72 border-t border-brand-border" : "max-h-0"
              }`}
              aria-hidden={!isOpen}
            >
              <div className="px-5 py-4 text-brand-gray text-sm leading-relaxed sm:text-[15px] font-medium">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
