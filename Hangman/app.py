from flask import Flask, render_template, request, jsonify, session
from random import choice
import string

app = Flask(__name__)
app.secret_key = "FayaazHangmanSecretKey"

WORDS = ["RAYYAN", "SAYF", "KALID", "FAYAAZ", "MK", "DANIEL"]
MAX_ATTEMPTS = 6


def new_game_state():
    word = choice(WORDS)
    return {
        "word": word,
        "guessed": [],
        "attempts_left": MAX_ATTEMPTS,
        "current_player": 1,
        "status": "PLAYING"
    }


def masked_word(word: str, guessed: list[str]) -> str:
    return " ".join([ch if ch in guessed else "_" for ch in word])


def is_winner(word: str, guessed: list[str]) -> bool:
    return all(ch in guessed for ch in word)


@app.route("/")
def index():
    if "game_state" not in session:
        session["game_state"] = new_game_state()
        session.modified = True
    return render_template("index.html")


@app.route("/api/game_state", methods=["GET"])
def api_game_state():
    game = session.get("game_state", new_game_state())
    session["game_state"] = game
    session.modified = True

    return jsonify({
        "masked": masked_word(game["word"], game["guessed"]),
        "guessed": game["guessed"],
        "attempts_left": game["attempts_left"],
        "current_player": game["current_player"],
        "status": game["status"]
    })


@app.route("/api/new", methods=["POST"])
def api_new():
    session["game_state"] = new_game_state()
    session.modified = True
    return jsonify({"ok": True})


@app.route("/api/guess", methods=["POST"])
def api_guess():
    game = session.get("game_state", new_game_state())

    if game["status"] != "PLAYING":
        return jsonify({"ok": False, "message": "Game is over. Start a new game."}), 400

    data = request.get_json(silent=True) or {}
    letter = (data.get("letter") or "").upper().strip()

    # validate A-Z single letter
    if len(letter) != 1 or letter not in string.ascii_uppercase:
        return jsonify({"ok": False, "message": "Enter one letter A-Z."}), 400

    # ignore duplicate guesses (no penalty)
    if letter in game["guessed"]:
        session["game_state"] = game
        session.modified = True
        return jsonify({"ok": True, "message": "Already guessed."})

    game["guessed"].append(letter)

    # wrong guess: lose attempt and switch player
    if letter not in game["word"]:
        game["attempts_left"] -= 1
        game["current_player"] = 2 if game["current_player"] == 1 else 1

    # win/lose checks
    if is_winner(game["word"], game["guessed"]):
        game["status"] = "WIN"
    elif game["attempts_left"] <= 0:
        game["status"] = "LOSE"

    session["game_state"] = game
    session.modified = True
    return jsonify({"ok": True})


@app.route("/api/reveal", methods=["GET"])
def api_reveal():
    game = session.get("game_state", new_game_state())
    if game["status"] == "PLAYING":
        return jsonify({"ok": False, "message": "Game still in progress."}), 400
    return jsonify({"ok": True, "word": game["word"]})


if __name__ == "__main__":
    app.run(debug=True)
