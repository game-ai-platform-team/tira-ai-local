import AIForm from "../AIForm";
import { MyChessboard } from "./MyChessboard";
import { Logs } from "../Logs";
import socket from "../../MySocket";
import { useState } from "react";
import { Position } from "kokopu";

export function ChessView() {
  const [positions, setPositions] = useState([new Position()]);
  const [boardIndex, setBoardIndex] = useState(0);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  function handleSubmit(
    filepath: string,
    fennotation: string,
    runsetup: boolean
  ) {
    socket.emit("startgame", filepath, fennotation, runsetup);
    setBoardIndex(0);
    setHasBeenSubmitted(true);
    try {
      setPositions([new Position(fennotation)]);
    } catch (error) {
      setPositions([new Position()]);
    }
  }

  function copyFenToClipboard() {
    const fen = positions[boardIndex].fen();
    navigator.clipboard
      .writeText(fen)
      .then(() => {
        console.log("Copied FEN to clipboard:", fen);
      })
      .catch((err) => {
        console.error("Error copying FEN notation to clipboard:", err);
      });
  }

  function addPosition(position) {
    setPositions((prevState) => {
      const sliced = prevState.slice(0, boardIndex + 1);
      setBoardIndex(boardIndex + 1);
      console.log(sliced);
      console.log(boardIndex);
      return sliced.concat(position);
    });
  }

  function handlePrevMoveButton() {
    if (boardIndex > 0) {
      socket.emit("set_board", positions[boardIndex - 1].fen());
      setBoardIndex(boardIndex - 1);
    }
  }

  function handleNextMoveButton() {
    if (boardIndex < positions.length - 1) {
      socket.emit("set_board", positions[boardIndex + 1].fen());
      setBoardIndex(boardIndex + 1);
    }
  }

  const isGameOver =
    positions[boardIndex].isCheckmate() === true ||
    positions[boardIndex].isStalemate() === true ||
    positions[boardIndex].isDead() === true;

  return (
    <div>
      {hasBeenSubmitted && (
        <>
          <MyChessboard pos={positions[boardIndex]} addPosition={addPosition} />

          <div>
            <button
              onClick={handlePrevMoveButton}
              data-testid="prev-move-button"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextMoveButton}
              data-testid="next-move-button"
            >
              {">"}
            </button>
          </div>
          <div data-testid="board-index">Turn {boardIndex}</div>
        </>
      )}

      {isGameOver && <div>GAME OVER</div>}
      <Logs />
      <button onClick={copyFenToClipboard}>Copy current FEN</button>
      <AIForm handleSubmit={handleSubmit} showFen={true} formId="formChess" />
    </div>
  );
}
