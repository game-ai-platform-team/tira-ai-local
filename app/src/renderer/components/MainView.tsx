import AIForm from "./AIForm";
import { MyChessboard } from "./MyChessboard";
import { Logs } from "./Logs";
import socket from "../MySocket";
import { useState } from "react";
import { Position } from "kokopu";

export function MainView() {
  const [positions, setPositions] = useState([new Position()]);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  function handleSubmit(
    filepath: string,
    fennotation: string,
    runsetup: boolean
  ) {
    socket.emit("startgame", filepath, fennotation, runsetup);
    setHasBeenSubmitted(true);
    try {
      setPositions([new Position(fennotation)]);
    } catch (error) {
      setPositions([new Position()]);
    }
  }

  function copyFenToClipboard() {
    const fen = positions[positions.length - 1].fen();
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
      return prevState.concat(position);
    });
  }

  const isGameOver =
    positions[positions.length - 1].isCheckmate() === true ||
    positions[positions.length - 1].isStalemate() === true ||
    positions[positions.length - 1].isDead() === true;

  return (
    <div>
      {hasBeenSubmitted && (
        <MyChessboard
          pos={positions[positions.length - 1]}
          addPosition={addPosition}
        />
      )}
      {isGameOver && <div>GAME OVER</div>}
      <Logs />
      <button onClick={copyFenToClipboard}>Copy current FEN</button>
      <AIForm handleSubmit={handleSubmit} />
    </div>
  );
}
