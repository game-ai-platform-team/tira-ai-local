// @vitest-environment jsdom

import { test, describe, expect } from "vitest";
import { ChessView } from "../../../renderer/components/chess/ChessView";
import { render, fireEvent } from "@testing-library/react";
import { Position } from "kokopu";

describe("ChessView", () => {
	test("renders correctly", () => {
		const ui = <ChessView setMoves={() => {
		}} moves={[]} setBoardIndex={() => {
		}} boardIndex={0} hasBeenSubmitted={false} positions={[new Position()]} setPositions={() => {
		}} halfMoves={[]} />;
		const board = render(ui);

		expect(board).not.toBe(null);
	});
	test("move buttons work", () => {

		const ui = <ChessView setMoves={() => {
		}} moves={[]} setBoardIndex={() => {
		}} boardIndex={0} hasBeenSubmitted={false} positions={[new Position()]} setPositions={() => {
		}} halfMoves={[]} />;

		const { getAllByText, getByTestId } = render(ui);

		const submitButtons = getAllByText("SUBMIT");
		fireEvent.click(submitButtons[0]);

		const initialBoardIndex = getByTestId("board-index").textContent;

		fireEvent.click(getByTestId("next-move-button"));

		const updatedBoardIndex = getByTestId("board-index").textContent;

		expect(parseInt(updatedBoardIndex)).toBe(
			parseInt(initialBoardIndex) + 1
		);

		fireEvent.click(getByTestId("prev-move-button"));

		expect(parseInt(updatedBoardIndex)).toBe(parseInt(initialBoardIndex));
	});
});
