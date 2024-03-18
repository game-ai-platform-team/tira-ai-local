import chess

class Chess():

    def __init__(self) -> None:
        self.__board = chess.Board()

    def __convert_uci_to_algebraic(self, uci_move: str) -> str:
        """
        Internal function used to handle discrepancies in notation
        """
        move = chess.Move.from_uci(uci_move)
        algebraic_move = self.__board.san(move)
        return algebraic_move

    def play_turn(self, move, ai_process, logger):
        """
        Plays a move and returns the answer from the ai that's attached to the Game instance

        Args:
            move (str): Move to be played
            ai_process: Process to be called

        Returns:
            GameState: A move in some sensible format
        """
        if ai_process is None or ai_process.poll():
            raise RuntimeError(f"Process {ai_process.pid} failed with return code {ai_process.poll()}:\n{ai_process.stderr.read().decode("utf-8")}")


        self.__board.push_uci(move)

        if move == "":
            input_string = "START: \n"
        else:
            input_string = "MOVE: " + move + "\n"
        ai_process.stdin.write(input_string.encode("utf-8"))
        ai_process.stdin.flush()

        while True:
            if not ai_process.stdout:
                break
            output = ai_process.stdout.readline().decode("utf-8")
            if not output:
                break
            if output.startswith("MOVE: "):
                move_out = self.__convert_uci_to_algebraic(output.replace("MOVE: ", "").strip())
                self.__board.push_san(move_out)
                return move_out
            else:
                logger.log(output.strip() + "\n")

        raise RuntimeError(f"Process {ai_process.pid} failed with return code {ai_process.poll()}:\n{ai_process.stderr.read().decode("utf-8")}")
    
    def set_board(self, fen: str):
        self.__board.set_fen(fen)

    def reset_board(self):
        self.__board.reset()