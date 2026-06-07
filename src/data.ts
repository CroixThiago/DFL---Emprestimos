import { BenefitType, ServiceItem, TestimonialItem, FAQItem, PartnerBank } from "./types";

export const BENEFIT_TYPES: BenefitType[] = [
  {
    id: "inss",
    name: "Consignado INSS (Aposentado/Pensionista)",
    minRate: 1.66,
    maxMonths: 84,
    description: "Para aposentados e pensionistas do INSS com desconto direto na folha de pagamento."
  },
  {
    id: "servidor",
    name: "Servidor Público (Federal/Estadual/Municipal)",
    minRate: 1.50,
    maxMonths: 96,
    description: "Crédito especial para funcionários públicos ativos, inativos ou pensionistas."
  },
  {
    id: "portabilidade",
    name: "Portabilidade de Crédito",
    minRate: 1.60,
    maxMonths: 84,
    description: "Traga sua dívida cara de outro banco ou instituição e reduza suas parcelas hoje."
  },
  {
    id: "refinanciamento",
    name: "Refinanciamento Consignado",
    minRate: 1.68,
    maxMonths: 84,
    description: "Renove seu empréstimo atual com melhores condições e receba um troco na conta."
  },
  {
    id: "fgts",
    name: "Saque de Aniversário FGTS",
    minRate: 1.80,
    maxMonths: 12,
    description: "Antecipe até 12 parcelas do seu Saque-Aniversário do FGTS sem parcelas mensais."
  }
];

export const CORE_BENEFITS = [
  {
    title: "Segurança em Primeiro Lugar",
    description: "Seu dinheiro protegido e processo 100% seguro. Trabalhamos apenas com os maiores e mais sólidos bancos do Brasil.",
    iconName: "ShieldCheck"
  },
  {
    title: "Dinheiro Rápido na Conta",
    description: "Aprovação em até 48 horas após o envio dos documentos necessários. Muitos dos nossos parceiros pagam em menos de 24 horas.",
    iconName: "Zap"
  },
  {
    title: "Melhores Taxas do Mercado",
    description: "As menores taxas de juros reais para consignado do INSS, portabilidade e servidores públicos. Sem surpresas ou taxas escondidas.",
    iconName: "TrendingDown"
  },
  {
    title: "Atendimento Humanizado",
    description: "Falamos a sua língua, de forma simples e acolhedora. Aqui você fala com pessoas de verdade, sem robôs cansativos.",
    iconName: "HeartHandshake"
  },
  {
    title: "Sem Burocracia",
    description: "Processo digital simplificado e totalmente transparente. Menos papelada e muito mais agilidade para o seu dia a dia.",
    iconName: "FileCheck2"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "inss",
    title: "Consignado INSS",
    description: "Empréstimo direcionado para aposentados e pensionistas do INSS com as melhores condições e descontos diretos em folha.",
    iconName: "Users"
  },
  {
    id: "servidor",
    title: "Consignado Servidor Público",
    description: "Crédito especial para servidores das esferas municipal, estadual e federal, além de pensionistas públicos com tarifas de juros reduzidas.",
    iconName: "Briefcase"
  },
  {
    id: "portabilidade",
    title: "Portabilidade de Crédito",
    description: "Transfira sua dívida de consignado existente para a DFL com juros menores e diminua o valor da sua parcela mensal agora.",
    iconName: "ArrowRightLeft"
  },
  {
    id: "refinanciamento",
    title: "Refinanciamento Consignado",
    description: "Aproveite a margem já quitada do seu contrato ativo para liberar dinheiro novo no bolso e reajustar o prazo de pagamento.",
    iconName: "RefreshCw"
  },
  {
    id: "fgts",
    title: "Saque FGTS",
    description: "Antecipe os saldos anuais de seu Saque-Aniversário do FGTS de forma rápida, segura, sem comprometer seu orçamento mensal.",
    iconName: "Coins"
  }
];

export const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Fale com a gente",
    description: "Envie uma mensagem no WhatsApp ou faça a simulação online em nosso site rapidamente."
  },
  {
    number: "02",
    title: "Envie seus documentos",
    description: "Basta tirar foto do seu RG/CPF, comprovante de residência e extrato de benefício (tudo digital)."
  },
  {
    number: "03",
    title: "Análise Rápida",
    description: "Nosso time de consultores avalia seu perfil e te entrega a melhor proposta disponível em poucas horas."
  },
  {
    number: "04",
    title: "Dinheiro na Conta",
    description: "Você realiza a assinatura digital de forma segura no celular e o valor cai na sua conta em até 48 horas."
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    name: "Dona Maria do Carmo, 62 anos",
    role: "Aposentada do INSS",
    location: "Penha, São Paulo / SP",
    comment: "Fui muito bem atendida, com muito carinho e paciência pelo WhatsApp. Me explicaram tudo sobre as taxas sem palavras difíceis e o dinheiro caiu na minha conta no dia seguinte. Estava com medo de golpes na internet, mas a DFL é muito segura e séria!",
    rating: 5,
    avatarUrl: "/images/testimonials/maria.svg"
  },
  {
    id: "2",
    name: "Dona Sandra Lima, 58 anos",
    role: "Pensionista do INSS",
    location: "São Bernardo do Campo / SP",
    comment: "O que eu mais gostei foi a rapidez e o respeito. O consultor da DFL fez a simulação comigo passo a passo, me mostrou as taxas reais das parcelas e tudo foi feito pelo meu celular mesmo, sem precisar ir ao banco pegar filas. Nota 10!",
    rating: 5,
    avatarUrl: "/images/testimonials/sandra.svg"
  },
  {
    id: "3",
    name: "Seu Carlos Eduardo, 52 anos",
    role: "Servidor Público Estadual",
    location: "Osasco / SP",
    comment: "Fiz o refinanciamento do meu consignado e reduzi bastante o valor da parcela mensal, sobrando um troco ótimo que usei para reformar a cozinha de casa. Atendimento excelente, sério e transparente.",
    rating: 5,
    avatarUrl: "/images/testimonials/carlos.svg"
  },
  {
    id: "4",
    name: "Seu João Pereira, 65 anos",
    role: "Aposentado e Ex-Professor",
    location: "Guarulhos / SP",
    comment: "Procurava uma empresa segura de verdade perto de São Paulo. A DFL me passou muita confiança, confirmaram todos os dados direto com as maiores instituições parceiras do governo e liberaram o crédito com rapidez.",
    rating: 5,
    avatarUrl: "/images/testimonials/joao.svg"
  }
];

export const PARTNERS: PartnerBank[] = [
  {
    id: "caixa",
    name: "Caixa Econômica",
    logo: "/images/partners/caixa.svg"
  },
  {
    id: "bb",
    name: "Banco do Brasil",
    logo: "/images/partners/bb.svg"
  },
  {
    id: "itau",
    name: "Itaú",
    logo: "/images/partners/itau.svg"
  },
  {
    id: "bradesco",
    name: "Bradesco",
    logo: "/images/partners/bradesco.svg"
  },
  {
    id: "santander",
    name: "Santander",
    logo: "/images/partners/santander.svg"
  },
  {
    id: "bmg",
    name: "Banco BMG",
    logo: "/images/partners/bmg.svg"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Quem pode fazer empréstimo consignado?",
    answer: "Aposentados e pensionistas do INSS, servidores públicos ativos (federais, estaduais e municipais), aposentados ou pensionistas do setor de funcionalismo público. Também atendemos pessoas com saldo FGTS que queiram realizar a antecipação."
  },
  {
    id: "faq-2",
    question: "Quanto tempo leva para o dinheiro cair na conta?",
    answer: "Após a aprovação final e a assinatura eletrônica do seu contrato, o valor cai diretamente na sua conta corrente em até 48 horas úteis, com muitos de nossos clientes recebendo em menos de 24 horas."
  },
  {
    id: "faq-3",
    question: "É seguro fazer empréstimo com a DFL?",
    answer: "Totalmente seguro. Somos uma empresa consolidada no mercado, transparente, e atuamos como correspondente bancário oficial das maiores instituições financeiras do país, seguindo rigorosamente todas as regras do Banco Central e as diretrizes de proteção de dados (LGPD). Seus dados e seu contrato estão 100% protegidos."
  },
  {
    id: "faq-4",
    question: "Vocês fazem portabilidade de outro banco?",
    answer: "Sim! Se você já tem um empréstimo consignado em outro banco com parcelas altas ou taxas caras, podemos migrar a sua dívida para a DFL (portabilidade) para você reduzir o valor da sua parcela mensal ou receber um troco em dinheiro."
  },
  {
    id: "faq-5",
    question: "Preciso sair de casa para fazer o empréstimo?",
    answer: "Não, de jeito nenhum! Todo o nosso processo é digital e moderno. Você simula, conversa com nossos consultores de atendimento pelo WhatsApp, envia fotos digitais dos documentos necessários e assina o contrato no seu celular de onde estiver, com total conforto e bem-estar."
  }
];
