import subprocess
from entities.chess_game import Chess
from entities.game_logger import Logger

GAMETYPEDICT = {
    "chess": Chess,
}


class Game:

    def __init__(self, ai_path: str, gametype: str) -> None:
        self.__process = self.__run_ai(ai_path)
        self.__game = GAMETYPEDICT[gametype]()
        self.__logger = Logger()
        self.__error = ""

    def __run_ai(self, ai_path):
        runcommand = "poetry run python3 src/stupid_ai.py"
        runcommand_array = runcommand.strip().split(" ")
        process = subprocess.Popen(
            args=runcommand_array,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=ai_path,
        )

        if process is None or process.poll():
            self.__error = process.stderr.read().decode("utf-8")
            msg = f"Process {process.pid} failed with return code {process.poll()}:\n{self.__error}"
            raise RuntimeError(msg)

        return process

    def play_turn(self, move):
        output_move = ""
        try:
            output_move = self.__game.play_turn(move, self.__process, self.__logger)
        except RuntimeError as e:
            self.__error = str(e)
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
