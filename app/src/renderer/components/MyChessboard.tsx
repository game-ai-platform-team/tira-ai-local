import { Chessboard } from "kokopu-react";
import { useState } from "react";
import { Position, Game } from "kokopu";
import socket, { sethandleMovePlayedByAi } from "../MySocket";

export function MyChessboard(props: {
  pos: Position;
  setPos: (Position) => void;
}) {
  function handleMovePlayed(move: string) {
    props.setPos((prevState) => {
      const copy = new Position(prevState);
      const move_desc = copy.notation(move);
      socket.emit("move_to_back", copy.uci(move_desc));
      copy.play(move_desc);
      return copy;
    });
  }
  function handleMovePlayedByAi(move: string) {
    props.setPos((prevState) => {
      const copy = new Position(prevState);
      copy.play(copy.uci(move));
      return copy;
    });
  }

  sethandleMovePlayedByAi(handleMovePlayedByAi);

  return (
    <div>
      <Chessboard
        interactionMode={"playMoves"}
        onMovePlayed={(move) => handleMovePlayed(move)}
        position={props.pos}
      />
    </div>
  );
}
