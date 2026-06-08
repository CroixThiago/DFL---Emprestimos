/**
 * Utilitário simples de Analytics para DFL Consignado.
 * Ideal para herdar integrações como Facebook Pixel, Google Analytics, GTM, etc.
 * Extremamente fácil para estagiários ou desenvolvedores júnior alterarem.
 */

/**
 * Registra o início de um contato de Lead (WhatsApp ou formulário final)
 */
export function trackLeadSubmission() {
  try {
    localStorage.setItem("lead-started", "true");
    
    // Dispara um evento customizado no navegador, caso outros elementos queiram assinar
    const event = new CustomEvent("dfl-lead-started", {
      detail: { timestamp: new Date().toISOString() }
    });
    window.dispatchEvent(event);
    
    console.log("Analytics DFL: Flag 'lead-started' configurada com sucesso no localStorage!");
    
    // No futuro, o pixel do Facebook / GTM pode capturar esse evento assim:
    // if (window.fbq) window.fbq('track', 'Lead');
  } catch (err) {
    console.error("Erro ao registrar analytics local:", err);
  }
}

/**
 * Verifica se o usuário já engajou conosco na sessão ou histórico local
 */
export function hasStartedLead(): boolean {
  try {
    return localStorage.getItem("lead-started") === "true";
  } catch {
    return false;
  }
}
