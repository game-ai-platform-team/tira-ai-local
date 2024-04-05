import AIForm from "../AIForm";
import { MyChessboard } from "./MyChessboard";
import { Logs } from "../Logs";
import socket from "../../MySocket";
import { useState } from "react";
import { MoveDescriptor, Position } from "kokopu";
import { createPGNString } from "../../PGNFormatter";
import { sendBoardFen } from "../../MoveSender";

export function ChessView() {
	const [positions, setPositions] = useState([new Position()]);
	const [boardIndex, setBoardIndex] = useState(0);
	const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

	const [moves, setMoves] = useState([]);
	const [halfMoves, setHalfMoves] = useState([]);

	const fullMoves = (index: number) => {
		return Math.floor(index / 2) + 1;
	};

	function handleSubmit(
		filepath: string,
		fennotation: string,
		runsetup: boolean,
	) {
		socket.emit("startgame", filepath, fennotation, runsetup);
		setBoardIndex(0);
		setHasBeenSubmitted(true);
		const fenList = fennotation.split(" ");
		setHalfMoves([parseInt(fenList[4])]);
		setMoves([]);
		try {
			setPositions([new Position(fennotation)]);
		} catch (error) {
			setPositions([new Position()]);
		}
	}

	function copyFenToClipboard() {
		const fen = createFen(boardIndex);
		navigator.clipboard
			.writeText(fen)
			.then(() => {
				console.log("Copied FEN to clipboard:", fen);
			})
			.catch((err) => {
				console.error("Error copying FEN notation to clipboard:", err);
			});
	}

	function addPosition(position: Position, move: MoveDescriptor) {
		setPositions((prevState) => {
			const sliced = prevState.slice(0, boardIndex + 1);
			return sliced.concat(position);
		});
		setBoardIndex(boardIndex + 1);
		updateHalfMoveCounter(move);
		setMoves((prevMoves) => {
			const slicedMoves = prevMoves.slice(0, boardIndex);
			return slicedMoves.concat(move);
		});
		console.log(
			createPGNString(moves, createFen(0), fullMoves(boardIndex)),
		);
	}

	function handlePrevMoveButton() {
		if (boardIndex > 0) {
			setBoardIndex(boardIndex - 1);
			const fen = createFen(boardIndex - 1);
			sendBoardFen(fen);
		}
	}

	function handleNextMoveButton() {
		if (boardIndex < positions.length - 1) {
			setBoardIndex(boardIndex + 1);
			const fen = createFen(boardIndex + 1);
			sendBoardFen(fen);
		}
	}

	function createFen(index: number) {
		const halfMove: number = halfMoves[index - 1];
		const fullMove: number = fullMoves(index);

		const fen = positions[index].fen({
			fiftyMoveClock: !isNaN(halfMove) ? halfMove : 0,
			fullMoveNumber: fullMove,
		});
		return fen;
	}

	function updateHalfMoveCounter(move: MoveDescriptor) {
		if (move.movingPiece() === "p" || move.isCapture()) {
			halfMoves[boardIndex + 1] = 0;
		} else {
			halfMoves[boardIndex + 1] = halfMoves[boardIndex] + 1;
		}
	}

    function exportPgn() {
        const pgn = createPGNString(moves, createFen(0), fullMoves(boardIndex));
        navigator.clipboard
          .writeText(pgn)
          .then(() => {
            console.log("Copied PGN to clipboard:", pgn);
          })
          .catch((err) => {
            console.error("Error copying PGN notation to clipboard:", err);
          });
      }

	const isGameOver =
		positions[boardIndex].isCheckmate() === true ||
		positions[boardIndex].isStalemate() === true ||
		positions[boardIndex].isDead() === true ||
		halfMoves[boardIndex] >= 100;

	return (
		<div>
			{hasBeenSubmitted && (
				<>
					<MyChessboard
						pos={positions[boardIndex]}
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
					<div data-testid="board-index">Turn {boardIndex}</div>
				</>
			)}

			{isGameOver && <div>GAME OVER</div>}
			<Logs />
			<button onClick={copyFenToClipboard}>Copy current FEN</button>
            <button onClick={exportPgn}>Copy current PGN</button>
			<AIForm
				handleSubmit={handleSubmit}
				showFen={true}
				formId="formChess"
			/>
		</div>
	);
}
