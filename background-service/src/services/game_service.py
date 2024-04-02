from entities.ai_directory import AiDirectory
from entities.game import Game
from services.socket_service import SocketService


class GameService:
    def __init__(self, socket_service: SocketService):
        self.game: Game | None = None
        self.socket_service = socket_service

    def start_game(self, ai_directory: AiDirectory, board_position, runsetup):
        self.socket_service.send_log(f"Trying start AI process in {ai_directory.ai_path}...")
        try:
            if runsetup:
                self.socket_service.send_log(
                    f"Running setup.sh in {ai_directory.ai_path}/tiraconfig/setup.sh..."
                )
                ai_directory.run_setup()
            self.game = Game(ai_directory)
            self.socket_service.send_log(
                f"Success! Running AI opponent in process {ai_directory.get_pid()}\n---------------------------------"
            )
        except Exception as e:
            self.socket_service.send_log(f"Error creating game:\n{str(e)}")
            return

        try:
            if board_position != "":
                self.game.set_board(board_position)
            else:
                self.game.reset_board()
        except Exception as e:
            self.socket_service.send_log(
                f"Setting board with {board_position} failed: \n {str(e)}"
            )

    def move_to_back(self, move: str, return_move: bool):
        error = ""
        output = ""
        logs = []

        if self.game is None:
            raise ValueError("No game detected")

        if move == "" and return_move:
            output, logs = self.game.get_move()
            self.socket_service.move_to_front(output)
            self.socket_service.send_log(f"{'\n'.join(logs)}\n---------------------------------")
            return

        self.game.add_move(move)

        if return_move:
            try:
                output, logs = self.game.get_move()
            except RuntimeError as e:
                error = str(e)
            if output != "":
                self.socket_service.move_to_front(output)
            logs_lined = "\n".join(logs)
            self.socket_service.send_log(
                f"{output}:\n{logs_lined}\n---------------------------------"
            )
            if error != "":
                self.socket_service.send_log(error + "\n---------------------------------")

    def set_board(self, board_position):
        try:
            self.game.set_board(board_position)
        except Exception as e:
            self.socket_service.send_log(
                f"Setting board with {board_position} failed: \n {str(e)}"
            )

    def kill_process(self):
        return_code = self.game.kill()
        self.socket_service.send_log(f"Killed process {self.game.ai_directory.get_pid()} with return code {return_code}")
