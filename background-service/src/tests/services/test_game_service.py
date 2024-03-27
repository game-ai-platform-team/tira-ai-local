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
        ai_directory.run_ai = Mock(side_effect=exception)
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
        ai_directory.play = Mock(side_effect=exception)

        socket_service = Mock()
        game_service = GameService(socket_service)
        game_service.start_game(ai_directory, "", False)

        game_service.move_to_back(player_move)

        log = str(exception) + "\n---------------------------------"
        socket_service.send_log.assert_called_with(log)

    def test_set_board_works(self):
        ai_move = "a7a5"

        ai_directory = Mock()
        ai_directory.play.return_value = ai_move, []
        socket_service = Mock()
        game_service = GameService(socket_service)
        game_service.start_game(ai_directory, "", False)
        position = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
        game_service.set_board(position)

        ai_directory.board.assert_called_once_with(position)

    def test_set_board_fails(self):
        ai_move = "a7a5"
        exception = "Setting board with rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1 failed: \n Fail :--DDDD"
        ai_directory = Mock()
        ai_directory.play.return_value = ai_move, []
        socket_service = Mock()
        game_service = GameService(socket_service)
        game_service.start_game(ai_directory, "", False)
        position = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
        ai_directory.board = Mock(side_effect=Exception("Fail :--DDDD"))
        game_service.set_board(position)

        socket_service.send_log.assert_called_with(exception)
