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

    def test_move_to_back_works(self):
        ai_move = "a7a5"
        player_move = "a2a3"

        ai_directory = Mock()
        ai_directory.play.return_value = ai_move, []
        socket_service = Mock()
        game_service = GameService(socket_service)
        game_service.start_game(ai_directory, "", False)

        game_service.move_to_back(player_move)

        ai_directory.move.assert_called_once_with(player_move)
        socket_service.move_to_front.assert_called_once_with(ai_move)

    def test_move_to_back_fails(self):
        ai_move = "a7a5"
        player_move = "a2a3"

        ai_directory = Mock()

        exception = RuntimeError("Fail :--DDDD")
        ai_directory.play = Mock(side_effect = exception)

        socket_service = Mock()
        game_service = GameService(socket_service)
        game_service.start_game(ai_directory, "", False)

        game_service.move_to_back(player_move)

        log = str(exception) + "\n---------------------------------"
        socket_service.send_log.assert_called_with(log)
