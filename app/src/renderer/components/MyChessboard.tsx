import {Chessboard} from "kokopu-react";
import React, {useState} from "react";
import {Position} from "kokopu";

export function MyChessboard() {

    const [pos, setPos] = useState(new Position())

    function handleMovePlayed(move: string) {
        setPos(prevState => {
            const copy = new Position(prevState)
            copy.play(move)
            return copy
        })
    }

    return (<div>
        <Chessboard interactionMode={"playMoves"} onMovePlayed={move => handleMovePlayed(move)} position={pos}/>
    </div>)
}