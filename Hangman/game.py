from flask import Flask, render_template, request, jsonify, session
from random import choice
import string

app = Flask(__name__)
app.secret_key = 'FayaazHangmanSecretKey'

WORDS = ['Rayyan', 'Sayf', 'Kalid', 'Fayaaz', 'MK', 'Daniel',]
MAX_ATTEMPTS = 6

