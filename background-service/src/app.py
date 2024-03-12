from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from entities.game import Game
import sys

app = Flask("game-ai-testing-platform")
app.config.update({
    "SECRET_KEY": "secret!",
})
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

game = None

@socketio.on("startgame", namespace="/gameconnection")
def io_startgame(project_path):
    global game
    game = Game(project_path, "chess")

@socketio.on("move", namespace="/gameconnection")
def play_move(move):
    if game == None: 
        raise "No game detected"
    retval, logs = game.play_turn(move)
    socketio.emit("move", retval, namespace="/gameconnection")
    socketio.emit("logs", logs, namespace="/gameconnection")

def run():
    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        debug = True,
        #TODO: Fix werkzeug
        allow_unsafe_werkzeug = True
    )

if __name__ == "__main__":
    run()

