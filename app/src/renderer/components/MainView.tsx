import AIForm from "./AIForm";
import {MyChessboard} from "./MyChessboard";
import {Logs} from "./Logs";
import socket from "../MySocket";
import {useState} from "react";
import {Position,} from "kokopu";

export function MainView() {
    const [pos, setPos] = useState(new Position());
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)

    function handleSubmit(filepath, fennotation) {
        socket.emit("startgame", filepath, fennotation);
        setHasBeenSubmitted(true)
        try {
            setPos(new Position(fennotation));
        } catch (error) {
            setPos(new Position())
        }
    }

    return (
        <div>
            {hasBeenSubmitted && <MyChessboard pos={pos} setPos={setPos}/>}
            <Logs/>
            <AIForm handleSubmit={handleSubmit}/>
        </div>)
}