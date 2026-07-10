/* =========================================================
   Feliciterapia — Brincadeira das Setas
   Lógica do jogo: ciclo da seta e start/stop.

   Ciclo (confirmado com o cliente):
     1. Seta VISÍVEL por 2s fixos, apontando esquerda/direita (50/50 aleatório).
     2. Seta SOME pelo intervalo escolhido (padrão 3s).
     3. Repete indefinidamente, sorteando nova direção a cada aparição.
   ========================================================= */

(function () {
  "use strict";

  // Constantes do jogo
  var TEMPO_VISIVEL_MS = 2000; // 2 segundos fixos com a seta na tela
  var SEG_MIN = 1;
  var SEG_MAX = 10;
  var SEG_PADRAO = 3;

  // Elementos
  var telaInicio = document.getElementById("tela-inicio");
  var telaFoco   = document.getElementById("tela-foco");
  var form       = document.getElementById("form-inicio");
  var inputSeg   = document.getElementById("segundos");
  var btnMenos   = document.getElementById("btn-menos");
  var btnMais    = document.getElementById("btn-mais");
  var btnParar   = document.getElementById("btn-parar");
  var seta       = document.getElementById("seta");
  var contagem   = document.getElementById("contagem");

  var CONTAGEM_INICIO = 3; // conta 3, 2, 1 antes da primeira seta

  // Estado dos timers (para poder limpar ao parar)
  var timerId = null;
  var jogando = false;

  /* ---------- Utilidades do campo de segundos ---------- */

  function lerSegundos() {
    var v = parseInt(inputSeg.value, 10);
    if (isNaN(v)) v = SEG_PADRAO;
    if (v < SEG_MIN) v = SEG_MIN;
    if (v > SEG_MAX) v = SEG_MAX;
    return v;
  }

  function ajustarSegundos(delta) {
    var v = lerSegundos() + delta;
    if (v < SEG_MIN) v = SEG_MIN;
    if (v > SEG_MAX) v = SEG_MAX;
    inputSeg.value = String(v);
  }

  btnMenos.addEventListener("click", function () { ajustarSegundos(-1); });
  btnMais.addEventListener("click", function () { ajustarSegundos(1); });
  // Normaliza o valor quando o usuário sai do campo
  inputSeg.addEventListener("blur", function () { inputSeg.value = String(lerSegundos()); });

  /* ---------- Contagem regressiva ---------- */

  function mostrarNumero(n) {
    contagem.textContent = String(n);
    contagem.setAttribute("aria-label", "Começando em " + n);
    // reinicia a animação de pulso a cada número
    contagem.style.animation = "none";
    void contagem.offsetWidth; // força reflow
    contagem.style.animation = "";
  }

  // Conta 3, 2, 1 (1s cada) e então chama aoFim() para iniciar as setas
  function contagemRegressiva(aoFim) {
    var n = CONTAGEM_INICIO;
    contagem.classList.remove("contagem--oculta");
    mostrarNumero(n);

    function tick() {
      if (!jogando) return;
      n--;
      if (n >= 1) {
        mostrarNumero(n);
        timerId = setTimeout(tick, 1000);
      } else {
        contagem.classList.add("contagem--oculta");
        aoFim();
      }
    }
    timerId = setTimeout(tick, 1000);
  }

  /* ---------- Ciclo da seta ---------- */

  function sortearDirecao() {
    return Math.random() < 0.5 ? "esquerda" : "direita";
  }

  function mostrarSeta() {
    var dir = sortearDirecao();
    seta.classList.toggle("seta--esquerda", dir === "esquerda");
    seta.classList.remove("seta--oculta");
    seta.setAttribute("aria-label", "Seta apontando para a " + dir);
  }

  function esconderSeta() {
    seta.classList.add("seta--oculta");
    seta.setAttribute("aria-label", "Seta escondida");
  }

  // Uma volta completa do ciclo: mostra 2s -> esconde (intervalo) -> repete
  function proximaVolta(intervaloMs) {
    if (!jogando) return;

    mostrarSeta();
    timerId = setTimeout(function () {
      if (!jogando) return;
      esconderSeta();
      timerId = setTimeout(function () {
        proximaVolta(intervaloMs);
      }, intervaloMs);
    }, TEMPO_VISIVEL_MS);
  }

  /* ---------- Iniciar / Parar ---------- */

  function iniciar() {
    if (jogando) return;
    var intervaloMs = lerSegundos() * 1000;
    jogando = true;

    telaInicio.hidden = true;
    telaFoco.hidden = false;
    btnParar.blur(); // evita foco no botão de parar ao entrar

    esconderSeta(); // seta fica escondida durante a contagem
    contagemRegressiva(function () {
      proximaVolta(intervaloMs);
    });
  }

  function parar() {
    jogando = false;
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    esconderSeta();
    contagem.classList.add("contagem--oculta"); // some se parar durante a contagem
    telaFoco.hidden = true;
    telaInicio.hidden = false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    iniciar();
  });

  btnParar.addEventListener("click", parar);

  // Tecla ESC também para o jogo (ajuda o operador/terapeuta)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && jogando) parar();
  });
})();
