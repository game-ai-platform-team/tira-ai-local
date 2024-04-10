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
}) {
	const numberMoves = props.moves.map((value) => Number(value));

	function handleMovePlayedByAi(move: string) {
		if (!isGameOver) {
			console.log(numberMoves);
			props.setMoves(props.moves.concat(move));
			props.setBoardIndex(props.boardIndex + 1);
		}
	}

	function handleMovePlayed(move: string) {
		sendMove(move);
		props.moves.push(move);
		props.setBoardIndex(props.boardIndex + 1);
	}

	sethandleMovePlayedByAi(handleMovePlayedByAi);

	const boardmatrix = CFourParser({
		moves: numberMoves,
		boardIndex: props.boardIndex,
	});
	const isGameOver = checkForWin(boardmatrix) || props.moves.length >= 42;

	return (
		<div id="game-view">
			{props.hasBeenSubmitted && (
				<>
					<MyConnectFour
						moves={numberMoves}
						boardIndex={props.boardIndex}
						onMovePlayed={handleMovePlayed}
						active={!isGameOver}
					/>
					<div>Turn {props.boardIndex}</div>
				</>
			)}
			{isGameOver && <div>GAME OVER</div>}
		</div>
	);
}
