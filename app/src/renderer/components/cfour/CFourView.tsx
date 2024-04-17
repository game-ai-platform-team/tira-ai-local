import { MyConnectFour } from "./MyConnectFour";
import checkForWin from "./CFourWinChecker";
import CFourParser from "./CFourParser";
import { sendMove, sethandleMovePlayedByAi } from "../../MoveSender";

export function CFourView(props: {
	setMoves(arg0: string[]): void;
	hasBeenSubmitted: any;
	boardIndex: number;
	setBoardIndex(arg0: number): void;
	moves: string[];
	notification?(header, body, bg?): void;
}) {
	const numberMoves = props.moves.map((value) => Number(value));

	function handleMovePlayedByAi(move: string) {
		if (!isGameOver) {
			if (validateMove(move)) {
				props.setMoves(props.moves.concat(move));
				props.setBoardIndex(props.boardIndex + 1);
			} else {
				props.notification(
					"Move was not played!",
					`${move} cannot be played because the column is full`,
					"danger",
				);
			}
		}
	}

	function handleMovePlayed(move: string) {
		props.moves.splice(props.boardIndex);
		sendMove(move);
		props.moves.push(move);
		props.setBoardIndex(props.boardIndex + 1);
	}

	function validateMove(move: string): boolean {
		const moveCount = props.moves.reduce((count, m) => {
			return m === move ? count + 1 : count;
		}, 0);

		return moveCount < 6;
	}

	sethandleMovePlayedByAi(handleMovePlayedByAi);

	const boardmatrix = CFourParser({
		moves: numberMoves,
		boardIndex: props.boardIndex,
	});
	const isGameOver = checkForWin(boardmatrix) || props.moves.length >= 42;

	return (
		<div id="game-view">
			<MyConnectFour
				moves={numberMoves}
				boardIndex={props.boardIndex}
				onMovePlayed={handleMovePlayed}
				active={!(isGameOver || !props.hasBeenSubmitted)}
				notification={props.notification}
			/>
			<div>Turn {props.boardIndex}</div>
			{isGameOver && <div>GAME OVER</div>}
		</div>
	);
}
