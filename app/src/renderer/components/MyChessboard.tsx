import {Chessboard} from "kokopu-react";
import {useState} from "react";
import {Position,} from "kokopu";
import socket from "../MySocket";


export function MyChessboard() {
    const [pos, setPos] = useState(new Position());

    function handleMovePlayed(move: string) {
        setPos((prevState) => {
            const copy = new Position(prevState);
            socket.emit("move", copy.uci(copy.notation(move)));
            copy.play(move);
            return copy;
        });
    }
    function handleMovePlayedByAi(move: string) {
      setPos((prevState) => {
          const copy = new Position(prevState);
          copy.play(move);
          return copy;
      });
  }
    socket.on("move", (move: string) => {
      console.log("socket:", move)
      handleMovePlayedByAi(move);
    });

    return (
        <div>
            <Chessboard
                interactionMode={"playMoves"}
                onMovePlayed={(move) => handleMovePlayed(move)}
                position={pos}
            />
        </div>
    );
}
