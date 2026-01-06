// Maximum number of attempts (must match backend)
const MAX_ATTEMPTS = 6;

// Fetch the current game state from the backend
async function getState() {
  const response = await fetch("/api/game_state");
  return await response.json();
}


// Helper function to update text content of an element
function setText(id, text) {
  document.getElementById(id).textContent = text;
}

// ASCII representations of the Hangman for each incorrect guess
const HANGMAN_STAGES = [
` 
    
    
    
    
_____
`,
` 
 |
 |
 |
 |
_|___
`,
`  ______
 |/
 |
 |
 |
_|___
`,
`  ______
 |/   |
 |
 |
 |
_|___
`,
`  ______
 |/   |
 |    O
 |
 |
_|___
`,
`  ______
 |/   |
 |    O
 |    |
 |
_|___
`,
`  ______
 |/   |
 |    O
 |   /|\\
 |   / \\
_|___
`
];
// Updates the hangman drawing based on incorrect guesses
function setHangmanStage(wrongGuesses) {
  const stage = Math.max(0, Math.min(6, wrongGuesses));
  document.getElementById("hangmanStage").textContent = HANGMAN_STAGES[stage];
}

// Renders the entire game UI based on the current state
async function render() {
  const state = await getState();

  // Update hangman drawing
  const wrongGuesses = MAX_ATTEMPTS - state.attempts_left;
  setHangmanStage(wrongGuesses);

  // Update UI text
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
// Sends a guessed letter to the backend
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
