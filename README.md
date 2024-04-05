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

If you make changes to the background service, you'll need to rebuild it. Here's how:

1. In the `background-service` directory, run:
    ```bash
    poetry run invoke build
    ```
2. In the `app` directory, run:
    ```bash
    npm run make
    ```

The built program can be found in the `app/out` directory.

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

Note: Any outputs to the console that do not begin with `MOVE:` will be displayed in the log box of the program under the most recent `MOVE:` output.


#### Example

```python
print("a2a3")
print("MOVEb2b3")
print("MOVE:e2e4")  # Only this is read as a move
print("test")
```

In this example, the program would read `e2e4` as the output from your AI. The log box would display:

```python
a2a3
MOVEb2b3
```

The program would then process the move e2e4 and wait for further input. After receiving the next input, `test` would be displayed in the log box under the next `MOVE:`.

## Game Specific Instructions

### Chess

TBD

### Connect Four

TBD
