async function getState() {
    const response = await fetch('/state');
    return await response.json();
}

function setText(id, text) {
    document.getElementById(id).innerText = text;
}

async function render() {
    const state = await getState();

    setText("maskedWord", state.masked);
    setText("turnPill", `Player Turn: ${state.current_player}`);
    setText("attemptPill", `Attempts Left: ${state.attempts_left}`);
    setText("guessedLetters", state.guessed.length ? state.guessed.join(", ") : "None");
    
    const messageElement = document.getElementById("message");
    const revealElement = document.getElementById("revealWord");
    revealElement.textContent = "";

    if (state.status === "won") {
        messageElement.innerText = `Congratulations! Player ${state.current_player} has won!`;
        revealElement.textContent = `The word was: ${state.word}`;
    } else if (state.status === "lost") {
        messageElement.innerText = `Game Over! Player ${state.current_player} has lost.`;
        revealElement.textContent = `The word was: ${state.word}`;
    } else {
        messageElement.innerText = "Enter a letter and press Guess!";
    }

}
async function guessLetter() {
    const letterInput = document.getElementById("letterInput");
    const letter = letterInput.value.trim().toLowerCase();
    letterInput.value = "";
    InputDeviceInfo.focus();

    const response = await fetch('/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ letter: letter })
    });

    if (response.ok) {
        const err = await response.json().catch(() => ({}));
        setText("errorMessage", err.error || "Incorrect Guess!");
    }

    await render();
}

async function startGame() {
    await fetch('/start', { method: 'POST' });
    setText("message", "Game Started! Enter a letter and press Guess!");
    await render();
}

document.getElementById("guessButton").addEventListener("click", guessLetter);
document.getElementById("startButton").addEventListener("click", startGame);

document.getElementById("letterInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});

render();