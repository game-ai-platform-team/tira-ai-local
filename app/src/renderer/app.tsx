import { createRoot } from "react-dom/client";
import { GameSelector } from "./components/GameSelector";
import { ChessView } from "./components/chess/ChessView";
import { CFourView } from "./components/cfour/CFourView";
import { useState } from "react";

function App() {
	const [selectedGame, setSelectedGame] = useState<string | null>(null);

	const handleGameSelection = (game: string) => {
		setSelectedGame(game);
	};

	const handleGameDeselection = () => {
		setSelectedGame(null);
	};

	return (
		<div>
			{selectedGame ? (
				<div>
					<GameSelector onSelect={handleGameSelection} />
					{selectedGame === "chess" ? <ChessView /> : <CFourView />}
				</div>
			) : (
				<GameSelector onSelect={handleGameSelection} />
			)}
		</div>
	);
}

export function render() {
	const root = createRoot(document.getElementById("root"));
	root.render(<App />);
}
