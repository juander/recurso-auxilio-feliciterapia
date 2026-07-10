# Recurso Auxílio Feliciterapia

Ferramenta de **apoio a um recurso terapêutico** do projeto **Feliciterapia** — terapia com brincadeiras.

Este é um site simples, **somente frontend** (HTML, CSS e JavaScript puro, sem bibliotecas), pensado para ser usado durante as atividades — inclusive com **pessoas idosas**. Por isso, a interface foi feita com **baixa carga cognitiva**: telas limpas, fonte grande, alto contraste e um único foco por vez.

🔗 Instagram do projeto: **[@feliciterapia](https://www.instagram.com/feliciterapia/)**

## A brincadeira

Um exercício de **atenção e lateralidade**:

1. Na tela inicial, escolha quantos **segundos** a seta ficará escondida entre uma aparição e outra (padrão: **3 segundos**) e toque em **Iniciar brincadeira**.
2. Uma **seta grande** aparece apontando para a **esquerda** ou **direita** (aleatório) e permanece visível por **2 segundos**.
3. A seta **some** pelo intervalo escolhido e, em seguida, **reaparece** apontando para um lado aleatório novamente — repetindo até parar.
4. Um botão discreto no canto (ou a tecla **Esc**) **para** a brincadeira e volta à tela inicial.

## Como usar

Basta abrir o arquivo `index.html` em qualquer navegador moderno — não é necessário servidor nem instalação.

```bash
open index.html
```

## Estrutura

```
index.html   # as duas telas (início e foco)
styles.css   # identidade visual e layout (tokens de cor da marca)
app.js       # lógica do ciclo da seta
assets/      # logotipo (PNG/WebP) e favicons
```

## Identidade visual

Paleta extraída do logotipo da Feliciterapia:

| Cor | Uso | Hex |
|-----|-----|-----|
| 🔴 Vermelho | Marca / destaque | `#E10A28` |
| 🔵 Azul | Ação / seta / sorriso | `#3352A3` |
| 🌸 Rosa | Apoio / decorativo | `#FDADCD` |
| ⚪ Branco quente | Fundo | `#FDF9F8` |
