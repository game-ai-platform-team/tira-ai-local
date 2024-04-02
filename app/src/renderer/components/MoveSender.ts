import socket from "../MySocket";

let returnMove = true;
export function sendMove(move: string) {
    socket.emit("move_to_back", move, returnMove);
}

export function sendEmpty() {
    socket.emit("move_to_back", "", true);
}

export function setReturnMove(state: boolean) {
    returnMove = state;
}

export function startGame(
    filepath: string,
    runsetup: boolean,
    fennotation?: string
) {
    socket.emit(
        "startgame",
        filepath,
        fennotation ? fennotation != undefined : "",
        runsetup
    );
}

let handleMovePlayedByAi = undefined;
export function sethandleMovePlayedByAi(func) {
    handleMovePlayedByAi = func;
}

socket.on("move_to_front", (move: string) => {
    console.log("socket:", move);

    if (handleMovePlayedByAi != undefined) {
        handleMovePlayedByAi(move);
    }
});
