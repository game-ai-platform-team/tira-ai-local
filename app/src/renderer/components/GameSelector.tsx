import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ChessView } from "./ChessView";
import { CFourView } from "./CFourView";

export function GameSelector({ onSelect }) {
    const [selectedGame, setSelectedGame] = useState(null);

    const handleGameSelection = (game) => {
        setSelectedGame(game);
        onSelect(game);
    };

    return (
        <div>
            <h2>Select Game</h2>
            <button onClick={() => handleGameSelection("chess")}>Chess</button>
            <button onClick={() => handleGameSelection("connectFour")}>
                Connect Four
            </button>
        </div>
    );
}

export function render() {
    const root = createRoot(document.getElementById("root"));

    root.render(
        <GameSelector
            onSelect={(selectedGame) => {
                if (selectedGame === "chess") {
                    root.render(<ChessView />);
                } else if (selectedGame === "connectFour") {
                    root.render(<CFourView />);
                }
            }}
        />
    );
}
