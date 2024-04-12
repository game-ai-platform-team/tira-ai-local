import { MyChessboard } from "./MyChessboard";
import { MoveDescriptor, Position } from "kokopu";
import "../../css/GameView.css";

export function ChessView(props: {
	positions: any;
	setMoves(arg0: (prevMoves: string[]) => string[]): void;
	setPositions(arg0: (prevState: Position[]) => Position[]): void;
	hasBeenSubmitted: boolean;
	halfMoves: any[];
	moves: string[];
	setBoardIndex(arg0: number): void;
	boardIndex: number;
	notification?(header, body, bg): void;
}) {
	const fullMoves = (index: number) => {
		return Math.floor(index / 2) + 1;
	};

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

	const isGameOver =
		props.positions[props.boardIndex].isCheckmate() === true ||
		props.positions[props.boardIndex].isStalemate() === true ||
		props.positions[props.boardIndex].isDead() === true ||
		props.halfMoves[props.boardIndex] >= 100;

	return (
		<div id="game-view">
				<>
					<MyChessboard
						pos={props.positions[props.boardIndex]}
						addPosition={addPosition}
						active={!(isGameOver || !props.hasBeenSubmitted)}
						notification={props.notification}
					/>
					<div data-testid="board-index">Turn {props.boardIndex}</div>
				</>

			{isGameOver && <div>GAME OVER</div>}
		</div>
	);
}
