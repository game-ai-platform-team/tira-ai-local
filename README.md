# tira-ai-local

Simple program to test game AI's. Currently supports Chess and Connect Four.

## Installation

Download the [latest release](https://github.com/game-ai-platform-team/tira-ai-local/releases), unzip, and run `tira-ai-local`.

<details>
    <summary>Alternative installation</summary>

#### Requirements

- [python](https://www.python.org/) 3.10 or newer
- [Node.js](https://nodejs.org/en/download/current)
- [poetry](https://python-poetry.org/docs/#installation)

#### Installation steps

1. Clone the repository
    ```bash
    git clone https://github.com/game-ai-platform-team/tira-ai-local.git
    ```
2. Navigate to `./background-service`
    ```bash
    cd tira-ai-local/background-service
    ```
3. Install the requirements with poetry
    ```bash
    poetry install
    ```
4. Build the background service
    ```bash
    poetry run invoke build
    ```
5. Navigate to `./app`
    ```bash
    cd ../app
    ```
6. Install the requirements with npm
    ```bash
    npm install
    ```
7. Start the program
    ```bash
    npm start
    ```

</details>

## Usage

See the [example project](https://github.com/game-ai-platform-team/stupid-chess-ai) for a simple chess AI compatible with this program.

### AI Configuration

To make your AI project usable with this program, it should have the following directory structure:

```
/root
--/src
--/tiraconfig
----runcommand
----setup.sh
```

Your AI files should be inside `./src`. The `./tiraconfig` directory should contain two files, `runcommand` and `setup.sh`.

#### runcommand

This file contains the command to start your AI. It is run everytime you start your AI in `tira-ai-local`.

If your python AI is run from a file called `main.py` which is located in `./src`, the run command would look like this:

```bash
python3 src/main.py
```

#### setup.sh

This shell script is used to set up your AI. It should contain the command to install the dependencies of your AI. `setup.sh` is executed when the "Run setup.sh?" option is toggled on.

Note: You only need to run `setup.sh` when you are running your AI for the first time.

If your python AI uses poetry for dependency management, your `setup.sh`, would look like this:

```shell
poetry install
```

Note: You might also need to change `runcommand`. When using poetry, the command would be:

```bash
poetry run python3 src/main.py
```

### AI Structure

Your AI should contain a loop that is ran for the duration of the game. If your AI finishes execution before the game is over, the program will not work.

<details>
    <summary>Python Example</summary>

```python
def main()
    while True:
        # Read inputs and write outputs

if __name__ == "__main__":
    main()
```

</details>

### AI Communication Protocol (Input)

The program communicates with your AI using the standard pipe (command line). Your AI should read these commands like it would read any other input from the command line. For example, in python, you would read the commands using `input()`.

Each command is given in the following format:

```
TAG:DATA
```

`TAG` is the type of command, and `DATA` is the data to prcess.

#### TAGS
- `MOVE:<move>`
    - Take the given opponent move and process
    - Data: Move made by the opponent.
    - Example: `MOVE:e2e4` would be white's opening move in chess.
- `PLAY:`
    - Play one move in the current position
    - Data: None
- `BOARD:<board_state>`
    - Set the board to this state
    - Data: A board state
    - Example: `BOARD:rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1` would set a chess board to the starting position
- `RESET:`
    - Set the board to starting position
    - Data: None


<details>
    <summary>Reading Tags Python Example</summary>

```python
def main():
    while True:
        tag_data = input().split(":")
        tag = tag_data[0]
        data = tag_data[1]

        if tag == "MOVE":
            # handle opponent move
        elif tag == "PLAY":
            # find best move and print it
        elif tag == "BOARD":
            # set the board to data
        elif tag == "RESET":
            # set the board to starting position
```

</details>

### AI Communication Protocol (Output)

The program will read your AI's ouput from the standard pipe (command line). Simple write to the command line to give data to the program. For example, in python, you would write to command line using `print()`.

There is only one tag for output, `MOVE:`, and it is used like in input. To return a move to the program, when given a `PLAY`-tag, your AI should write `MOVE:<move>` to the command line. All outputs to console that do not begin with `MOVE:` will be displayed in the log box of the program.

Note: For the program of stop reading the output of your AI and process the given move, you will need a newline (`\n`) at the end of your data. In python by default a newline inserted automatically at the end of each `print` statement.

#### Example
```python
print("a2a3")
print("MOVEb2b3")
print("MOVE:e2e4")
print("test")
```
The program would read `e2e4` as the output from your AI. The log box would look like this:
```python
a2a3
MOVEb2b3
# Moved e2 to e4
test
```

## Game Specific Instructions

### Chess

TBD

### Connect Four

TBD
