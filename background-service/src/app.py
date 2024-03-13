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
    try:
        game = Game(project_path, "chess")
        socketio.emit("logs", "Valid path. game process started.\n---------------------------------", namespace="/gameconnection")
    except:
        socketio.emit("logs", f"Invalid path: {project_path}.\n Please make sure that src is a subdirectory of this path", namespace="/gameconnection")

@socketio.on("move_to_back", namespace="/gameconnection")
def play_move(move):
    if game == None: 
        raise "No game detected"
    retval, logs = game.play_turn(move)
    socketio.emit("move_to_front", retval, namespace="/gameconnection")
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

