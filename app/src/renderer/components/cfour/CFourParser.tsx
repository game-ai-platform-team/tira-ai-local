import React from "react";

interface CFourParserProps {
	moves: number[];
	boardIndex: number;
}

const CFourParser = ({ moves, boardIndex }: CFourParserProps) => {
	const columns: number[][] = Array.from({ length: 7 }, () =>
		Array(6).fill(0),
	);

	let movesAdded = 0;

	moves.forEach((move, index) => {
		if (move >= 0 && move < 7 && movesAdded < boardIndex) {
			for (let row = 5; row >= 0; row--) {
				if (columns[move][row] === 0) {
					columns[move][row] = (index % 2) + 1;
					movesAdded++;
					break;
				}
			}
		}
	});

	return columns;
};

export default CFourParser;
