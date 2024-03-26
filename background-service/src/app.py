from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

from entities.ai_directory import AiDirectory
from services.game_service import GameService
from services.socket_service import SocketService

app = Flask("game-ai-testing-platform")
app.config.update(
    {
        "SECRET_KEY": "secret!",
    }
)
socketio = SocketIO(app, cors_allowed_origins = "*")
CORS(app)

socketService: SocketService = SocketService(socketio)
gameService: GameService = GameService(socketService)


@socketio.on("startgame", namespace = "/gameconnection")
def io_startgame(project_path, board_position, runsetup):
    ai_directory = AiDirectory(project_path)
    gameService.start_game(ai_directory, board_position, runsetup)


@socketio.on("move_to_back", namespace = "/gameconnection")
def io_move_to_back(move):
    gameService.move_to_back(move)


def run():
    socketio.run(
        app,
        host = "0.0.0.0",
        port = 5000,
        debug = True,
        # TODO: Fix werkzeug
        allow_unsafe_werkzeug = True,
    )


if __name__ == "__main__":
    run()
