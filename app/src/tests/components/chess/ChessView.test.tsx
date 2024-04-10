// @vitest-environment jsdom

import { test, describe, expect } from "vitest";
import { ChessView } from "../../../renderer/components/chess/ChessView";
import { render, fireEvent } from "@testing-library/react";
import { Position } from "kokopu";
import AIForm from "../../../renderer/components/AIForm";
import { GameButtons } from "../../../renderer/components/GameButtons";
import { useState } from "react";

describe("ChessView", () => {
	test("renders correctly", () => {
		const ui = (
			<ChessView
				setMoves={() => {}}
				moves={[]}
				setBoardIndex={() => {}}
				boardIndex={0}
				hasBeenSubmitted={false}
				positions={[new Position()]}
				setPositions={() => {}}
				halfMoves={[]}
			/>
		);
		const board = render(ui);

		expect(board).not.toBe(null);
	});
	test("move buttons work", () => {
		function MockComponent() {
			const selectedGame = "chess";
			const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
			const [boardIndex, setBoardIndex] = useState(0);
			const [halfMoves, setHalfMoves] = useState([]);
			const [positions, setPositions] = useState([new Position()]);
			const [moves, setMoves] = useState<string[]>([]);
			const [autoSendMove, setAutoSendMove] = useState(false);
			function handleSubmit(
				filepath: string,
				fennotation: string,
				runsetup: boolean,
			) {
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

			function handleToggle() {
				setAutoSendMove(!autoSendMove);
			}

			function handlePrevMoveButton() {
				if (boardIndex > 0) {
					setBoardIndex(boardIndex - 1);
				}
			}

			function handleNextMoveButton() {
				if (boardIndex < positions.length - 1) {
					setBoardIndex(boardIndex + 1);
				}
			}

			return (
				<>
					<AIForm
						handleSubmit={handleSubmit}
						showFen={true}
						formId={""}
					/>
					<ChessView
						setMoves={setMoves}
						moves={moves}
						setBoardIndex={setBoardIndex}
						boardIndex={boardIndex}
						hasBeenSubmitted={hasBeenSubmitted}
						positions={positions}
						setPositions={setPositions}
						halfMoves={halfMoves}
					/>
					<GameButtons
						handlePrevMoveButton={handlePrevMoveButton}
						handleNextMoveButton={handleNextMoveButton}
						autoSendMove={autoSendMove}
						handleToggle={handleToggle}
					/>
				</>
			);
		}

		const ui = <MockComponent></MockComponent>;

		const { getAllByText, getByTestId } = render(ui);

		const submitButtons = getAllByText("SUBMIT");
		fireEvent.click(submitButtons[0]);

		const initialBoardIndex = getByTestId("board-index").textContent;

		fireEvent.click(getByTestId("next-move-button"));

		const updatedBoardIndex = getByTestId("board-index").textContent;

		expect(parseInt(updatedBoardIndex)).toBe(
			parseInt(initialBoardIndex) + 1,
		);

		fireEvent.click(getByTestId("prev-move-button"));

		expect(parseInt(updatedBoardIndex)).toBe(parseInt(initialBoardIndex));
	});
});
