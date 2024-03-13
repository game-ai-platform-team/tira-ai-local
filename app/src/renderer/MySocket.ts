import { io } from "socket.io-client";

const socket = io("http://localhost:5000/gameconnection");
socket.connect();

console.log(":DDDDD")

let handleMovePlayedByAi = undefined
function sethandleMovePlayedByAi(func) {
    handleMovePlayedByAi = func
}

socket.on("move_to_front", (move: string) => {
    console.log("socket:", move)

    if (handleMovePlayedByAi != undefined) {
        handleMovePlayedByAi(move);
    }
});

export default socket;
export {sethandleMovePlayedByAi};