import { Chessboard } from "kokopu-react";
import { useState } from "react";
import { Position, Game } from "kokopu";
import socket, { sethandleMovePlayedByAi } from "../../MySocket";

export function MyChessboard(props: {
  pos: Position;
  addPosition: (Position) => void;
}) {
  function handleMovePlayed(move: string) {
    const copy = new Position(props.pos);
    console.log(copy.fen());
    const move_desc = copy.notation(move);

    socket.emit("move_to_back", copy.uci(move_desc));
    copy.play(move_desc);
    props.addPosition(copy);
  }
  function handleMovePlayedByAi(move: string) {
    const copy = new Position(props.pos);
    console.log(copy.fen());
    copy.play(copy.uci(move));
    props.addPosition(copy);
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
