from flask import (
    Flask,
    request,
)
from flask_socketio import SocketIO
from socket_service import SocketService

app = Flask("game-ai-testing-platform")
app.config.update(
    {
        "SECRET_KEY": "secret!",
    }
)
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
)

@socketio.on("startgame", namespace="/gameconnection")
def io_startgame(data):
    socket_service = SocketService(socketio, request.sid)

    #api.start(socket_service, data["githubUrl"], data["elo"], active_game=data["game"])
    print("gabagool")


def run():
    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        # debug = True,
    )
