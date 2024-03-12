import subprocess
import chess

class Game:

    def __init__(self, ai_path: str) -> None:
        self.__process = None
        self.__path = ai_path
        self.__board = chess.Board()

    def run_ai(self):
        runcommand = "poetry run python3 src/stupid_ai.py"
        runcommand_array = runcommand.strip().split(" ")
        self.__process = subprocess.Popen(
            args = runcommand_array,
            stdin = subprocess.PIPE,
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE,
            cwd = self.__path,
        )

    def convert_uci_to_algebraic(self, uci_move: str) -> str:
        move = chess.Move.from_uci(uci_move)
        algebraic_move = self.__board.san(move)
        return algebraic_move

    def input_move(self, move):
        if self.__process is None or self.__process.poll():
            return "failed :DDDDD"
        
        self.__board.push_uci(move)

        input_string = move + "\n"
        self.__process.stdin.write(input_string.encode("utf-8"))
        self.__process.stdin.flush()

        while True:
            if not self.__process.stdout:
                break
            output = self.__process.stdout.readline().decode("utf-8")
            if not output:
                break
            if output.startswith("MOVE: "):
                move_out = self.convert_uci_to_algebraic(output.replace("MOVE: ", "").strip())
                self.__board.push_san(move_out)
                return move_out

        return ""
