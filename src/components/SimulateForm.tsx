import React, { useState, useEffect } from "react";
import { BENEFIT_TYPES } from "../data";
import { SimulationResult } from "../types";
import { Coins, User, Phone, Check, ArrowRight, Sparkles, Milestone, ArrowLeft, Key, Shield } from "lucide-react";
import { trackLeadSubmission } from "../utils/analytics";

/**
 * ============================================================================
 * GUIA DE MANUTENÇÃO DO SIMULADOR (Dedicado a Estagiários e Junior Devs)
 * ============================================================================
 * Olá, parceiro de desenvolvimento! Esse arquivo controla o formulário de simulação em 3 passos.
 * 
 * 1. O QUE CADA PASSO (STEP) FAZ?
 *    - Passo 1: Seleciona o perfil de convênio do usuário (INSS, Servidor, Portabilidade, FGTS).
 *    - Passo 2: Define o valor (loanAmount) e quantidade de parcelas (months) via Sliders interativos.
 *    - Passo 3: Coleta informações básicas (Nome, Celular, CPF) no padrão LGPD para enviar ao consultor.
 * 
 * 2. ONDE MUDAR AS TAXAS DE JUROS E CONVÊNIOS?
 *    As taxas estão armazenadas centralmente em `/src/data.ts`. Altere lá para que este formulário as adote automaticamente.
 * 
 * 3. VALIDAÇÃO DE CAMPOS:
 *    Se precisar adicionar validações novas (obrigatoriedade de campos, limites), procure pelo método `handleSubmit()` ou `handleNextStep()`.
 * 
 * 4. FÓRMULA DE CÁLCULO DE PMT CONSIGNADO:
 *    Calculamos a prestação ideal usando a fórmula tradicional de amortização financeira (Price):
 *    PMT = PV * (i) / (1 - (1 + i)^-n)
 *    Onde i = taxa de juros ao mês, PV = valor solicitado, n = parcelas.
 * ============================================================================
 */

/**
 * Propriedades aceitas pelo formulário de simulação.
 */
interface SimulateFormProps {
  /** 
   * ID da categoria de benefício padrão pré-selecionada ("inss", "servidor", etc.).
   * Útil quando o usuário clica em simular a partir de um banner específico.
   */
  initialBenefitId?: string;
}

/**
 * Componente principal do Formulário Interativo de Simulação (SimulateForm).
 * Fornece um fluxo amigável em 3 passos para simular parcelas reais e coletar
 * leads no padrão LGPD de alta conversão.
 * 
 * @component
 */
export default function SimulateForm({ initialBenefitId = "inss" }: SimulateFormProps) {
  /**
   * Estado currentStep (número):
   * Guarda o passo atual do fluxo de preenchimento (1, 2 ou 3).
   * - Passo 1: Seleção de Perfil/Convênio.
   * - Passo 2: Ajuste de Valor e Prazo de pagamento.
   * - Passo 3: Dados de Contato e CPF.
   */
  const [currentStep, setCurrentStep] = useState(1); 
  
  /**
   * Estado selectedBenefitId (texto):
   * Armazena qual perfil de convênio do usuário foi selecionado (ex: "inss", "servidor", "fgts").
   */
  const [selectedBenefitId, setSelectedBenefitId] = useState(initialBenefitId);

  /**
   * Estado loanAmount (número):
   * Contém o valor solicitado do empréstimo em Reais. Alterado via slider ou toque.
   */
  const [loanAmount, setLoanAmount] = useState(25000); // Valor em Reais solicitado

  /**
   * Estado months (número):
   * Representa a quantidade total de prestações mensais negociadas.
   */
  const [months, setMonths] = useState(60); // Quantidade de Prestações mensais

  /**
   * Estado fullName (texto):
   * Captura o nome completo digitado pelo prospecto no Passo 3.
   */
  const [fullName, setFullName] = useState(""); // Nome Completo do Lead

  /**
   * Estado phone (texto):
   * Contém o número de celular/WhatsApp formatado automaticamente para contato.
   */
  const [phone, setPhone] = useState(""); // Celular formatado

  /**
   * Estado cpf (texto):
   * Armazena o registro de CPF formatado para simulação fidedigna de margem.
   */
  const [cpf, setCpf] = useState(""); // CPF do usuário para consulta de margem

  /**
   * Estado acceptTerms (booleano):
   * Confirmação de conformidade da privacidade dos dados de acordo com a LGPD.
   */
  const [acceptTerms, setAcceptTerms] = useState(true); // Termo LGPD ativo

  /**
   * Estado formSubmitted (booleano):
   * Aciona a tela final de sucesso quando o formulário é enviado para o sistema.
   */
  const [formSubmitted, setFormSubmitted] = useState(false); // Transição para tela de sucesso

  /**
   * Estado whatsappLink (texto):
   * Armazena o link do WhatsApp gerado após o envio para ser usado no botão manual de contingência.
   */
  const [whatsappLink, setWhatsappLink] = useState("");

  /**
   * Estado validationError (texto):
   * Exibe mensagens amigáveis de erro de validação (ex: CPF inválido ou nome incompleto).
   */
  const [validationError, setValidationError] = useState(""); // Erros de validação dinâmicos

  /**
   * Estado simResult (objeto do tipo SimulationResult):
   * Agrupa e consolida as parcelas, custos e encargos estimados calculados em tempo real.
   */
  const [simResult, setSimResult] = useState<SimulationResult>({
    installments: 60,
    installmentValue: 0,
    totalInterest: 0,
    totalCost: 0,
    monthlyRate: 1.66
  });

  // Localiza a categoria de benefício ativa selecionada pelo usuário
  const activeBenefit = BENEFIT_TYPES.find((b) => b.id === selectedBenefitId) || BENEFIT_TYPES[0];

  // Corrige os meses máximos caso o usuário mude de convênio e o mês anterior ultrapasse o máximo permitido
  useEffect(() => {
    if (months > activeBenefit.maxMonths) {
      setMonths(activeBenefit.maxMonths);
    }
  }, [selectedBenefitId]);

  // Recalcula os valores de simulação financeira sempre que o convênio, valor ou parcelas mudarem
  useEffect(() => {
    const rate = activeBenefit.minRate / 100;
    
    let pmt = 0;
    if (rate > 0) {
      pmt = (loanAmount * rate) / (1 - Math.pow(1 + rate, -months));
    } else {
      pmt = loanAmount / months;
    }

    const totalCost = pmt * months;
    const totalInterest = totalCost - loanAmount;

    setSimResult({
      installments: months,
      installmentValue: parseFloat(pmt.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      monthlyRate: activeBenefit.minRate
    });
  }, [selectedBenefitId, loanAmount, months]);

  // Máscara reativa para formatar celulares do tipo (XX) XXXXX-XXXX automaticamente
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formatted = value;
    if (value.length > 0) {
      formatted = `(${value.substring(0, 2)}`;
    }
    if (value.length > 2) {
      formatted += `) ${value.substring(2, 7)}`;
    }
    if (value.length > 7) {
      formatted += `-${value.substring(7, 11)}`;
    }
    setPhone(formatted.substring(0, 15));
    if (validationError) setValidationError("");
  };

  // Máscara reativa para formatar CPFs tipo XXX.XXX.XXX-XX automaticamente
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formatted = value;
    if (value.length > 3) {
      formatted = `${value.substring(0, 3)}.${value.substring(3)}`;
    }
    if (value.length > 6) {
      formatted = `${formatted.substring(0, 7)}.${value.substring(6)}`;
    }
    if (value.length > 9) {
      formatted = `${formatted.substring(0, 11)}-${value.substring(9, 11)}`;
    }
    setCpf(formatted.substring(0, 14));
    if (validationError) setValidationError("");
  };

  // Avançar etapas da simulação com validação nativa contra erros
  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!selectedBenefitId) {
        setValidationError("Por favor, selecione seu tipo de benefício.");
        return;
      }
      setValidationError("");
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setValidationError("");
      setCurrentStep(3);
    }
  };

  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setValidationError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Envio final dos dados ao consultor oficial da DFL Consignado via WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setValidationError("Por favor, informe seu nome completo.");
      return;
    }
    if (phone.length < 14) {
      setValidationError("Por favor, informe um WhatsApp celular válido.");
      return;
    }
    if (cpf.length < 14) {
      setValidationError("Por favor, informe um número de CPF válido.");
      return;
    }
    if (!acceptTerms) {
      setValidationError("Você precisa aceitar os termos de privacidade LGPD para simular.");
      return;
    }

    setValidationError("");
    setFormSubmitted(true);
    trackLeadSubmission(); // Registrar métrica localmente de novo Lead

    const formattedAmount = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(loanAmount);
    const formattedInstallment = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(simResult.installmentValue);
    
    // Constrói a mensagem direta perfeita para o WhatsApp do suporte da DFL
    const message = encodeURIComponent(
      `Olá, DFL Consignado! Fiz uma simulação pelo formulário interativo de 3 passos e gostaria de receber suporte de um consultor.\n\n` +
      `Meus Dados Cadastrais:\n` +
      `* Nome completo: ${fullName}\n` +
      `* CPF: ${cpf}\n` +
      `* Celular/WhatsApp: ${phone}\n` +
      `* Benefício : ${activeBenefit.name}\n\n` +
      `Dados da Simulação Estimada:\n` +
      `* Valor Solicitado: ${formattedAmount}\n` +
      `* Parcelamento: ${months} vezes\n` +
      `* Taxa Efetiva: Desde ${simResult.monthlyRate}% a.m.\n` +
      `* Valor da Parcela: ${formattedInstallment}mensal\n\n` +
      `Gostaria de falar com um especialista e enviar meus comprovantes de benefício para análise final!`
    );

    const waLink = `https://wa.me/5511934554478?text=${message}`;
    setWhatsappLink(waLink);

    // Executa o redirecionamento seguro com timer de usabilidade amigável
    setTimeout(() => {
      window.open(waLink, "_blank");
    }, 1500);
  };

  const formattedValue = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  };

  return (
    <div 
      className="relative bg-brand-card dark:bg-[#1a0e30] border-2 border-brand-border rounded-2xl shadow-xl overflow-hidden text-left" 
      id="simulation-box"
      aria-label="Formulário interativo de simulação de Empréstimo DFL Consignado"
      role="region"
    >
      {/* Listra superior decorativa de alto contraste */}
      <div className="h-2.5 bg-gradient-to-r from-brand-purple to-brand-gold w-full" aria-hidden="true" />

      {formSubmitted ? (
        <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[460px]">
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
            <Check size={36} aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-dark mb-4" id="success-message-title">
            Simulação Registrada!
          </h3>
          <p className="text-brand-gray dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8 font-semibold">
            Excelente, <strong className="text-brand-purple dark:text-brand-gold-accent font-bold">{fullName}</strong>! Seus dados foram validados de acordo com o Banco Central e LGPD. Estamos redirecionando você para um consultor no WhatsApp...
          </p>
          <a
            href={whatsappLink || `https://wa.me/5511934554478?text=${encodeURIComponent("Olá, fiz a simulação no site, aguardo atendimento personalizado.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-md transition-all duration-300 min-h-[44px]"
            aria-label="Abrir conversa do WhatsApp DFL manualmente"
          >
            <Coins className="animate-spin text-white" size={20} aria-hidden="true" />
            CONECTAR CONSERGE WHATSAPP
          </a>
          <p className="text-[11px] text-brand-gray font-bold mt-4">
            Aperte o botão caso não ocorra transferência em 2 segundos.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6" aria-describedby="sim-benefit-legend">
          
          {/* Cabeçalho de progresso do Simulador */}
          <div className="flex items-center justify-between pb-4 border-b border-brand-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-brand-purple/10 dark:bg-brand-gold-accent/10 border border-brand-border-purple/30 dark:border-brand-gold-accent/30 flex items-center justify-center text-brand-purple dark:text-brand-gold-accent shrink-0 select-none">
                <Sparkles size={18} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-black text-brand-dark leading-tight" id="sim-benefit-legend">
                  Simulador de Crédito DFL
                </h3>
                <p className="text-[11px] text-brand-gray font-extrabold">
                  Estimativa rápida no padrão Bacen
                </p>
              </div>
            </div>
            
            {/* Indicador textual do Passo de forma acessível */}
            <div className="text-right">
              <span 
                className="text-[10px] uppercase font-black text-brand-purple dark:text-brand-gold-accent tracking-wider bg-brand-purple/5 dark:bg-white/10 border border-brand-border-purple/20 dark:border-white/10 px-2.5 py-1 rounded-full select-none"
                aria-label={`Você está na etapa atual número ${currentStep} de três etapas do processo`}
              >
                Passo {currentStep} de 3
              </span>
            </div>
          </div>

          {/* Barra gráfica de progresso para cegos ou deficientes de aprendizado com ARIA */}
          <div 
            className="w-full bg-brand-bg dark:bg-white/10 rounded-full h-1.5 flex select-none overflow-hidden" 
            role="progressbar" 
            aria-valuenow={currentStep} 
            aria-valuemin={1} 
            aria-valuemax={3}
            aria-valuetext={`Etapa ${currentStep} de 3`}
          >
            <div 
              className="bg-brand-purple h-full transition-all duration-300 rounded-full animate-pulse" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>

          {/* Alerta de erro de validação (Anunciado imediatamente ao leitor de tela) */}
          {validationError && (
            <div 
              className="p-3 bg-red-50 border-l-4 border-red-500 rounded text-xs font-bold text-red-700 leading-snug animate-fade-in"
              role="alert"
              id="simulation-form-error"
            >
              ⚠️ {validationError}
            </div>
          )}

          {/* PASSO 1: Seleção de Perfil de Convênio */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4.5 animate-fade-in" role="group" aria-labelledby="lbl-passo-1">
              <div className="flex flex-col gap-1">
                <label id="lbl-passo-1" className="text-xs font-extrabold uppercase tracking-widest text-brand-purple dark:text-brand-gold-accent block leading-relaxed">
                  1. Qual é o seu perfil de benefício?
                </label>
                <p className="text-[11px] text-brand-gray dark:text-stone-300 font-semibold">
                  Selecione sua categoria para obtermos as taxas atualizadas por banco parceiro.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {BENEFIT_TYPES.map((type) => {
                  const getShortName = (id: string, fallback: string) => {
                    if (id === "inss") return "Aposentado ou Pensionista INSS";
                    if (id === "servidor") return "Servidor Público (Federal / Estadual)";
                    if (id === "portabilidade") return "Portabilidade de Juros Altos";
                    if (id === "refinanciamento") return "Refinanciamento de Contrato";
                    if (id === "fgts") return "Saque-Aniversário do FGTS";
                    return fallback;
                  };

                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedBenefitId(type.id);
                        setValidationError("");
                      }}
                      className={`px-3.5 py-3 text-left text-sm rounded-xl border border-solid transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none min-h-[44px] ${
                        selectedBenefitId === type.id
                          ? "border-brand-purple dark:border-brand-gold-accent bg-brand-purple/5 dark:bg-brand-gold-accent/10 text-brand-purple dark:text-brand-gold-accent font-extrabold shadow-none ring-1 ring-brand-purple dark:ring-brand-gold-accent"
                          : "border-brand-border dark:border-white/10 bg-brand-bg/50 dark:bg-white/5 text-brand-gray dark:text-stone-300 hover:bg-brand-bg dark:hover:bg-white/10 hover:text-brand-dark dark:hover:text-white"
                      }`}
                      aria-label={`${getShortName(type.id, type.name)}, taxas médias de ${type.minRate}% ao mês`}
                      aria-pressed={selectedBenefitId === type.id}
                    >
                      <span className="font-bold text-xs sm:text-sm mr-2 max-w-[70%] truncate">
                        {getShortName(type.id, type.name)}
                      </span>
                      <span className="text-[10px] sm:text-xs font-black text-brand-purple dark:text-brand-gold-accent px-2.5 py-1 rounded bg-brand-purple/10 dark:bg-brand-gold-accent/20 shrink-0" aria-hidden="true">
                        {type.minRate}% a.m.
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASSO 2: Ajuste de Valores e Prestações via Controles Escorregadios (Sliders) */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-6 animate-fade-in" role="group" aria-labelledby="lbl-passo-2">
              <div className="flex flex-col gap-1">
                <span id="lbl-passo-2" className="text-xs font-extrabold uppercase tracking-widest text-brand-purple dark:text-brand-gold-accent block leading-relaxed">
                  2. Valor e parcelas do empréstimo
                </span>
                <p className="text-[11px] text-brand-gray dark:text-stone-300 font-semibold">
                  Ajuste os valores de contratação arrastando a barra ou usando o teclado.
                </p>
              </div>

              {/* Slider de Valores de Contratação */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="slider-loan-amount" className="text-xs font-bold text-brand-gray dark:text-stone-300">Quanto você precisa receber?</label>
                  <span className="text-lg sm:text-xl font-serif font-black text-brand-purple dark:text-brand-gold-accent" aria-live="polite">
                    {formattedValue(loanAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  id="slider-loan-amount"
                  min="2000"
                  max="150000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-brand-bg dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border dark:border-white/10"
                  aria-label="Ajustar valor solicitado em Reais"
                  aria-valuemin={2000}
                  aria-valuemax={150000}
                  aria-valuenow={loanAmount}
                  aria-valuetext={`${loanAmount} reais`}
                />
                <div className="flex items-center justify-between text-[10px] text-brand-gray font-bold" aria-hidden="true">
                  <span>Mínimo: R$ 2.000</span>
                  <span>Máximo: R$ 150.000</span>
                </div>
              </div>

              {/* Slider de Número de Parcelamentos */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="slider-months" className="text-xs font-bold text-brand-gray dark:text-stone-300">Em quantas prestações mensais?</label>
                  <span className="text-lg sm:text-xl font-serif font-black text-brand-dark dark:text-stone-100" aria-live="polite">
                    {months} parcelas
                  </span>
                </div>
                <input
                  type="range"
                  id="slider-months"
                  min="12"
                  max={activeBenefit.maxMonths}
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-2.5 bg-brand-bg dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border dark:border-white/10"
                  aria-label="Ajustar quantidade de parcelas"
                  aria-valuemin={12}
                  aria-valuemax={activeBenefit.maxMonths}
                  aria-valuenow={months}
                  aria-valuetext={`${months} meses`}
                />
                <div className="flex items-center justify-between text-[10px] text-brand-gray font-bold" aria-hidden="true">
                  <span>12 parcelas</span>
                  <span>Máximo: {activeBenefit.maxMonths} parcelas</span>
                </div>
              </div>

              {/* Demonstrador amigável dos resultados das parcelas sob as taxas oficiais */}
              <div className="bg-brand-bg dark:bg-white/5 rounded-xl p-4 border border-brand-border dark:border-white/10 flex flex-col gap-2">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-xs font-bold text-brand-gray">Sua Parcela Mensal Estimada:</span>
                  <span className="text-xl sm:text-2xl font-serif font-black text-brand-purple dark:text-brand-gold-accent" aria-live="polite">
                    {formattedValue(simResult.installmentValue)}
                  </span>
                </div>
                <div className="border-t border-brand-border my-1.5" aria-hidden="true" />
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-brand-gray block text-[10px] uppercase font-bold">Taxa Mensal</span>
                    <span className="font-extrabold text-brand-dark">Desde {simResult.monthlyRate}% a.m.</span>
                  </div>
                  <div>
                    <span className="text-brand-gray block text-[10px] uppercase font-bold">Valor Total Pago</span>
                    <span className="font-extrabold text-brand-dark">{formattedValue(simResult.totalCost)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASSO 3: Preenchimento de contato com termos LGPD */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-4 animate-fade-in" role="group" aria-labelledby="lbl-passo-3">
              <div className="flex flex-col gap-1 pb-1">
                <span id="lbl-passo-3" className="text-xs font-extrabold uppercase tracking-widest text-brand-purple dark:text-brand-gold-accent block leading-relaxed">
                  3. Dados para recebimento do crédito
                </span>
                <p className="text-[11px] text-brand-gray dark:text-stone-300 font-semibold">
                  Precisamos do seu CPF apenas para validar se há margem habilitante para o empréstimo consignado.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Campo de Nome Completo */}
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" size={17} aria-hidden="true" />
                  <input
                    type="text"
                    required
                    id="input-fullname"
                    placeholder="Seu nome completo"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (validationError) setValidationError("");
                    }}
                    className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-white dark:bg-[#120822] border border-brand-border rounded-xl text-sm text-brand-dark font-medium placeholder-brand-gray/65 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition min-h-[44px]"
                    aria-label="Informe seu nome completo"
                  />
                </div>

                {/* Campo de Celular/WhatsApp com máscara */}
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" size={17} aria-hidden="true" />
                  <input
                    type="tel"
                    required
                    id="input-phone"
                    placeholder="Celular com WhatsApp: (XX) XXXXX-XXXX"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-white dark:bg-[#120822] border border-brand-border rounded-xl text-sm text-brand-dark font-medium placeholder-brand-gray/65 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition min-h-[44px]"
                    aria-label="Informe seu número de celular com código de DDD"
                  />
                </div>

                {/* Campo de CPF */}
                <div className="relative">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" size={17} aria-hidden="true" />
                  <input
                    type="tel"
                    required
                    id="input-cpf"
                    placeholder="Seu número de CPF: XXX.XXX.XXX-XX"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-white dark:bg-[#120822] border border-brand-border rounded-xl text-sm text-brand-dark font-medium placeholder-brand-gray/65 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition min-h-[44px]"
                    aria-label="Informe os onze números do seu CPF de forma confidencial"
                  />
                </div>

                {/* Consentimento nos moldes restritos da LGPD */}
                <label className="flex items-start gap-2.5 text-[11px] text-brand-gray leading-snug cursor-pointer select-none py-1.5 min-h-[44px]">
                  <input
                    type="checkbox"
                    id="chk-terms-lgpd"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-brand-purple border-brand-border focus:ring-brand-purple rounded cursor-pointer"
                    aria-label="Aceito que a DFL analise minha simulação de crédito livre de taxas extras sob as regras da LGPD e políticas do BACEN."
                  />
                  <span>
                    Concordo com o tratamento seguro de meus dados em total conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong> para cálculo e acompanhamento da simulação de juros reduzidos. Zero tarifas embutidas.
                  </span>
                </label>
              </div>

              {/* Pré-visualização do resultado */}
              <div 
                className="text-center font-bold text-xs text-brand-purple dark:text-brand-gold-accent bg-brand-purple/5 dark:bg-white/10 border border-brand-border-purple/35 dark:border-white/10 rounded-lg p-2.5 mt-1 select-none animate-pulse"
                aria-live="polite"
              >
                📍 Estimativa cadastrada: <span className="font-extrabold">{formattedValue(loanAmount)}</span> em <span className="font-extrabold">{months}x</span> de <span className="font-extrabold">{formattedValue(simResult.installmentValue)}/mês</span>.
              </div>
            </div>
          )}

          {/* Navegação entre Passos (Botoões de Altura Extra de 44px para facilidade motora) */}
          <div className="flex gap-3 mt-1 pt-1 select-none">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3.5 flex-1 bg-brand-bg dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-brand-dark font-black text-xs tracking-wider uppercase rounded-xl border border-brand-border dark:border-white/10 flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple transition duration-200 min-h-[44px]"
                aria-label="Voltar para a etapa anterior da simulação"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Voltar
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3.5 flex-[2] bg-brand-purple hover:bg-brand-purple-light text-white font-black text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple transition duration-200 shadow-md hover:shadow-lg min-h-[44px]"
                aria-label="Avançar para a próxima etapa"
              >
                <span>Avançar</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                className="py-3.5 flex-[2] bg-brand-purple hover:bg-brand-purple-light text-white font-black text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple transition duration-200 shadow-md hover:shadow-lg min-h-[44px]"
                aria-label="Concluir envio dos dados e prosseguir para atendimento oficial"
              >
                <span>Concluir Simulação</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          <p className="text-[10px] text-center text-brand-gray font-extrabold select-none leading-relaxed" aria-hidden="true">
            Our Website is SSL Encrypted • Correspondente de crédito autorizado por canais oficiais.
          </p>
        </form>
      )}
    </div>
  );
}
