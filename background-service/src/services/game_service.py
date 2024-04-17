from entities.ai_directory import AiDirectory
from entities.game import Game
from services.socket_service import SocketService
from time import perf_counter


class GameService:
    def __init__(self, socket_service: SocketService):
        self.game: Game | None = None
        self.socket_service = socket_service

    def start_game(self, ai_directory: AiDirectory, board_position, runsetup):
        self.socket_service.send_log(
            f"Starting AI process from {ai_directory.ai_path}..."
        )
        try:
            if runsetup:
                self.socket_service.send_log(
                    f"Running setup.sh in {ai_directory.ai_path}/tiraconfig/setup.sh..."
                )
                ai_directory.run_setup()
            self.game = Game(ai_directory)
            self.socket_service.send_log(
                f"Success! Running AI opponent in process {ai_directory.get_pid()}"
            )
        except RuntimeError as e:
            self.socket_service.send_log(f"Error creating game:\n{str(e)}")
            return

        try:
            if board_position != "":
                self.game.set_board(board_position)
            else:
                self.game.reset_board()
        except RuntimeError as e:
            self.socket_service.send_log(
                f"Setting board with {board_position} failed:\n{str(e)}"
            )

    def move_to_back(self, move: str, return_move: bool):
        error = ""
        output = ""
        logs = []

        if self.game is None:
            self.socket_service.send_log("No game detected!")
            return

        if move != "":
            self.game.add_move(move)

        if return_move:
            start_time = perf_counter()
            try:
                output, logs = self.game.get_move()
            except RuntimeError as e:
                error = str(e)
            if output != "":
                end_time = (perf_counter() - start_time) * 1000
                self.socket_service.move_to_front(output)
            logs_lined = "\n".join(logs)
            if error != "":
                self.socket_service.send_log(error)
                self.socket_service.send_runtime_error()
            else:
                self.socket_service.send_log(
                    f"Recieved Move: {output} | Time: {round(end_time)} ms | Logs:\n{logs_lined}"
                )

    def set_board(self, board_position):
        self.socket_service.send_log(f"Setting AI board to {board_position}")
        try:
            self.game.set_board(board_position)
        except RuntimeError as e:
            self.socket_service.send_log(f"Setting board failed: \n {str(e)}")

    def kill_process(self):
        if self.game is not None:
            if self.game.poll() is not None:
                self.socket_service.send_log("No active process!")
            else:
                return_code = self.game.kill()
                self.socket_service.send_log(
                    (
                        f"Killed process {self.game.ai_directory.get_pid()} "
                        f"with return code {return_code}"
                    )
                )
