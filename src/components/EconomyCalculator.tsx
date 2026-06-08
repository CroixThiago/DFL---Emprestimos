import React, { useState, useEffect } from "react";
import { TrendingDown, Sparkles, Receipt, ArrowRight, HelpCircle } from "lucide-react";

/**
 * ============================================================================
 * GUIA DE MANUTENÇÃO DA CALCULADORA DE ECONOMIA (Dedicado a Estagiários e Junior Devs)
 * ============================================================================
 * Olá, DEV! Essa calculadora mostra ao usuário a diferença de juros entre uma dívida atual
 * de cartão/cheque especial e um consignado na DFL Consignado.
 * 
 * 1. ONDE ESTÃO AS TAXAS DE JUROS COMPARATIVAS?
 *    Os valores estão definidos no array `DEBT_TYPES` logo abaixo. Elas representam a média
 *    estimada do mercado. Se você precisar atualizar essas taxas recomendadas pelo Banco Central,
 *    basta atualizar os valores no atributo `averageRate`.
 * 
 * 2. COMO FUNCIONA O CÁLCULO DE ECONOMIA?
 *    - Calculamos duas parcelas teóricas usando a fórmula Price internacional (PMT).
 *    - Comparamos o "Total Geral Pago ao fim de N meses" de ambas.
 *    - A diferença é a economia total mostrada no painel verde (`totalSaved`).
 * 
 * 3. ACESSIBILIDADE WCAG / ARIA:
 *    - Inputs de tipo slider (`range`) possuem rótulos (labels) lincados via IDs, facilitando leitores de tela.
 *    - Todos os ícones decorativos usam `aria-hidden="true"` para evitar poluição auditiva nas ferramentas para cegos.
 * ============================================================================
 */

interface DebtType {
  id: string;
  name: string;
  averageRate: number; // monthly percentage
}

const DEBT_TYPES: DebtType[] = [
  { id: "credit_card", name: "Dívida de Cartão de Crédito Rotativo", averageRate: 14.2 },
  { id: "overdraft", name: "Limite Especial / Cheque Especial", averageRate: 8.5 },
  { id: "personal_loan", name: "Empréstimo Pessoal Convencional", averageRate: 6.8 }
];

export default function EconomyCalculator() {
  const [selectedDebtId, setSelectedDebtId] = useState("credit_card");
  const [debtValue, setDebtValue] = useState(15000);
  const [months, setMonths] = useState(24);
  
  const [currentInstallment, setCurrentInstallment] = useState(0);
  const [consignadoInstallment, setConsignadoInstallment] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [consignadoRate] = useState(1.66); // Average DFL rate

  useEffect(() => {
    const currentRate = DEBT_TYPES.find(d => d.id === selectedDebtId)?.averageRate || 6.5;
    
    // Formula standard PMT: (P * r) / (1 - (1 + r)^-n)
    const calculatePMT = (principal: number, monthlyRatePercent: number, termInMonths: number) => {
      const r = monthlyRatePercent / 100;
      if (r === 0) return principal / termInMonths;
      return (principal * r) / (1 - Math.pow(1 + r, -termInMonths));
    };

    const pmtCurrent = calculatePMT(debtValue, currentRate, months);
    const pmtConsignado = calculatePMT(debtValue, consignadoRate, months);

    setCurrentInstallment(parseFloat(pmtCurrent.toFixed(2)));
    setConsignadoInstallment(parseFloat(pmtConsignado.toFixed(2)));

    const totalCurrentPaid = pmtCurrent * months;
    const totalConsignadoPaid = pmtConsignado * months;
    const savings = Math.max(0, totalCurrentPaid - totalConsignadoPaid);
    
    setTotalSaved(parseFloat(savings.toFixed(2)));
  }, [selectedDebtId, debtValue, months, consignadoRate]);

  const handleScrollToSimulate = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("simulation-box");
    if (element) {
      // Set value dynamically to the simulation box for realistic interaction
      const simAmountSlider = document.querySelector('input[type="range"]') as HTMLInputElement;
      if (simAmountSlider) {
        simAmountSlider.value = debtValue.toString();
        // Trigger synthetic updates
        const event = new Event('input', { bubbles: true });
        simAmountSlider.dispatchEvent(event);
      }
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  };

  const selectedDebt = DEBT_TYPES.find(d => d.id === selectedDebtId) || DEBT_TYPES[0];

  return (
    <section 
      className="py-12 md:py-20 bg-brand-bg px-4 md:px-8 border-b border-brand-border" 
      id="calculadora"
      aria-labelledby="calc-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/5 dark:bg-white/5 border border-brand-border-purple/30 dark:border-white/10 mb-4">
            <TrendingDown className="text-brand-purple dark:text-brand-gold-accent" size={16} aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-widest text-[#4C2A7A] dark:text-brand-gold-accent">
              Projeção de Economia Inteligente
            </span>
          </div>
          <h2 id="calc-title" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            Veja o quanto você Poupa com a DFL
          </h2>
          <p className="text-brand-gray text-base mt-4 font-semibold max-w-2xl mx-auto leading-relaxed">
            Trocar suas dívidas de rotativos, cartões ou juros comuns pelo empréstimo consignado DFL reduz drasticamente o valor total pago. Compare e descubra a sua economia real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Controls Form Grid */}
          <div className="lg:col-span-6 bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm" role="region" aria-labelledby="calc-data-title">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-brand-border">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Receipt size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 id="calc-data-title" className="font-serif text-lg font-bold text-brand-dark">Sua Dívida Atual</h3>
                  <p className="text-xs text-brand-gray font-semibold">Simule a troca pelo consignado</p>
                </div>
              </div>

              {/* Debt Type Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple dark:text-brand-gold-accent">
                  Qual tipo de dívida você quer quitar?
                </span>
                <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Tipos de dívidas comuns de juros altos">
                  {DEBT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedDebtId(type.id)}
                      className={`py-3 px-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none min-h-[48px] ${
                        selectedDebtId === type.id
                          ? "border-brand-purple dark:border-brand-gold-accent bg-brand-purple/5 dark:bg-brand-gold-accent/15 text-brand-purple dark:text-brand-gold-accent font-black shadow-none ring-1 ring-brand-purple dark:ring-brand-gold-accent"
                          : "border-brand-border dark:border-white/10 bg-[#fff] dark:bg-white/5 text-brand-gray dark:text-stone-300 hover:bg-brand-bg dark:hover:bg-white/10 hover:text-brand-dark dark:hover:text-white"
                      }`}
                      aria-label={`${type.name}, juros médios estimados em ${type.averageRate}% ao mês`}
                      aria-checked={selectedDebtId === type.id}
                      role="radio"
                    >
                      <span className="font-bold">{type.name}</span>
                      <span className="text-[10px] sm:text-xs font-extrabold text-orange-600 px-2.5 py-0.5 rounded-full bg-orange-100 shrink-0 select-none">
                        ~{type.averageRate}% a.m.
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount slider */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="slider-calc-debt" className="text-xs font-extrabold uppercase tracking-wider text-brand-purple dark:text-brand-gold-accent">
                    Qual o valor total acumulado dessa dívida?
                  </label>
                  <span className="text-lg sm:text-xl font-serif font-black text-brand-purple dark:text-brand-gold-accent" aria-live="polite">
                    {formatBRL(debtValue)}
                  </span>
                </div>
                <input
                  type="range"
                  id="slider-calc-debt"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={debtValue}
                  onChange={(e) => setDebtValue(Number(e.target.value))}
                  className="w-full h-2 bg-brand-bg dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border dark:border-white/10"
                  aria-label="Ajustar valor da dívida atual"
                  aria-valuemin={2000}
                  aria-valuemax={100000}
                  aria-valuenow={debtValue}
                />
                <div className="flex justify-between text-[11px] text-brand-gray font-bold" aria-hidden="true">
                  <span>R$ 2.000</span>
                  <span>R$ 100.000</span>
                </div>
              </div>

              {/* Installment count */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="slider-calc-months" className="text-xs font-extrabold uppercase tracking-wider text-brand-purple dark:text-brand-gold-accent">
                    Em quantos meses pretende liquidar?
                  </label>
                  <span className="text-lg sm:text-xl font-serif font-black text-brand-dark" aria-live="polite">
                    {months} parcelas
                  </span>
                </div>
                <input
                  type="range"
                  id="slider-calc-months"
                  min="12"
                  max="84"
                  step="6"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-2 bg-brand-bg dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border dark:border-white/10"
                  aria-label="Ajustar quantidade de parcelas"
                  aria-valuemin={12}
                  aria-valuemax={84}
                  aria-valuenow={months}
                />
                <div className="flex justify-between text-[11px] text-brand-gray font-bold" aria-hidden="true">
                  <span>12 meses</span>
                  <span>84 meses</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-brand-border pt-4 text-[11px] text-brand-gray font-semibold" aria-hidden="true">
              *Pesquisa comparativa estimada do Banco Central do Brasil para taxas rotativas médias cobradas por bancos comerciais em 2026.
            </div>
          </div>

          {/* Results Comparison Card Visuals */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#120822] to-[#2D164B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-white shadow-xl relative overflow-hidden border border-white/10" aria-label="Visualização comparada do resultado">
            {/* Soft decorative visual assets */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-purple-light/20 blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 flex flex-col gap-6.5 w-full">
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-purple-light/35 flex items-center justify-center text-brand-gold">
                  <Sparkles size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">Projeção Comparativa</h3>
                  <p className="text-xs text-stone-300 font-bold">Abaixo taxas reais calculadas</p>
                </div>
              </div>

              {/* Dynamic comparative rows */}
              <div className="flex flex-col gap-4">
                {/* Traditional High Loan Row */}
                <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between" aria-live="polite">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-400">Parcela Média do Mercado</span>
                    <p className="text-xs font-bold text-stone-300 leading-snug">{selectedDebt.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-serif font-black text-rose-400">
                      {formatBRL(currentInstallment)}
                    </span>
                    <span className="block text-[10px] font-bold text-stone-400">/mês estim.</span>
                  </div>
                </div>

                {/* DFL Low Loan Row */}
                <div className="bg-[#4C2A7A]/30 border-2 border-[#E8C670]/40 p-4 rounded-xl flex items-center justify-between" aria-live="polite">
                  <div>
                    <span className="text-[10px] uppercase font-black text-brand-gold-accent">Parcela no Consignado DFL</span>
                    <p className="text-xs font-black text-stone-100 leading-snug">Taxa de apenas {consignadoRate}% a.m.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-serif font-black text-brand-gold-accent">
                      {formatBRL(consignadoInstallment)}
                    </span>
                    <span className="block text-[10px] font-bold text-stone-200">/mês reais</span>
                  </div>
                </div>
              </div>

              {/* Giant savings graphic panel */}
              <div className="bg-emerald-950/45 border border-emerald-500/25 p-5 rounded-2xl flex flex-col items-center justify-center text-center py-6 sm:py-8" aria-live="polite">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  💡 Economia Financeira Garantida
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-black text-emerald-300 animate-pulse leading-none mb-2">
                  {formatBRL(totalSaved)}
                </span>
                <p className="text-xs sm:text-sm text-stone-200 max-w-sm font-medium">
                  Deixará de ir para os juros bancários exorbitantes e ficará inteiramente no seu bolso!
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6">
              <a
                href="#simulation-box"
                onClick={handleScrollToSimulate}
                className="w-full py-4.5 bg-[#E8C670] hover:bg-[#D4A13A] text-[#120822] font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md transform active:scale-98 min-h-[44px]"
                aria-label={`Trocar dívida de ${formatBRL(debtValue)} e economizar ${formatBRL(totalSaved)}`}
              >
                <span>Quero Economizar Agora</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
