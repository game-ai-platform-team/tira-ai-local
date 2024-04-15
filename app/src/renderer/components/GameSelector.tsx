import "../css/GameSelector.css";
import { shell } from "electron";

export function GameSelector({ onSelect }) {
	const handleGameSelection = (game: string) => {
		onSelect(game);
	};

	function openManual() {
		return shell.openExternal(
			"https://github.com/game-ai-platform-team/tira-ai-local/blob/master/README.md",
		);
	}

	return (
		<div id="navigation-bar">
			<button
				className="nav-button"
				onClick={() => handleGameSelection("chess")}
			>
				Chess
			</button>
			<button
				className="nav-button"
				onClick={() => handleGameSelection("connectFour")}
			>
				Connect Four
			</button>
			<button className="nav-button" onClick={openManual}>
				Open Manual
			</button>
			<div className="tira-text">TIRA-AI-LOCAL</div>
		</div>
	);
}
