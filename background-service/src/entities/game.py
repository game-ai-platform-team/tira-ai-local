import subprocess
from entities.chess_game import Chess
from entities.game_logger import Logger

GAMETYPEDICT = {
    "chess": Chess,
}

class Game():

    def __init__(self, ai_path: str, gametype: str) -> None:
        self.__process = self.__run_ai(ai_path)
        self.__game = GAMETYPEDICT[gametype]()
        self.__logger = Logger()

    def __run_ai(self, ai_path):
        runcommand = "poetry run python3 src/stupid_ai.py"
        runcommand_array = runcommand.strip().split(" ")
        return subprocess.Popen(
            args = runcommand_array,
            stdin = subprocess.PIPE,
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE,
            cwd = ai_path,
        )

    def play_turn(self, move):
        output_move = self.__game.play_turn(move, self.__process, self.__logger)
        logs = self.__logger.get_and_clear_logs()
        return output_move, logs
