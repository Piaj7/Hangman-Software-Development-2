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
