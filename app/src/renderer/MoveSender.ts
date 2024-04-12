import socket from "./MySocket";

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
	fennotation?: string,
) {
	socket.emit(
		"startgame",
		filepath,
		fennotation ? fennotation != undefined : "",
		runsetup,
	);
}

export function sendBoardFen(fen: string) {
	socket.emit("set_board", fen);
}

export function killProcess() {
	socket.emit("kill");
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

let showRuntimeError = undefined;
export function setShowRuntimeError(func) {
	showRuntimeError = func;
}

socket.on("runtime_error", () => {
	console.log("runtime_error");
	if (showRuntimeError != undefined) {
		showRuntimeError(
			"Runtime Error!",
			"The AI process is no longer active! See the logs for more details.",
			"danger",
		);
	}
});
