import { MyChessboard } from "./MyChessboard";
import { MoveDescriptor, Position } from "kokopu";
import "../../css/GameView.css";
import { getData } from "../../UserData";

export function ChessView(props: {
	positions: any;
	setMoves(arg0: (prevMoves: string[]) => string[]): void;
	setPositions(arg0: (prevState: Position[]) => Position[]): void;
	hasBeenSubmitted: boolean;
	setHasBeenSubmitted(arg0: boolean): void;
	halfMoves: any[];
	moves: string[];
	setBoardIndex(arg0: number): void;
	boardIndex: number;
	notification?(header, body, bg?): void;
}) {
	function addPosition(position: Position, move: MoveDescriptor) {
		props.setPositions((prevState) => {
			const sliced = prevState.slice(0, props.boardIndex + 1);
			return sliced.concat(position);
		});
		props.setBoardIndex(props.boardIndex + 1);
		updateHalfMoveCounter(move);
		props.setMoves((prevMoves) => {
			const slicedMoves = prevMoves.slice(0, props.boardIndex);
			return slicedMoves.concat(position.uci(move));
		});
	}

	function updateHalfMoveCounter(move: MoveDescriptor) {
		if (move.movingPiece() === "p" || move.isCapture()) {
			props.halfMoves[props.boardIndex + 1] = 0;
		} else {
			props.halfMoves[props.boardIndex + 1] =
				props.halfMoves[props.boardIndex] + 1;
		}
	}

	function makeArrowString() {
		if (props.boardIndex < 1) {
			return "";
		}
		const from: string = props.moves[props.boardIndex - 1].slice(0, 2);
		const to: string = props.moves[props.boardIndex - 1].slice(2, 4);
		const color: string = getData("arrow");
		return `${color}${from}${to}`;
	}

	const isGameOver = props.positions[props.boardIndex].isCheckmate() === true;

	const stalemate = props.positions[props.boardIndex].isStalemate() === true;
	const dead = props.positions[props.boardIndex].isDead() === true;
	const halfMoveCount = props.halfMoves[props.boardIndex] >= 100;

	const isTie = stalemate || dead || halfMoveCount;

	if (isGameOver && props.hasBeenSubmitted) {
		const winner = props.moves.length % 2 === 0 ? "Black" : "White";
		props.notification("GAME OVER!", `${winner} has won the game`);
		props.setHasBeenSubmitted(false);
	} else if (isTie && props.hasBeenSubmitted) {
		const endType = stalemate
			? "of a stalemate"
			: dead
				? "neither side has enough material to win"
				: "it has been 100 moves since last capture or pawn advance";
		props.notification(
			"GAME OVER!",
			`Game was declared a tie because ${endType}.`,
		);
		props.setHasBeenSubmitted(false);
	}

	return (
		<div id="game-view">
			<>
				<MyChessboard
					pos={props.positions[props.boardIndex]}
					addPosition={addPosition}
					active={!(isGameOver || !props.hasBeenSubmitted)}
					notification={props.notification}
					arrow={makeArrowString()}
				/>
				<div data-testid="board-index">Turn {props.boardIndex}</div>
			</>
		</div>
	);
}
