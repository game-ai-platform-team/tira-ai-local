import {Chessboard} from "kokopu-react";
import {io} from "socket.io-client";
import React, {useState} from "react";
import {MoveDescriptor, Position,} from "kokopu";
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
