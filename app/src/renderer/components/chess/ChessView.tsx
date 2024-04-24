import { MyChessboard } from "./MyChessboard";
import { MoveDescriptor, Position } from "kokopu";
import "../../css/GameView.css";
import { getData } from "../../UserData";
/**
 * This is the view for the Chess game.
 *
 * @param {object} props - Component props
 * @param {Position[]} props.positions - Array containing positions in the game
 * @param {Function} props.setMoves - Function to set the moves array
 * @param {Function} props.setPositions - Function to set the positions array
 * @param {boolean} props.hasBeenSubmitted - Flag indicating if moves have been submitted
 * @param {Function} props.setHasBeenSubmitted - Function to set the hasBeenSubmitted flag
 * @param {number[]} props.halfMoves - Array containing half moves
 * @param {string[]} props.moves - Array containing the moves played in the game
 * @param {Function} props.setBoardIndex - Function to set the board index
 * @param {number} props.boardIndex - Index of the current board state in the positions array
 * @param {Function} [props.notification] - Function to display notifications
 * @param {boolean} [props.gameOver] - Flag indicating if the game is over
 * @param {Function} [props.setGameOver] - Function to set the game over flag
 *
 * @returns {JSX.Element} - React component representing the Chess game view
 */
export function ChessView(props: {
	positions: Position[];
	setMoves(arg0: (prevMoves: string[]) => string[]): void;
	setPositions(arg0: (prevState: Position[]) => Position[]): void;
	hasBeenSubmitted: boolean;
	setHasBeenSubmitted(arg0: boolean): void;
	halfMoves: number[];
	moves: string[];
	setBoardIndex(arg0: number): void;
	boardIndex: number;
	notification?(header, body, bg?): void;
	gameOver?: boolean;
	setGameOver?(arg0: boolean): void;
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
	const turn = props.positions[props.boardIndex].turn();

	const stalemate = props.positions[props.boardIndex].isStalemate() === true;
	const dead = props.positions[props.boardIndex].isDead() === true;
	const halfMoveCount = props.halfMoves[props.boardIndex] >= 100;

	const isTie = stalemate || dead || halfMoveCount;

	if (!props.gameOver) {
		if (isGameOver) {
			const winner = turn === "b" ? "Black" : "White";
			props.notification("GAME OVER!", `${winner} has won the game`);
			props.setGameOver(true);
		} else if (isTie) {
			const endType = stalemate
				? "of a stalemate"
				: dead
					? "neither side has enough material to win"
					: "it has been 100 moves since last capture or pawn advance";
			props.notification(
				"GAME OVER!",
				`Game was declared a tie because ${endType}.`,
			);
			props.setGameOver(true);
		}
	}

	return (
		<div id="game-view">
			<>
				<MyChessboard
					pos={props.positions[props.boardIndex]}
					addPosition={addPosition}
					active={!(isGameOver || isTie) && props.hasBeenSubmitted}
					notification={props.notification}
					arrow={makeArrowString()}
				/>
				<div data-testid="board-index">Turn {props.boardIndex}</div>
			</>
		</div>
	);
}
