import React, { useState } from "react";
import { BENEFIT_TYPES } from "../data";
import { 
  Calculator, 
  ArrowRight, 
  TrendingDown, 
  Coins, 
  Sparkles, 
  Percent 
} from "lucide-react";

/**
 * ============================================================================
 * GUIA DE MANUTENÇÃO DA CALCULADORA INTERATIVA (Dedicado a Estagiários e Junior Devs)
 * ============================================================================
 * Olá, parceiro de desenvolvimento! Esse arquivo controla a Calculadora de CET e Taxa de Juros.
 * 
 * 1. O QUE ESTE COMPONENTE FAZ?
 *    Ele simula as taxas oficiais de vários bancos parceiros (Banco do Brasil, Caixa, Itaú, etc)
 *    para comparar as condições reais de juros nominais e Custo Efetivo Total (CET).
 * 
 * 2. ONDE MUDAR AS TAXAS E NOMES DOS BANCOS?
 *    Os dados estão na constante `BANK_PARTNERS_RATES` logo abaixo. Se você precisar
 *    ajustar a taxa ou adicionar um novo banco, basta adicionar/modificar os objetos desse array.
 * 
 * 3. COMO MUDAR OS TEXTOS DE INDICAÇÃO OU CORES?
 *    - Procure pelas tags de título (h3, h4) ou labels e edite suas strings livremente.
 *    - As cores são formadas usando classes do Tailwind (ex: text-brand-purple, bg-brand-gold).
 * 
 * 4. FÓRMULA DE CUSTO EFETIVO TOTAL (CET):
 *    - Juros Nominais: A taxa base do convênio.
 *    - CET: Acrescentamos uma estimativa de taxas administrativas padrão (IOF + despesas).
 *      A taxa mensal estimada de CET é de (taxa_base + 0.12)% a.m.
 * ============================================================================
 */

interface BankingPartnerRate {
  bankName: string;
  inssRate: number;
  servidorRate: number;
  highlight?: boolean;
}

const BANK_PARTNERS_RATES: BankingPartnerRate[] = [
  { bankName: "Banco do Brasil Consignado", inssRate: 1.68, servidorRate: 1.50, highlight: true },
  { bankName: "Caixa Federal", inssRate: 1.66, servidorRate: 1.52 },
  { bankName: "Itaú Consignado", inssRate: 1.72, servidorRate: 1.58 },
  { bankName: "Banco BMG", inssRate: 1.74, servidorRate: 1.62 },
  { bankName: "Bradesco Promotora", inssRate: 1.70, servidorRate: 1.55 }
];

export default function InteractiveCalculator() {
  const [selectedType, setSelectedType] = useState<"inss" | "servidor">("inss");
  const [amount, setAmount] = useState<number>(25000);
  const [months, setMonths] = useState<number>(60);
  const [showInfoPopup, setShowInfoPopup] = useState<boolean>(false);

  // Math variables
  const activeRateInfo = BENEFIT_TYPES.find((b) => b.id === selectedType) || BENEFIT_TYPES[0];
  const nominalRate = activeRateInfo.minRate;

  // Estimation Formulas (CET includes basic IOF + administrative rate averages)
  const cetRateMonthly = nominalRate + 0.12; 
  const cetRateYearly = (Math.pow(1 + cetRateMonthly / 100, 12) - 1) * 100;

  // Monthly installments formula
  const r = nominalRate / 100;
  let installment = 0;
  if (r > 0) {
    installment = (amount * r) / (1 - Math.pow(1 + r, -months));
  } else {
    installment = amount / months;
  }

  const totalToPay = installment * months;

  // Average Personal Credit rate comparison (estimated 5.5% a.m. in traditional Brazilian personal loans)
  const personalCreditRate = 5.5 / 100;
  const personalInstallment = (amount * personalCreditRate) / (1 - Math.pow(1 + personalCreditRate, -months));
  const totalPersonalToPay = personalInstallment * months;
  const totalEstSavings = totalPersonalToPay - totalToPay;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  };

  const handleProceed = () => {
    const simBox = document.getElementById("simulation-box");
    if (simBox) {
      simBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="py-20 bg-brand-bg px-4 md:px-8 border-b border-brand-border relative overflow-hidden" id="calculadora">
      {/* Descrição em áudio oculta especial para Usuários de Visão Zero (Zero Vision First) */}
      <div className="sr-only" role="note">
        <h3>Acessibilidade da Calculadora Interativa</h3>
        <p>
          Este painel contém uma calculadora dinâmica de comparação financeira. 
          Ela possui duas barras deslizantes interativas: uma para configurar o Valor de Empréstimo Desejado (que varia de R$ 3.000 a R$ 120.000) 
          e outra para o Prazo de Pagamento em Meses (que varia de 12 a 96 parcelas).
          Conforme você altera estes valores, os resultados da Parcela Mensal Estimada, do Custo Efetivo Total (CET) e da taxa nominal de juros 
          são atualizados automaticamente de forma audível pelo seu leitor de tela.
        </p>
      </div>

      {/* Decorative gentle ambient glowing backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-purple-light/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-brand-gold/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block with contrast and elegance */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/5 dark:bg-white/5 border border-brand-border-purple dark:border-white/10 mb-4 animate-pulse">
            <Calculator className="text-brand-purple dark:text-brand-gold-accent" size={14} />
            <span className="text-xs font-bold text-brand-purple dark:text-brand-gold-accent uppercase tracking-widest font-sans">
              Simulador de Parcelas
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark mb-4 leading-tight">
            Simulador Avançado de Taxas & CET
          </h2>
          <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Compare estimativas reais e confira quais bancos oferecem as melhores taxas de juros para o seu perfil. Transparência completa sem pegadinhas.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Inputs & Controls */}
          <div className="lg:col-span-6 bg-brand-card border border-brand-border rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 justify-between shadow-xs">
            
            <div className="flex flex-col gap-6">
              {/* Profile selector toggle */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-extrabold uppercase tracking-widest text-brand-purple dark:text-brand-gold-accent">
                  Escolha o seu Conveniado / Perfil:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedType("inss")}
                    className={`py-3.5 px-4 text-center text-sm font-extrabold rounded-xl border transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
                      selectedType === "inss"
                        ? "border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/10"
                        : "border-brand-border bg-white dark:bg-[#120822] text-brand-gray hover:bg-brand-bg hover:text-brand-dark"
                    }`}
                    aria-label="Selecionar perfil de Beneficiário do INSS"
                  >
                    <Coins size={16} />
                    <span>Beneficiário INSS</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("servidor")}
                    className={`py-3.5 px-4 text-center text-sm font-extrabold rounded-xl border transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
                      selectedType === "servidor"
                        ? "border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/10"
                        : "border-brand-border bg-white dark:bg-[#120822] text-brand-gray hover:bg-brand-bg hover:text-brand-dark"
                    }`}
                    aria-label="Selecionar perfil de Servidor Público"
                  >
                    <Sparkles size={16} />
                    <span>Servidor Público</span>
                  </button>
                </div>
              </div>

              {/* Amount slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand-purple dark:text-brand-gold-accent">
                    Quanto deseja simular?
                  </span>
                  <span className="font-serif text-2xl font-black text-brand-dark">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="120000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  aria-label="Valor total sugerido para simulação do empréstimo"
                  className="w-full h-2 bg-brand-bg dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border dark:border-white/10"
                />
                <div className="flex justify-between items-center text-[11px] text-brand-gray font-bold uppercase">
                  <span>R$ 3.000</span>
                  <span>R$ 120.000</span>
                </div>
              </div>

              {/* Month slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand-purple dark:text-brand-gold-accent">
                    Prazo de pagamento:
                  </span>
                  <span className="font-serif text-xl font-extrabold text-brand-dark">
                    {months} parcelas mensais
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max={selectedType === "servidor" ? 96 : 84}
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  aria-label="Prazo total ou número de prestações mensais sugerido"
                  className="w-full h-2 bg-brand-bg dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border dark:border-white/10"
                />
                <div className="flex justify-between items-center text-[11px] text-brand-gray font-bold uppercase">
                  <span>12 Meses</span>
                  <span>Máx: {selectedType === "servidor" ? 96 : 84} Meses</span>
                </div>
              </div>
            </div>

            {/* Savings section card */}
            <div className="p-4 rounded-xl bg-brand-purple/5 dark:bg-white/5 border border-brand-border-purple dark:border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C9A14A]/10 border border-[#C9A14A]/20 flex items-center justify-center text-[#C9A14A] shrink-0">
                <TrendingDown size={22} />
              </div>
              <div className="text-left">
                <p className="text-xs text-brand-purple dark:text-brand-gold-accent uppercase tracking-wider font-extrabold">Economia Planejada</p>
                <p className="text-sm text-brand-gray leading-tight font-medium">
                  Economize até <strong className="text-brand-dark font-black">{formatCurrency(totalEstSavings)}</strong> de taxas em relação ao empréstimo pessoal comum!
                </p>
              </div>
            </div>

          </div>

          {/* Right panel: Real-time calculation and estimations results */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            
            {/* Rates calculation & CET Breakdown Card */}
            <div className="bg-brand-card border-2 border-brand-border rounded-2xl p-4 sm:p-6 md:p-8 shadow-xs flex flex-col gap-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h3 className="font-serif text-lg font-bold text-brand-dark">
                  Resultado da Estimativa
                </h3>
                <button 
                  type="button"
                  onClick={() => setShowInfoPopup(!showInfoPopup)}
                  className="p-1 px-2.5 text-[11px] bg-[#4C2A7A] hover:bg-[#120822] text-white rounded-md flex items-center gap-1.5 cursor-pointer uppercase font-bold tracking-widest transition-all duration-200 shadow-xs hover:scale-105 active:scale-95"
                >
                  <Percent size={12} />
                  O que é CET?
                </button>
              </div>

              {showInfoPopup && (
                <div className="p-4 rounded-lg bg-brand-bg dark:bg-[#1a0e30] border border-brand-border dark:border-white/10 text-xs text-brand-gray leading-relaxed animate-fade-in relative text-left">
                  <p>
                    <strong>Custo Efetivo Total (CET):</strong> É o custo real total que você paga pelo empréstimo. Ele engloba a taxa nominal de juros, o IOF (Imposto sobre Operações Financeiras) recolhido obrigatoriamente para o governo, além de pequenas taxas de administração dos bancos parceiros. Na DFL não há taxas escondidas!
                  </p>
                  <button 
                    onClick={() => setShowInfoPopup(false)} 
                    className="absolute top-2 right-2 text-brand-purple dark:text-[#E8C670] hover:text-red-500 font-bold text-sm cursor-pointer px-1"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Real-time calculated results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2 border-b border-brand-border text-left">
                
                {/* Result Block: Installment */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-brand-purple dark:text-brand-gold-accent uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                    Parcela Mensal Estimada
                  </span>
                  <span className="text-3xl font-serif font-black text-brand-purple dark:text-brand-gold-accent">
                    {formatCurrency(installment)}
                  </span>
                  <span className="text-xs text-brand-gray font-medium">
                    Desconto fixo na sua folha de pagamento
                  </span>
                </div>

                {/* Result Block: Total cost to pay */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-brand-purple dark:text-brand-gold-accent uppercase tracking-widest font-extrabold">
                    Custo Real Estimado (Total)
                  </span>
                  <span className="text-3xl font-serif font-black text-brand-dark">
                    {formatCurrency(totalToPay)}
                  </span>
                  <span className="text-xs text-brand-gray font-medium">
                    Líquido simulado mais taxas acumuladas
                  </span>
                </div>

              </div>

              {/* Live breakdown of Nominal Rate & Monthly/Yearly CET */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-brand-bg dark:bg-[#1a0e30] border border-brand-border dark:border-white/10 rounded-xl">
                  <span className="text-[9px] text-brand-gray block uppercase tracking-wider font-extrabold mb-1">
                    Taxa Nominal
                  </span>
                  <span className="font-mono text-base font-bold text-brand-purple dark:text-brand-gold-accent">
                    {nominalRate.toFixed(2)}% a.m.
                  </span>
                </div>

                <div className="p-3 bg-brand-bg dark:bg-[#1a0e30] border border-brand-border dark:border-white/10 rounded-xl">
                  <span className="text-[9px] text-brand-gray block uppercase tracking-wider font-extrabold mb-1">
                    CET Mensal
                  </span>
                  <span className="font-mono text-base font-bold text-brand-dark">
                    {cetRateMonthly.toFixed(2)}% a.m.
                  </span>
                </div>

                <div className="p-3 bg-brand-bg dark:bg-[#1a0e30] border border-brand-border dark:border-white/10 rounded-xl">
                  <span className="text-[9px] text-brand-gray block uppercase tracking-wider font-extrabold mb-1">
                    CET Anual Est.
                  </span>
                  <span className="font-mono text-base font-bold text-brand-dark">
                    {cetRateYearly.toFixed(2)}% a.a.
                  </span>
                </div>
              </div>

            </div>

            {/* Banks Rate comparison list */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-5 shadow-sm text-left">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-purple dark:text-brand-gold-accent mb-4">
                Principais Taxas Praticadas pelos Bancos
              </h4>
              <div className="flex flex-col gap-2">
                {BANK_PARTNERS_RATES.map((bank, index) => {
                  const targetRate = selectedType === "inss" ? bank.inssRate : bank.servidorRate;
                  const targetInstallment = (amount * (targetRate/100)) / (1 - Math.pow(1 + (targetRate/100), -months));

                  return (
                    <div 
                      key={index} 
                      className={`px-3.5 py-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 transition duration-300 ${
                        bank.highlight
                          ? "bg-brand-purple/5 dark:bg-brand-gold-accent/10 border-brand-purple dark:border-brand-gold-accent/35 text-brand-purple dark:text-brand-gold-accent font-semibold shadow-xs"
                          : "bg-brand-bg/50 dark:bg-white/5 border-brand-border dark:border-white/10 text-brand-gray dark:text-stone-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {bank.highlight && (
                          <span className="w-2 h-2 bg-brand-purple dark:bg-brand-gold-accent rounded-full animate-pulse shrink-0" />
                        )}
                        <span className="font-extrabold max-w-[200px] sm:max-w-none truncate">{bank.bankName}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono font-medium justify-between xs:justify-start">
                        <span>Taxa: <strong className="text-brand-dark">{targetRate.toFixed(2)}%</strong></span>
                        <div className="w-px h-3 bg-brand-border dark:bg-white/10 hidden xs:block" />
                        <span>Parc: <strong className="text-brand-dark">{formatCurrency(targetInstallment)}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulation button with outstanding AAA contrast */}
            <button
              onClick={handleProceed}
              className="w-full py-4.5 bg-brand-purple text-white hover:bg-brand-purple-light font-black tracking-widest uppercase text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3.5 cursor-pointer"
            >
              <span>Simular com estas taxas agora</span>
              <ArrowRight size={18} />
            </button> 

          </div>

        </div>

      </div>
    </section>
  );
}
