// ====== CONFIG (troque aqui) ======
const CONFIG = {
  nome: "Raquel Pontifice",
  instagram: "psicologa.raquelpontifice",
  whatsappDigits: "5535991725977",
  whatsappMensagemPadrao: "Olá, Raquel! Vi seu site e gostaria de saber sobre atendimento psicológico."
};

function retornarTopo() {
  window.scrollTo(0, 0);
}

// ====== Helpers ======
function buildWhatsLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsappDigits}?text=${text}`;
}

function formatWhatsBR(digits) {
  // Formatação simples p/ exibir (não é perfeita para todos os casos)
  // Ex: 5511999999999 -> +55 (11) 99999-9999
  if (!digits.startsWith("55") || digits.length < 12) return digits;
  const ddd = digits.slice(2, 4);
  const num = digits.slice(4);
  const part1 = num.slice(0, num.length - 4);
  const part2 = num.slice(-4);
  return `+55 (${ddd}) ${part1}-${part2}`;
}

// ====== Menu mobile ======
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

// Fecha menu ao clicar num link (mobile)
nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// ====== WhatsApp links ======
const whatsUrl = buildWhatsLink(CONFIG.whatsappMensagemPadrao);

["btnWhatsHero", "btnWhatsCard", "btnWhatsTcc", "linkWhats"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.setAttribute("href", whatsUrl);
});

const whatsDisplay = document.getElementById("whatsDisplay");
if (whatsDisplay) whatsDisplay.textContent = formatWhatsBR(CONFIG.whatsappDigits);

// ====== Form -> Whats ======
const form = document.getElementById("quickForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get("nome")?.toString().trim();
  const assunto = data.get("assunto")?.toString().trim();
  const mensagem = data.get("mensagem")?.toString().trim();

  const finalMsg =
    `Olá, ${CONFIG.nome}! Meu nome é ${nome}.\n` +
    `Assunto: ${assunto}\n\n` +
    `${mensagem}`;

  window.open(buildWhatsLink(finalMsg), "_blank", "noopener");
});

// ====== Ano no footer ======
document.getElementById("year").textContent = String(new Date().getFullYear());

// ====== Animação de entrada (Intersection Observer) ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
