async function getState() {
  const response = await fetch("/api/game_state");
  return await response.json();
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

async function render() {
  const state = await getState();

  setText("maskedWord", state.masked);
  setText("turnPill", `Player Turn: ${state.current_player}`);
  setText("attemptPill", `Attempts Left: ${state.attempts_left}`);
  setText("guessedLetters", state.guessed.length ? state.guessed.join(", ") : "None");

  const messageEl = document.getElementById("message");
  const revealEl = document.getElementById("reveal");
  revealEl.textContent = "";

  if (state.status === "WIN") {
    messageEl.textContent = `✅ Player ${state.current_player} wins!`;
    const r = await fetch("/api/reveal");
    const data = await r.json();
    revealEl.textContent = `Word: ${data.word}`;
  } else if (state.status === "LOSE") {
    messageEl.textContent = "❌ Game over!";
    const r = await fetch("/api/reveal");
    const data = await r.json();
    revealEl.textContent = `Word: ${data.word}`;
  } else {
    messageEl.textContent = "Enter a letter and press Guess.";
  }
}

async function guessLetter() {
  const input = document.getElementById("letterInput");
  const letter = input.value.trim().toUpperCase();
  input.value = "";
  input.focus();

  const response = await fetch("/api/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ letter })
  });

  // If server returns an error, show it
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    setText("message", err.message || "Invalid guess.");
  }

  await render();
}

async function newGame() {
  await fetch("/api/new", { method: "POST" });
  setText("message", "New game started.");
  await render();
}

document.getElementById("guessBtn").addEventListener("click", guessLetter);
document.getElementById("newBtn").addEventListener("click", newGame);

document.getElementById("letterInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") guessLetter();
});

render();
