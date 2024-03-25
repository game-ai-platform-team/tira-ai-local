from unittest import TestCase
from unittest.mock import Mock

from entities.game import Game


class TestGame(TestCase):
    def setUp(self) -> None:
        pass

    def test_game_calls_ai_directory(self):
        mock = Mock()
        game = Game(mock)
        mock.run_ai.assert_called()
