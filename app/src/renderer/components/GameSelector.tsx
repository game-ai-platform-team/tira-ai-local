import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ChessView } from "./chess/ChessView";
import { CFourView } from "./cfour/CFourView";
import "../css/GameSelector.css";

export function GameSelector({ onSelect }) {
	const [selectedGame, setSelectedGame] = useState(null);

	const handleGameSelection = (game) => {
		setSelectedGame(game);
		onSelect(game);
	};

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
		</div>
	);
}

export function render() {
	const root = createRoot(document.getElementById("root"));

	root.render(
		<div>
			<GameSelector
				onSelect={(selectedGame) => {
					if (selectedGame === "chess") {
						root.render(<ChessView />);
					} else if (selectedGame === "connectFour") {
						root.render(<CFourView />);
					}
				}}
			/>
		</div>,
	);
}
