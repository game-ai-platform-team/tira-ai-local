from unittest import TestCase
from unittest.mock import Mock

from services.socket_service import SocketService


class TestSocketService(TestCase):
    def setUp(self):
        pass

    def test_send_log(self):
        socketio = Mock()
        socket_service = SocketService(socketio)
        msg = "Error in testi: Testi is being executed."
        socket_service.send_log(msg)
        socketio.emit.assert_called_once_with("logs", msg, namespace = "/gameconnection")
