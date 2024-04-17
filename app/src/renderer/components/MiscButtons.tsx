import { killProcess } from "./../MoveSender";

export function MiscButtons(props: {
	selectedGame;
	boardIndex;
	createFen;
	exportPgn;
	createNotification;
	setHasBeenSubmitted;
}) {
	function copyFenToClipboard() {
		const fen = props.createFen(props.boardIndex);
		navigator.clipboard
			.writeText(fen)
			.then(() => {
				props.createNotification("Copied FEN to clipboard!", fen, "");
			})
			.catch((err) => {
				props.createNotification(
					"Error copying FEN notation to clipboard",
					err,
					"danger",
				);
			});
	}

	function killGameProcess() {
		props.setHasBeenSubmitted(false);
		killProcess();
	}

	return (
		<div id="misc-buttons">
			{props.selectedGame === "chess" && (
				<>
					<button
						className="classic-button"
						onClick={copyFenToClipboard}
						title="Copy the current position in FEN format to clipboard"
					>
						Copy current FEN
					</button>
					<button
						className="classic-button"
						onClick={props.exportPgn}
						title="Copy the game in PGN format to clipboard"
					>
						Copy current PGN
					</button>
				</>
			)}
			<button
				className="classic-button"
				onClick={killGameProcess}
				title="Kill the active AI process"
			>
				Kill Process
			</button>
		</div>
	);
}