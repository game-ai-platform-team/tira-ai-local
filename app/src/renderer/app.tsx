import { createRoot } from "react-dom/client";
import { GameSelector } from "./components/GameSelector";
import { ChessView } from "./components/chess/ChessView";
import { CFourView } from "./components/cfour/CFourView";
import { useState } from "react";
import AIForm from "./components/AIForm";
import socket from "./MySocket";
import { Position } from "kokopu";
import {
	killProcess,
	startGame,
	setReturnMove,
	sendBoardFen,
	setShowRuntimeError,
} from "./MoveSender";
import { Logs } from "./components/Logs";
import { createPGNString } from "./PGNFormatter";
import { GameButtons } from "./components/GameButtons";
import { Notification } from "./components/Notification";

import "./css/AppLayout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { shell } from "electron";

function App() {
	const [selectedGame, setSelectedGame] = useState<string | null>("chess");
	const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
	const [boardIndex, setBoardIndex] = useState(0);
	const [halfMoves, setHalfMoves] = useState([]);
	const [positions, setPositions] = useState([new Position()]);
	const [moves, setMoves] = useState<string[]>([]);
	const [autoSendMove, setAutoSendMove] = useState(false);

	const [toastHeader, setToastHeader] = useState("");
	const [toastBody, setToastBody] = useState("");
	const [toastBg, setToastBg] = useState("");
	const [showToast, setShowToast] = useState(false);

	const handleGameSelection = (game: string) => {
		setMoves([]);
		setHalfMoves([]);
		setPositions([new Position()]);
		setBoardIndex(0);
		setSelectedGame(game);
		if (hasBeenSubmitted) {
			killProcess();
		}
		setHasBeenSubmitted(false);
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
				createNotification("Copied FEN to clipboard!", fen, "");
			})
			.catch((err) => {
				createNotification(
					"Error copying FEN notation to clipboard",
					err,
					"danger",
				);
			});
	}

	function exportPgn() {
		const pgn = createPGNString(moves, createFen(0), fullMoves(boardIndex));
		navigator.clipboard
			.writeText(pgn)
			.then(() => {
				createNotification("Copied PGN to clipboard!", pgn, "");
			})
			.catch((err) => {
				createNotification(
					"Error copying PGN notation to clipboard",
					err,
					"danger",
				);
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

	function handleToggle() {
		setAutoSendMove(!autoSendMove);
		setReturnMove(autoSendMove);
	}

	function handlePrevMoveButton() {
		if (boardIndex > 0) {
			setBoardIndex(boardIndex - 1);
			if (selectedGame === "chess") {
				const fen = createFen(boardIndex - 1);
				sendBoardFen(fen);
			}
		}
	}

	function handleNextMoveButton() {
		if (boardIndex < positions.length - 1) {
			setBoardIndex(boardIndex + 1);
			if (selectedGame === "chess") {
				const fen = createFen(boardIndex + 1);
				sendBoardFen(fen);
			}
		}
	}

	function createNotification(header: string, body: string, bg?: string) {
		setToastBody(body);
		setToastHeader(header);
		setToastBg(bg === undefined ? "" : bg);
		setShowToast(true);
	}

	function openManual() {
		return shell.openExternal(
			"https://github.com/game-ai-platform-team/tira-ai-local/blob/master/README.md",
		);
	}

	function killGameProcess() {
		setHasBeenSubmitted(false);
		killProcess();
	}

	setShowRuntimeError(createNotification);

	return (
		<div>
			<GameSelector onSelect={handleGameSelection} />
			<Notification
				show={showToast}
				onClose={() => setShowToast(false)}
				headerText={toastHeader}
				bodyText={toastBody}
				bg={toastBg}
			/>
			{selectedGame !== null ? (
				<div id="app-center">
					<div className="cards">
						<AIForm
							handleSubmit={handleSubmit}
							showFen={selectedGame === "chess"}
							formId="formChess"
						/>
					</div>
					<div className="game-layout">
						{selectedGame === "chess" ? (
							<>
								{createFen(boardIndex)}
								<ChessView
									setBoardIndex={setBoardIndex}
									boardIndex={boardIndex}
									hasBeenSubmitted={hasBeenSubmitted}
									moves={moves}
									setMoves={setMoves}
									halfMoves={halfMoves}
									setPositions={setPositions}
									positions={positions}
									notification={createNotification}
								/>
							</>
						) : selectedGame === "connectFour" ? (
							<CFourView
								moves={moves}
								boardIndex={boardIndex}
								hasBeenSubmitted={hasBeenSubmitted}
								setBoardIndex={setBoardIndex}
								setMoves={setMoves}
								notification={createNotification}
							/>
						) : null}
						{hasBeenSubmitted && (
							<GameButtons
								handlePrevMoveButton={handlePrevMoveButton}
								handleNextMoveButton={handleNextMoveButton}
								autoSendMove={autoSendMove}
								handleToggle={handleToggle}
							/>
						)}
					</div>
					<div id="misc-buttons">
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
							onClick={killGameProcess}
						>
							Kill Process
						</button>
					</div>
				</div>
			) : null}
			<br />
			<div>{selectedGame && <Logs />}</div>
		</div>
	);
}

export function render() {
	const root = createRoot(document.getElementById("root"));
	root.render(<App />);
}
