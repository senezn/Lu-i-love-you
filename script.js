const pergunta = document.getElementById("pergunta");
const surpresa = document.getElementById("surpresa");
const simBtn = document.getElementById("simBtn");
const naoBtn = document.getElementById("naoBtn");
const dica = document.getElementById("dica");

let tentativas = 0;

const frases = [
  "Ops... pensa de novo 😅",
  "Tem certeza? 👀",
  "O botão está ficando nervoso...",
  "Ele não quer ser escolhido 😂",
  "Agora só existe uma resposta certa 💖"
];

function moverBotaoNao() {
  tentativas++;

  naoBtn.classList.add("fugindo");

  const larguraJanela = window.innerWidth;
  const alturaJanela = window.innerHeight;

  const larguraBotao = naoBtn.offsetWidth;
  const alturaBotao = naoBtn.offsetHeight;

  const novaEsquerda = Math.random() * (larguraJanela - larguraBotao - 30) + 15;
  const novoTopo = Math.random() * (alturaJanela - alturaBotao - 30) + 15;

  naoBtn.style.position = "fixed";
  naoBtn.style.left = `${novaEsquerda}px`;
  naoBtn.style.top = `${novoTopo}px`;
  naoBtn.style.transform = "none";

  dica.textContent = frases[Math.min(tentativas - 1, frases.length - 1)];

  if (tentativas >= 5) {
    naoBtn.classList.add("sumir");
    dica.textContent = "Pronto, agora ficou fácil escolher 😌";
  }
}

naoBtn.addEventListener("mouseenter", moverBotaoNao);
naoBtn.addEventListener("click", moverBotaoNao);
naoBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moverBotaoNao();
});

simBtn.addEventListener("click", () => {
  pergunta.classList.remove("ativa");
  surpresa.classList.add("ativa");

  criarConfetes();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function criarConfetes() {
  for (let i = 0; i < 80; i++) {
    const confete = document.createElement("span");
    confete.textContent = ["💖", "💕", "✨", "🌸"][Math.floor(Math.random() * 4)];
    confete.style.position = "fixed";
    confete.style.left = Math.random() * 100 + "vw";
    confete.style.top = "-40px";
    confete.style.fontSize = Math.random() * 18 + 16 + "px";
    confete.style.zIndex = "999";
    confete.style.pointerEvents = "none";
    confete.style.animation = `cair ${Math.random() * 2 + 3}s linear forwards`;
    document.body.appendChild(confete);

    setTimeout(() => confete.remove(), 5200);
  }
}

const estilo = document.createElement("style");
estilo.innerHTML = `
  @keyframes cair {
    to {
      transform: translateY(110vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(estilo);
