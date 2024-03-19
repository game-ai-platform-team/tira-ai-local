import subprocess

class GameProcess():

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

        if process is None or process.poll():
            self.__error = process.stderr.read().decode("utf-8")
            msg = f"Process {process.pid} failed with return code {process.poll()}:\n{self.__error}"
            raise RuntimeError(msg)

        return process
