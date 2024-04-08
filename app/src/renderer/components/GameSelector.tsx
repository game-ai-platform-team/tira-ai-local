import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ChessView } from "./chess/ChessView";
import { CFourView } from "./cfour/CFourView";
import "../css/GameSelector.css";

export function GameSelector({ onSelect }) {
	const handleGameSelection = (game: string) => {
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
			<div className="tira-text">TIRA-AI-LOCAL</div>
		</div>
	);
}
