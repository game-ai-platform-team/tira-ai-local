from chess import InvalidMoveError
from entities.chess_game import Chess
from entities.game_logger import Logger
from entities.game_process import GameProcess

GAMETYPEDICT = {
    "chess": Chess,
}


class Game:

    def __init__(self, ai_path: str, gametype: str) -> None:
        self.__process = GameProcess(ai_path)
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

    def set_board(self, board_position):
        self.__game.set_board(board_position)
        self.__process.stdin.write(f"BOARD: {board_position}\n".encode("utf-8"))
        self.__process.stdin.flush()

    def reset_board(self):
        self.__game.reset_board()

    def get_pid(self):
        return self.__process.pid
