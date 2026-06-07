import React, { useState, useEffect } from "react";
import { BENEFIT_TYPES } from "../data";
import { SimulationResult } from "../types";
import { Coins, User, Phone, Check, ArrowRight, Sparkles } from "lucide-react";

interface SimulateFormProps {
  initialBenefitId?: string;
}

export default function SimulateForm({ initialBenefitId = "inss" }: SimulateFormProps) {
  const [selectedBenefitId, setSelectedBenefitId] = useState(initialBenefitId);
  const [loanAmount, setLoanAmount] = useState(25000);
  const [months, setMonths] = useState(60);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [simResult, setSimResult] = useState<SimulationResult>({
    installments: 60,
    installmentValue: 0,
    totalInterest: 0,
    totalCost: 0,
    monthlyRate: 1.66
  });

  const activeBenefit = BENEFIT_TYPES.find((b) => b.id === selectedBenefitId) || BENEFIT_TYPES[0];

  // Adjust months if current value exceeds selected benefit max
  useEffect(() => {
    if (months > activeBenefit.maxMonths) {
      setMonths(activeBenefit.maxMonths);
    }
  }, [selectedBenefitId]);

  // Recalculate simulation values
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

  // Handle phone mask formatting: (XX) XXXXX-XXXX
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || phone.length < 14) return;

    setFormSubmitted(true);

    const formattedAmount = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(loanAmount);
    const formattedInstallment = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(simResult.installmentValue);
    
    const message = encodeURIComponent(
      `Olá, DFL Consignado! Fiz uma simulação em seu site e gostaria de falar com um consultor.\n\n` +
      `*Meus Dados:*\n` +
      `• Nome: ${fullName}\n` +
      `• Telefone: ${phone}\n` +
      `• Categoria: ${activeBenefit.name}\n\n` +
      `*Dados de Simulação:*\n` +
      `• Valor Solicitado: ${formattedAmount}\n` +
      `• Parcelas: ${months}x\n` +
      `• Taxa Estimada: ${simResult.monthlyRate}% a.m.\n` +
      `• Valor da Parcela: ${formattedInstallment}/mês\n\n` +
      `Gostaria de formalizar e mandar os meus documentos para aprovação!`
    );

    const waLink = `https://wa.me/5511934554478?text=${message}`;

    setTimeout(() => {
      window.open(waLink, "_blank");
    }, 1200);
  };

  const formattedValue = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  };

  return (
    <div className="relative bg-white border border-brand-border rounded-2xl shadow-xl overflow-hidden text-left" id="simulation-box">
      {/* Top golden brand separator strip */}
      <div className="h-2.5 bg-gradient-to-r from-brand-purple to-brand-gold w-full" />

      {formSubmitted ? (
        <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
            <Check size={36} />
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-dark mb-4">
            Simulação Concluída!
          </h3>
          <p className="text-brand-gray text-base leading-relaxed max-w-md mx-auto mb-8 font-medium">
            Perfeito, <strong className="text-brand-purple font-bold">{fullName}</strong>! Criamos a sua proposta personalizada. Redirecionando você para o nosso especialista no WhatsApp agora mesmo para liberação imediata...
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-md cursor-pointer transition-all duration-300">
            <Coins className="animate-spin text-white" size={20} />
            CONECTANDO WHATSAPP OFICIAL
          </div>
          <p className="text-xs text-brand-gray font-semibold mt-4">
            Se não redirecionar em 3 segundos, clique no botão acima.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 flex flex-col gap-4.5 sm:gap-6">
          <div className="flex items-center gap-3 pb-3 border-b border-brand-border">
            <div className="w-10 h-10 rounded-lg bg-brand-purple/5 border border-brand-border-purple/30 flex items-center justify-center text-brand-purple shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-black text-brand-dark leading-tight">
                Simulador de Crédito DFL
              </h3>
              <p className="text-[11px] text-brand-gray font-bold">
                Estimativa realista de taxas reais em 1 minuto
              </p>
            </div>
          </div>

          {/* Option Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold uppercase tracking-wide text-brand-purple">
              1. Qual é o seu perfil de benefício?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {BENEFIT_TYPES.map((type) => {
                // Shorten labels on smaller viewports visually to prevent squishing
                const getShortName = (id: string, fallback: string) => {
                  if (id === "inss") return "Aposentado / Pensionista INSS";
                  if (id === "servidor") return "Servidor Público";
                  if (id === "portabilidade") return "Portabilidade";
                  if (id === "refinanciamento") return "Refinanciamento";
                  if (id === "fgts") return "Saque-Aniversário FGTS";
                  return fallback;
                };

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedBenefitId(type.id)}
                    className={`px-3.5 py-2.5 sm:px-4 sm:py-3 text-left text-sm rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                      selectedBenefitId === type.id
                        ? "border-brand-purple bg-brand-purple/5 text-brand-purple font-extrabold shadow-xs"
                        : "border-brand-border bg-brand-bg/50 text-brand-gray hover:bg-brand-bg hover:text-brand-dark"
                    }`}
                  >
                    <span className="font-bold text-xs sm:text-sm mr-2 max-w-[65%] sm:max-w-none truncate sm:whitespace-normal">
                      {getShortName(type.id, type.name)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-extrabold text-brand-purple px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-brand-purple/10 border border-brand-border-purple/20 shrink-0 whitespace-nowrap">
                      {type.minRate}% a.m.
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount input + slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wide text-brand-purple">
                2. Quanto você precisa?
              </label>
              <span className="text-lg sm:text-xl font-serif font-black text-brand-purple">
                {formattedValue(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="150000"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-brand-bg rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border sm:my-1"
            />
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-brand-gray font-semibold">
              <span>Mínimo: R$ 2.000</span>
              <span>Até R$ 150.000</span>
            </div>
          </div>

          {/* Installment count */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wide text-brand-purple">
                3. Em quantas parcelas?
              </label>
              <span className="text-lg sm:text-xl font-serif font-black text-brand-dark">
                {months} meses
              </span>
            </div>
            <input
              type="range"
              min="12"
              max={activeBenefit.maxMonths}
              step="1"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-2 bg-brand-bg rounded-lg appearance-none cursor-pointer accent-brand-purple border border-brand-border sm:my-1"
            />
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-brand-gray font-semibold">
              <span>12 parcelas</span>
              <span>Máximo: {activeBenefit.maxMonths} parcelas</span>
            </div>
          </div>

          {/* Visual Simulation display card (light background, heavy contrast text) */}
          <div className="bg-brand-bg rounded-xl p-3.5 sm:p-4.5 border border-brand-border flex flex-col gap-2.5">
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-xs font-bold text-brand-gray">Sua Parcela Estimada:</span>
              <span className="text-xl sm:text-2xl font-serif font-black text-brand-purple">
                {formattedValue(simResult.installmentValue)}
              </span>
            </div>
            <div className="border-t border-brand-border"></div>
            <div className="grid grid-cols-2 gap-3 text-[11px] sm:text-xs">
              <div>
                <span className="text-brand-gray block text-[9px] sm:text-[10px] uppercase font-bold">Taxa Mensal</span>
                <span className="font-extrabold text-brand-dark">Desde {simResult.monthlyRate}% a.m.</span>
              </div>
              <div>
                <span className="text-brand-gray block text-[9px] sm:text-[10px] uppercase font-bold">Total Estimado</span>
                <span className="font-extrabold text-brand-dark">{formattedValue(simResult.totalCost)}</span>
              </div>
            </div>
          </div>

          {/* Persona contact info */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wide text-brand-purple">
              4. Preencha seus dados para receber o crédito
            </label>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" size={18} />
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-brand-border rounded-xl text-sm text-brand-dark placeholder-brand-gray/70 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition duration-200"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" size={18} />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Ex: (11) 93455-4478"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-brand-border rounded-xl text-sm text-brand-dark placeholder-brand-gray/70 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* CTA Submit Button - Vivid contrast purple */}
          <button
            type="submit"
            className="w-full py-3.5 sm:py-4.5 bg-brand-purple hover:bg-brand-purple-light text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <span>Simular Agora Grátis</span>
            <ArrowRight size={18} />
          </button>

          <p className="text-[10px] text-center text-brand-gray font-bold">
            🔒 Simulação protegida pela LGPD. Sem consulta de score tradicional.
          </p>
        </form>
      )}
    </div>
  );
}
