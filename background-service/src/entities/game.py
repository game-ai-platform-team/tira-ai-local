from chess import InvalidMoveError
from entities.chess_game import Chess
from entities.game_logger import Logger
from entities.ai_directory import AiDirectory

GAMETYPEDICT = {
    "chess": Chess,
}


class Game:

    def __init__(self, gametype: str, ai_directory: AiDirectory) -> None:
        self.ai_directory = ai_directory
        self.ai_directory.run_ai()
        self.__process = ai_directory.process
        self.__game = GAMETYPEDICT[gametype]()
        self.__logger = Logger()
        self.__error = ""

    def play_turn(self, move):
        output_move = "", ""
        try:
            output_move = self.__game.play_turn(move, self.__process, self.__logger)
        except RuntimeError as e:
            self.__error = str(e)
        except InvalidMoveError as e:
            self.__error = f"Invalid move: {str(e)}"
        logs = self.__logger.get_and_clear_logs()
        return output_move, logs, self.__error

    def add_move(self, move):
        self.__process.move(move)

    def get_move(self):
        return self.__process.play()

    def set_board(self, board_position):
        self.__process.board(board_position)

    def reset_board(self):
        self.__process.reset()

    def get_pid(self):
        return self.__process.get_pid()
