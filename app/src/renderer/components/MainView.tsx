import AIForm from "./AIForm";
import { MyChessboard } from "./MyChessboard";
import { Logs } from "./Logs";
import socket from "../MySocket";
import { useState } from "react";
import { Position } from "kokopu";

export function MainView() {
  const [pos, setPos] = useState(new Position());
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  function handleSubmit(
    filepath: string,
    fennotation: string,
    runsetup: boolean
  ) {
    socket.emit("startgame", filepath, fennotation, runsetup);
    setHasBeenSubmitted(true);
    try {
      setPos(new Position(fennotation));
    } catch (error) {
      setPos(new Position());
    }
  }

  function copyFenToClipboard() {
    const fen = pos.fen();
    navigator.clipboard
      .writeText(fen)
      .then(() => {
        console.log("Copied FEN to clipboard:", fen);
      })
      .catch((err) => {
        console.error("Error copying FEN notation to clipboard:", err);
      });
  }

  return (
    <div>
      {hasBeenSubmitted && <MyChessboard pos={pos} setPos={setPos} />}
      <Logs />
      <button onClick={copyFenToClipboard}>Copy current FEN</button>
      <AIForm handleSubmit={handleSubmit} />
    </div>
  );
}
