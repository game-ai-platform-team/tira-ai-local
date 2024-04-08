import { createRoot } from "react-dom/client";
import { GameSelector } from "./components/GameSelector";
import { ChessView } from "./components/chess/ChessView";
import { CFourView } from "./components/cfour/CFourView";
import { useState } from "react";
import "./css/AppLayout.css";
import AIForm from "./components/AIForm";
import socket from "./MySocket";
import { Position } from "kokopu";
import { killProcess, startGame } from "./MoveSender";
import { Logs } from "./components/Logs";
import { createPGNString } from "./PGNFormatter";

function App() {
	const [selectedGame, setSelectedGame] = useState<string | null>(null);
	const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
	const [boardIndex, setBoardIndex] = useState(0);
	const [halfMoves, setHalfMoves] = useState([]);
	const [positions, setPositions] = useState([new Position()]);
	const [moves, setMoves] = useState<string[]>([]);

	const handleGameSelection = (game: string) => {
		setMoves([]);
		setHalfMoves([]);
		setPositions([new Position()]);
		setBoardIndex(0);
		setSelectedGame(game);
	};

	const handleGameDeselection = () => {
		setSelectedGame(null);
	};

	function handleSubmit(
		filepath: string,
		fennotation: string,
		runsetup: boolean,
	) {
		if (selectedGame === "chess") {
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
		} else if (selectedGame === "connectFour") {
			startGame(filepath, runsetup);
			setBoardIndex(0);
			setMoves([]);
			setHasBeenSubmitted(true);
		}
	}

	const fullMoves = (index: number) => {
		return Math.floor(index / 2) + 1;
	};

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

	function createFen(index: number) {
		const halfMove: number = halfMoves[index - 1];
		const fullMove: number = fullMoves(index);

		const fen = positions[index].fen({
			fiftyMoveClock: !isNaN(halfMove) ? halfMove : 0,
			fullMoveNumber: fullMove,
		});
		return fen;
	}

	return (
		<div>
			<GameSelector onSelect={handleGameSelection} />

			{selectedGame && (
				<div id="app-center">
					<div className="card">
						<AIForm
							handleSubmit={handleSubmit}
							showFen={selectedGame === "chess"}
							formId="formChess"
						/>
					</div>
					<div>
						{selectedGame === "chess" ? (
							<ChessView
								setBoardIndex={setBoardIndex}
								boardIndex={boardIndex}
								hasBeenSubmitted={hasBeenSubmitted}
								moves={moves}
								setMoves={setMoves}
								halfMoves={halfMoves}
								setPositions={setPositions}
								positions={positions}
							/>
						) : (
							<CFourView
								moves={moves}
								boardIndex={boardIndex}
								hasBeenSubmitted={hasBeenSubmitted}
								setBoardIndex={setBoardIndex}
								setMoves={setMoves}
							/>
						)}
					</div>
					<div>
						{selectedGame === "chess" && (
							<>
								<button onClick={copyFenToClipboard}>
									Copy current FEN
								</button>
								<button onClick={exportPgn}>
									Copy current PGN
								</button>
							</>
						)}
						<button
							className="classic-button"
							onClick={killProcess}
						>
							Kill Process
						</button>
					</div>
				</div>
			)}
            <br/>
			<div>{selectedGame && <Logs />}</div>
		</div>
	);
}

export function render() {
	const root = createRoot(document.getElementById("root"));
	root.render(<App />);
}
