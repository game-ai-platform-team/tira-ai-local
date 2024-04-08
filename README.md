# tira-ai-local

Simple program to test game AI's. Currently supports Chess and Connect Four.

1. [Installation](#installation)
2. [Usage](#usage)
    - [AI Configuration](#ai-configuration)
    - [AI Structure](#ai-structure)
    - [AI Communication Protocol (Input)](#ai-communication-protocol-input)
    - [AI Communication Protocol (Output)](#ai-communication-protocol-output)
3. [Game Specific Instructions](#game-specific-instructions)
    - [Chess](#chess)
    - [Connect Four](#connect-four)

## Installation

Download the [latest release](https://github.com/game-ai-platform-team/tira-ai-local/releases), unzip the package, and then run the `tira-ai-local` executable.

<details>
    <summary>Alternative Installation</summary>

#### Requirements

Ensure you have the following prerequisites installed on your system:

-   [Python](https://www.python.org/) 3.10 or newer
-   [Node.js](https://nodejs.org/en/download/current)
-   [Poetry](https://python-poetry.org/docs/#installation)

#### Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/game-ai-platform-team/tira-ai-local.git
    ```
2. Navigate to the `background-service` directory:
    ```bash
    cd tira-ai-local/background-service
    ```
3. Install the Python dependencies using Poetry:
    ```bash
    poetry install
    ```
4. Build the background service:
    ```bash
    poetry run invoke build
    ```
5. Navigate to the `app` directory:
    ```bash
    cd ../app
    ```
6. Install the Node.js dependencies using npm:
    ```bash
    npm install
    ```
7. Start the program:
    ```bash
    npm start
    ```

If you make any changes to the background service, you will have to build it again. If you want your changes to immediately take effect, instead of building the background service, you can also start it separately from the main app. In this case, open two terminals, one in `./app` and one in `./background-service`.

1. In `./background-service` run
    ```bash
    poetry run python3 src/app.py
    ```
2. Then in `./app` run
    ```bash
    npm start
    ```

#### Building Instructions

1. In the `./background-service` directory, run:
    ```bash
    poetry run invoke build
    ```
2. In the `./app` directory, run:
    ```bash
    npm run make
    ```

The built program can be found in the `./app/out/tira-ai-local-<platform>/` directory.

</details>

## Usage

Refer to the [example project](https://github.com/game-ai-platform-team/stupid-chess-ai) for a simple chess AI compatible with this program.

### AI Configuration

To integrate your AI project with this program, follow these steps:

1. **Directory Structure**: Organize your project with the following directory structure:

    ```
    /root
    |-- /src
    |-- /tiraconfig
    |   |-- runcommand
    |   |-- setup.sh
    ```

2. **runcommand**: This file contains the command to start your AI. It should be located within the `tiraconfig` directory. For example, if your Python AI is run from `main.py` within the `src` directory, the run command would be:

    ```bash
    python3 src/main.py
    ```

3. **setup.sh**: This shell script installs the dependencies of your AI and is executed when the "Run setup.sh?" option is toggled on. For Python projects using Poetry for dependency management, the setup script might look like this:

    ```shell
    poetry install
    ```

    Remeber that when using poetry, your `runcommand` would now look like this:

    ```bash
    poetry run python3 src/main.py
    ```

### AI Structure

Your AI should consist of a loop that runs continuously for the duration of the game. Make sure that your AI never exits the loop to keep it working with the program. In case your AI encounters an issue or gets stuck, you can use the `kill process` button to stop it or resubmit the path to restart the process.

<details>
    <summary>Python Example</summary>

```python
def main():
    while True:
        # Read input commands from the program
        command = input().strip()
        
        # Process input commands and generate output responses
        # Implement your AI logic here
        
if __name__ == "__main__":
    main()
```

</details>

### AI Communication Protocol (Input)

The program communicates with your AI using the standard pipe (command line). Your AI should read these commands as it would read any other input from the command line. In Python this would be `input()`.

Each command follows the format:

```
TAG:DATA
```

`TAG` represents the type of command and `DATA` is the accompanying data.

#### Tags

-   `MOVE:<move>`

    -   Process the opponent's move.
    -   **Data Format**: The move made by the opponent.
    -   **Example**: `MOVE:e2e4` indicates white's opening move in chess.

-   `PLAY:`

    -   Play one move in the current position.
    -   **Data Format**: None.

-   `BOARD:<board_state>`

    -   Set the board to the specified state.
    -   **Data Format**: A string representing the board state.
    -   **Example**: `BOARD:rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` sets a chess board to the starting position.

-   `RESET:`
    -   Reset the board to the starting position.
    -   **Data Format**: None.

<details>
    <summary>Reading Tags Python Example</summary>

```python
def main():
    while True:
        command = input().strip()
        if not command:
            continue

        tag, data = command.split(":", 1)

        if tag == "MOVE":
            # Handle opponent's move
        elif tag == "PLAY":
            # Play a move
        elif tag == "BOARD":
            # Set the board state
        elif tag == "RESET":
            # Reset the board

if __name__ == "__main__":
    main()
```

</details>

### AI Communication Protocol (Output)

The program reads your AI's output from the standard pipe (command line). In Python, you can use `print()` statements to provide moves to the program. The program will read data until the first newline character (`\n`), after which it will process the received move. By default, Python's `print()` statements automatically include a newline at the end.

There is only one tag for output, `MOVE:`, which is used similarly to input. When given a `PLAY`-tag, your AI should write `MOVE:<move>` to the command line.

**Note**: Any outputs to the console that do not begin with `MOVE:` will be displayed in the log box of the program under the most recent `MOVE:` output. You can use this to debug your AI.

<details>

<summary>Example</summary>

This chess "AI" chooses predetermined moves from a list.

```python
def main():
    moves = ["e2e4", "b8b6", "g7g5", "c7c6", ... ]

    for move in moves:
        command = input().strip()

        print("This is before a move is returned")

        print(f"I moved {move}")
        print(f"MOVE.{move}") # This is not read as a move
        print(f"MOVE:{move}") # Only this is read as a valid move

        print("This is after a move is returned")

if __name__ == "__main__":
    main()
```

In this example, the program would read `e2e4` as the output from your AI. If your AI returns `e7e5` as the next move, the log box would display:

```
---------------------------------
15:44:02: e7e5:
This is before a move is returned
I moved e2e4
MOVE.e2e4
---------------------------------
```

The program would then process the move e2e4 and wait for further input. After receiving the next input, `test` would be displayed in the log box under the next `MOVE:`. If your AI chose `b8a6` as its move, the log box would display:

```
---------------------------------
15:44:05: b8a6:
This is after a move is returned
This is before a move is returned
I moved b8b6
MOVE.b8b6
---------------------------------
```

</details>

## Game Specific Instructions

### Chess

#### Moves (UCI)

Moves are communicated using [Universal Chess Interface (UCI)](https://en.wikipedia.org/wiki/Universal_Chess_Interface). In short, in UCI moves are represented as two squares, the origin and destination of the moving piece. For example `e2e4` means that the piece in `e2` (pawn at game start) moves to `e4`.

Promotions are represented by a single character at the end of the move. If a pawn in `e7` moves to `e8` and promotes to a queen, this is written as `e7e8q`. Possible promotions are knight (`k`), rook (`r`), bishop (`b`) and queen (`q`).

When castling, the king is the moving piece. For example, if white castles kingside, this is written as `e1g1`.

#### Boards (FEN)

Boards are represented using [Forsyth–Edwards Notation (FEN)](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation). A FEN string is a record of a game position. The string is formed from 6 different parts, each separated using a space. Below is a breakdown of the starting position FEN.

`rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`

1. **Piece placement data:** `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`
    - Each row of the chess board, from left to right (from white's perspective) separeted with slashes (`/`)
    - Each piece is represented by a single character, upper case for white and lower case for black. The pieces are pawn (`p`), bishop (`b`), knight (`n`), rook (`r`), queen (`q`) and king (`k`).
    - Empty squares are noted by a number showing how many there are. For example, `/P2P4/` would be displayed as
    - ![FEN p2p4](./docs/fen_example_p2p4.png)
    - A complex board state might look like this `6k1/p3pp1p/1n3bpB/8/1q6/2N4P/PP3PP1/3Q2K1`, which is pictured below
    - ![FEN Complex Board](./docs/fen_example_complex_board.png)
2. **Active Color:** `w`
    - Whose turn it is, black (`b`) or white (`w`).
3. **Castling availability:** `KQkq`
    - Which sides each color can castle. Upper case for white and lower case for black. `KQkq` means both colors can castle both ways. `Qk` would mean that white can castle queenside and black can castle kingside.
4. **En passant target square:** `-`
    - If this square is not a line (`-`), it means that a pawn can move to that square to do an _[en passant](https://en.wikipedia.org/wiki/En_passant)_. For example, if black moves `f7f5` this would read `f6`. This means that white can use a pawn in `e5` or `g5` in capture the black pawn in `f5` by moving to `f6`.
    - Below is a board in position `rnbqkbnr/pp1pp1pp/8/2p1Pp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3`, where white can en passant with the pawn in `e5` by moving it to `f6`
    - ![en passant example](./docs/en_passant_example.png)
5. **Halfmove clock:** `0`
    - The number of moves since a piece was captured or a pawn was moved. This program uses the [fifty-move rule](https://en.wikipedia.org/wiki/Fifty-move_rule), which means that the game will be declared a draw if the number of halfmoves reaches 100. Your AI does not need to keep track of this.
6. **Fullmove number:** `1`
    - The number of full moves. Increases by one every time it is white's turn (so after black makes a move). Your AI does not need to keep track of this.

#### Using FEN with the program

When starting a game, you can input a valid FEN string into the designated field to set the initial position of the game. If the entered FEN is invalid or the field is left empty, the game will start from the standard starting position.

In the program's user interface, you have the option to undo and redo moves. Each time you perform an undo or redo action, a FEN string representing the current board position is sent. For instance, if you undo a move to revert to the position `r1bqkbnr/pp1ppppp/2n5/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 2 3`, Your AI will receive the following FEN string:

```
r1bqkbnr/pp1ppppp/2n5/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 2 3
```

Additionally, a log will be displayed in the log box:

```
---------------------------------
17:05:40: Setting AI board to r1bqkbnr/pp1ppppp/2n5/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 2 3
```

**Note:** If setting the board fails for any reason, you will be notified with an error message:
```
17:12:42: Setting board failed: 
<error message>
```

If your AI process is no longer running, attempting to undo or redo moves results in a "broken pipe" error (`[Errno32]: Broken pipe`). This error occurs because the connection between the game and the AI process has been severed. To fix this, you must resubmit your AI.





### Connect Four

TBD

