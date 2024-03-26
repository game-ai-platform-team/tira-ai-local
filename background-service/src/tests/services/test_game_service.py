from unittest import TestCase
from unittest.mock import Mock

from services.game_service import GameService


class TestGameService(TestCase):
    def setUp(self):
        pass

    def test_start_game_works(self):
        ai_directory = Mock()
        socket_service = Mock()
        game_service = GameService(socket_service)
        game_service.start_game(ai_directory, "", False)
        ai_directory.run_ai.assert_called()

    def test_start_game_fails(self):
        ai_directory = Mock()
        exception = Exception("Fail :--DDDD")
        ai_directory.run_ai = Mock(side_effect = exception)
        socket_service = Mock()
        game_service = GameService(socket_service)

        game_service.start_game(ai_directory, "", False)

        log = f"Error creating game:\n{str(exception)}"
        socket_service.send_log.assert_called_with(log)
