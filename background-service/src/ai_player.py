import subprocess
import sys

class Game:

    def __init__(self, ai_path: str) -> None:
        self.__process = None
        self.__path = ai_path

    def run_ai(self):
        runcommand = "poetry run python3 src/stupid_ai.py"
        runcommand_array = runcommand.strip().split(" ")
        self.__process = subprocess.Popen(
            args=runcommand_array,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=self.__path,
        )

    def input_move(self, move):
        if self.__process is None or self.__process.poll():
            return "failed :DDDDD"

        input_string = move + "\n"
        self.__process.stdin.write(input_string.encode("utf-8"))
        self.__process.stdin.flush()

        print(f"received move: {move}")

        while True:
            if not self.__process.stdout:
                break
            output = self.__process.stdout.readline().decode("utf-8")
            print(f"output: {output}")
            if output.startswith("MOVE: "):
                return output.replace("MOVE: ", "").strip()
    
        return output






