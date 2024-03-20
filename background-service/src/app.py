from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

from entities.ai_directory import AiDirectory
from entities.game import Game

app = Flask("game-ai-testing-platform")
app.config.update(
    {
        "SECRET_KEY": "secret!",
    }
)
socketio = SocketIO(app, cors_allowed_origins = "*")
CORS(app)

game = None


@socketio.on("startgame", namespace = "/gameconnection")
def io_startgame(project_path, board_position, runsetup):
    global game
    try:
        directory = AiDirectory(project_path)
        if runsetup:
            socketio.emit("logs", f"Running setup.sh in {project_path}",namespace = "/gameconnection")
            directory.run_setup()
        game = Game("chess", directory)
        socketio.emit(
            "logs",
            f"Valid path. Running AI opponent in process {game.get_pid()}\n---------------------------------",
            namespace = "/gameconnection",
        )
    except Exception as e:
        socketio.emit(
            "logs",
            f"Invalid path: {project_path}. {e}\n",
            namespace = "/gameconnection",
        )

    try:
        if board_position != "":
            game.set_board(board_position)
        else:
            game.reset_board()
    except Exception as e:
        socketio.emit(
            "logs",
            f"Setting board with {board_position} failed: \n {e}",
            namespace = "/gameconnection",
        )


@socketio.on("move_to_back", namespace = "/gameconnection")
def play_move(move):
    if game is None:
        raise ValueError("No game detected")
    retval, logs, error = game.play_turn(move)
    print(retval, logs, error)
    socketio.emit("move_to_front", retval[1], namespace = "/gameconnection", )
    socketio.emit(
        "logs",
        f"{retval[0]}:\n{logs}\n---------------------------------",
        namespace = "/gameconnection",
    )
    if error != "":
        socketio.emit(
            "logs",
            error + "\n---------------------------------",
            namespace = "/gameconnection",
        )


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
