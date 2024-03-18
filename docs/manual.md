# Tira AI platform local version - Manual

## Downloading the executable

- Download the latest release from Github
- Unzip the zip file
- Run the exe file

## Configuring your AI

- The configuration should be done like in the [Stupid Chess AI](https://github.com/game-ai-platform-team/stupid-chess-ai/) project
- In the [Tiraconfig](https://github.com/game-ai-platform-team/stupid-chess-ai/tree/main/tiraconfig) folder you add the shell scripts to setup your AI project
- In the [Stupid_ai.py](https://github.com/game-ai-platform-team/stupid-chess-ai/blob/main/src/stupid_ai.py) file you add the logic to your AI
- The AI should be configured so that it is in a while loop which asks for the input of you, the player and afterwards it gives back the move in the form of `MOVE: `+ your AI's move in [the UCI format](https://en.wikipedia.org/wiki/Universal_Chess_Interface)

## Playing against your AI

- When you have the exe opened give the path to your AI folder, for example: /home/user/stupid-chess-ai
- Press the submit button
- Play the first move in the UI chessboard and if your AI is configured correctly it will play the next move
- In the UI you are able to give a FEN notation to start a game from a specific board position. More info about FEN notation [here](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
- For example: `rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2` would be a valid FEN notation
- `Copy current FEN` button allows you to copy the current board position in the FEN format
- Re-submitting using the `Submit` button works as resetting the board
