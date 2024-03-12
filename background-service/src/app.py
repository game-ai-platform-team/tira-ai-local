from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from ai_player import Game
import sys

app = Flask("game-ai-testing-platform")
app.config.update({
    "SECRET_KEY": "secret!",
})
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

player = None

@socketio.on("startgame", namespace="/gameconnection")
def io_startgame(project_path):
    global player
    player = Game(project_path)
    player.run_ai()

@socketio.on("move", namespace="/gameconnection")
def play_move(move):
    print(move, file=sys.stderr)
    if player == None: 
        raise "No player detected"

    retval = player.input_move(move)

    socketio.emit("move", retval, namespace="/gameconnection")

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

