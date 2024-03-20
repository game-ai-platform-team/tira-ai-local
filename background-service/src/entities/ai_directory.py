import subprocess
from os import path


class AiDirectory:

    def __init__(self, ai_path) -> None:
        self.ai_path = ai_path
        self.process = None

    def run_setup(self):
        process = subprocess.run(["bash", "tiraconfig/setup.sh"], cwd = self.ai_path)

    def run_ai(self):
        runcommand = ""
        with open(path.join(self.ai_path, "tiraconfig/runcommand")) as command_file:
            runcommand = command_file.readline()
        runcommand_array = runcommand.strip().split(" ")
        process = subprocess.Popen(
            args = runcommand_array,
            stdin = subprocess.PIPE,
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE,
            cwd = self.ai_path,
        )

        if process is None or process.poll():
            self.__error = process.stderr.read().decode("utf-8")
            msg = f"Process {process.pid} failed with return code {process.poll()}:\n{self.__error}"
            raise RuntimeError(msg)

        self.process = process
