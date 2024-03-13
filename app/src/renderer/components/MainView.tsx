import AIForm from "./AIForm";
import { MyChessboard } from "./MyChessboard";
import { Logs } from "./Logs";
import socket from "../MySocket";
import { useState } from "react";
import { Position, } from "kokopu";

export function MainView() {
    const [pos, setPos] = useState(new Position());

    function handleSubmit(filepath, fennotation) {
        socket.emit("startgame", filepath, fennotation);
        try {
            setPos(new Position(fennotation));
        } catch (error) {}
    }

    return(
    <div>
        <MyChessboard pos={pos} setPos={setPos} />
        <Logs/>
        <AIForm handleSubmit={handleSubmit}/>
    </div>)
}