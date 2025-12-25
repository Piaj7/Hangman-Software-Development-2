from flask import Flask, render_template, request, jsonify, session 
from random import choice
import string

app = Flask(__name__)
app.secret_key = 'FayaazHangmanSecretKey'

# List of words to choose from
WORDS = ['Rayyan', 'Sayf', 'Kalid', 'Fayaaz', 'MK', 'Daniel',]
# Maximum attempts allowed
MAX_ATTEMPTS = 6

def new_game_state():
    word = choice(WORDS).upper()
    return {
        "word": word,
        "guessed": [],          # list of letters guessed
        "attempts_left": MAX_ATTEMPTS,
        "current_player": 1,    # player 1 starts
        "status": "PLAYING"     # PLAYING / WIN / LOSE
    }

def masked_word(word: str, guessed: list[str]) -> str:
    return ' '.join([letter if letter in guessed else '_' for letter in word])

def is_winner(word: str, guessed: list[str]) -> bool:
    return all(letter in guessed for letter in word)

@app.route('/')
def index():
    if 'game_state' not in session:
        session['game_state'] = new_game_state()
        session.modified = True
    return render_template("index.html")

@app.route("/api/game_state", methods=['GET'])
def api_game_state():
    game_state = session.get('game_state', new_game_state())
    word_display = masked_word(game_state['word'], game_state['guessed'])
    return jsonify({
        "word": word_display,
        "guessed": game_state['guessed'],
        "attempts_left": game_state['attempts_left'],
        "current_player": game_state['current_player'],
        "status": game_state['status']
    })

@app.route("/api/guess", methods=['POST'])
def api_guess():
    session.modified = True
    session["game_state"] = new_game_state()
    return jsonify({"ok": True})

@app.route("/api/guess", methods=['POST'])
def api_make_guess():
    data = request.json
    letter = data.get('letter', '').upper()
    game_state = session.get('game_state', new_game_state())

    if game_state['status'] != "PLAYING":
        return jsonify({"error": "Game is over"}), 400

    if letter not in string.ascii_uppercase or len(letter) != 1:
        return jsonify({"error": "Invalid letter"}), 400

    if letter in game_state['guessed']:
        return jsonify({"error": "Letter already guessed"}), 400

    game_state['guessed'].append(letter)

    if letter not in game_state['word']:
        game_state['attempts_left'] -= 1

    if is_winner(game_state['word'], game_state['guessed']):
        game_state['status'] = "WIN"
    elif game_state['attempts_left'] <= 0:
        game_state['status'] = "LOSE"

    game_state['current_player'] = 2 if game_state['current_player'] == 1 else 1

    session['game_state'] = game_state
    session.modified = True

    return jsonify({"ok": True})

@app.route("/api/reveal", methods=['GET'])
def api_reveal():
    """Optional endpoint to reveal the word."""
    game = session.get('game_state', new_game_state())
    if game['status'] == "PLAYING":
        return jsonify({"error": "Game is still in progress"}), 400
    return jsonify({"word": game['word']})

if __name__ == '__main__':
    app.run(debug=True)