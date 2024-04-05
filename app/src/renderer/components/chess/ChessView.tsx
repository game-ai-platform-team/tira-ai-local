import { MyChessboard } from "./MyChessboard";
import { MoveDescriptor, Position } from "kokopu";
import { sendBoardFen } from "../../MoveSender";

export function ChessView(props: {
	positions: any;
	setMoves(arg0: (prevMoves: string[]) => string[]): void;
	setPositions(arg0: (prevState: Position[]) => Position[]): void;
	hasBeenSubmitted: boolean;
	halfMoves: any[];
	moves: string[]
	setBoardIndex(arg0: number): void; boardIndex: number
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

	function handlePrevMoveButton() {
		if (props.boardIndex > 0) {
			props.setBoardIndex(props.boardIndex - 1);
			const fen = createFen(props.boardIndex - 1);
			sendBoardFen(fen);
		}
	}

	function handleNextMoveButton() {
		if (props.boardIndex < props.positions.length - 1) {
			props.setBoardIndex(props.boardIndex + 1);
			const fen = createFen(props.boardIndex + 1);
			sendBoardFen(fen);
		}
	}

	function createFen(index: number) {
		const halfMove: number = props.halfMoves[index - 1];
		const fullMove: number = fullMoves(index);

		const fen = props.positions[index].fen({
			fiftyMoveClock: !isNaN(halfMove) ? halfMove : 0,
			fullMoveNumber: fullMove
		});
		return fen;
	}

	function updateHalfMoveCounter(move: MoveDescriptor) {
		if (move.movingPiece() === "p" || move.isCapture()) {
			props.halfMoves[props.boardIndex + 1] = 0;
		} else {
			props.halfMoves[props.boardIndex + 1] = props.halfMoves[props.boardIndex] + 1;
		}
	}


	const isGameOver =
		props.positions[props.boardIndex].isCheckmate() === true ||
		props.positions[props.boardIndex].isStalemate() === true ||
		props.positions[props.boardIndex].isDead() === true ||
		props.halfMoves[props.boardIndex] >= 100;

	return (
		<div>
			{props.hasBeenSubmitted && (
				<>
					<MyChessboard
						pos={props.positions[props.boardIndex]}
						addPosition={addPosition}
						active={!isGameOver}
					/>

					<div>
						<button
							onClick={handlePrevMoveButton}
							data-testid="prev-move-button"
						>
							{"<"}
						</button>
						<button
							onClick={handleNextMoveButton}
							data-testid="next-move-button"
						>
							{">"}
						</button>
					</div>
					<div data-testid="board-index">Turn {props.boardIndex}</div>
				</>
			)}

			{isGameOver && <div>GAME OVER</div>}

		</div>
	);
}
