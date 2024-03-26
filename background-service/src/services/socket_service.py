from flask_socketio import SocketIO


class SocketService:
    def __init__(self, socketio: SocketIO) -> None:
        self.socketio: SocketIO = socketio

    def send_log(self, msg: str):
        self.socketio.emit("logs", msg, namespace = "/gameconnection")

    def move_to_front(self, move):
        self.socketio.emit("move_to_front", move, namespace = "/gameconnection")
