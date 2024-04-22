import { MyConnectFour } from "./MyConnectFour";
import checkForWin from "./CFourWinChecker";
import CFourParser from "./CFourParser";
import { sendMove, setReturnMove, sethandleMovePlayedByAi } from "../../MoveSender";

export function CFourView(props: {
	setMoves(arg0: string[]): void;
	hasBeenSubmitted: any;
	boardIndex: number;
	setBoardIndex(arg0: number): void;
	moves: string[];
	notification?(header, body, bg?): void;
	setHasBeenSubmitted(arg0: boolean): void;
	setGameOver?(arg0: boolean): void;
	gameOver?: boolean;
}) {
	const numberMoves = props.moves.map((value) => Number(value));

	function handleMovePlayedByAi(move: string) {
		if (!isGameOver) {
			if (validateMove(move)) {
				props.setMoves(
					props.moves.slice(0, props.boardIndex).concat(move),
				);
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
		props.setMoves(props.moves.slice(0, props.boardIndex).concat(move));
		props.moves.push(move);
		if (checkForWin(boardmatrix) || props.moves.length >= 42) {
			setReturnMove(false)
		}
		sendMove(move);
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

	if (isGameOver && !props.gameOver) {
		const moveCount = props.moves.length;
		const winner =
			moveCount >= 42
				? "Tie! No one"
				: moveCount % 2 === 0
					? "Yellow"
					: "Red";
		props.notification("GAME OVER!", `${winner} has won the game!`);
		props.setGameOver(true);
	}

	return (
		<div id="game-view">
			<MyConnectFour
				moves={numberMoves}
				boardIndex={props.boardIndex}
				onMovePlayed={handleMovePlayed}
				active={!isGameOver && props.hasBeenSubmitted}
				notification={props.notification}
			/>
			<div>Turn {props.boardIndex}</div>
		</div>
	);
}
