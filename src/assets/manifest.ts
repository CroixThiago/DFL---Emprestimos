// Centralized Asset Manifesto for DFL Consignado
// All logos, testimonial avatars, and product icons are registered here.
// Perfect for easy maintenance and replacement.

import arrowRightLeft from "./images/icons/ArrowRightLeft.svg";
import briefcase from "./images/icons/Briefcase.svg";
import coins from "./images/icons/Coins.svg";
import fileCheck2 from "./images/icons/FileCheck2.svg";
import heartHandshake from "./images/icons/HeartHandshake.svg";
import refreshCw from "./images/icons/RefreshCw.svg";
import shieldCheck from "./images/icons/ShieldCheck.svg";
import trendingDown from "./images/icons/TrendingDown.svg";
import users from "./images/icons/Users.svg";
import zap from "./images/icons/Zap.svg";

import logo from "./images/logo.svg";

import partnerCaixa from "./images/partners/caixa.svg";
import partnerBb from "./images/partners/bb.svg";
import partnerItau from "./images/partners/itau.svg";
import partnerBradesco from "./images/partners/bradesco.svg";
import partnerSantander from "./images/partners/santander.svg";
import partnerBmg from "./images/partners/bmg.svg";

import testimonialMaria from "./images/testimonials/maria.svg";
import testimonialSandra from "./images/testimonials/sandra.svg";
import testimonialCarlos from "./images/testimonials/carlos.svg";
import testimonialJoao from "./images/testimonials/joao.svg";

export const ASSET_MANIFEST = {
  logo: logo,
  icons: {
    ArrowRightLeft: arrowRightLeft,
    Briefcase: briefcase,
    Coins: coins,
    FileCheck2: fileCheck2,
    HeartHandshake: heartHandshake,
    RefreshCw: refreshCw,
    ShieldCheck: shieldCheck,
    TrendingDown: trendingDown,
    Users: users,
    Zap: zap,
  },
  partners: {
    caixa: partnerCaixa,
    bb: partnerBb,
    itau: partnerItau,
    bradesco: partnerBradesco,
    santander: partnerSantander,
    bmg: partnerBmg,
  },
  testimonials: {
    1: testimonialMaria,
    2: testimonialSandra,
    3: testimonialCarlos,
    4: testimonialJoao,
  },
};
