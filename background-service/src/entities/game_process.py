import subprocess


class GameProcess:

    def __init__(self, ai_path) -> None:
        self.process = self.__run_ai(ai_path)

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

        if self.process is None or self.process.poll():
            self.__raise_runtime_error()

        return process

    def __raise_runtime_error(self):
        raise RuntimeError(
            f"Process {self.process.pid} failed with return code "
            f"{self.process.poll()}:\n"
            f"{self.process.stderr.read().decode('utf-8')}"
        )

    def play(self):
        self.process.stdin.write("PLAY:\n".encode("utf-8"))
        self.process.stdin.flush()
        output = ""
        while True:
            if not self.process.stdout:
                self.__raise_runtime_error()
            output = self.process.stdout.readline().decode("utf-8")
            if not output:
                self.__raise_runtime_error()
            if output.startswith("MOVE:"):
                output = output.replace("MOVE:", "").strip()
                break

        return output

    def reset(self):
        self.process.stdin.write("RESET:\n".encode("utf-8"))
        self.process.stdin.flush()

    def board(self, position):
        self.process.stdin.write(f"BOARD:{position}\n")
        self.process.stdin.flush()

    def move(self, move):
        self.process.stdin.write(f"MOVE:{move}\n")
        self.process.stdin.flush()

    def get_pid(self):
        return self.process.pid
