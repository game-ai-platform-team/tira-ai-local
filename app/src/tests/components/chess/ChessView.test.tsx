// @vitest-environment jsdom

import { test, describe, expect } from "vitest";
import { ChessView } from "../../../renderer/components/chess/ChessView";
import { render, fireEvent } from "@testing-library/react";

describe("ChessView", () => {
  test("renders correctly", () => {
    const ui = <ChessView />;
    const board = render(ui);

    expect(board).not.toBe(null);
  });
  test("move buttons work", () => {
    const { getAllByText, getByTestId } = render(<ChessView />);

    const submitButtons = getAllByText("SUBMIT");
    fireEvent.click(submitButtons[0]);

    const initialBoardIndex = getByTestId("board-index").textContent;

    fireEvent.click(getByTestId("next-move-button"));

    const updatedBoardIndex = getByTestId("board-index").textContent;

    expect(parseInt(updatedBoardIndex)).toBe(parseInt(initialBoardIndex) + 1);

    fireEvent.click(getByTestId("prev-move-button"));

    expect(parseInt(updatedBoardIndex)).toBe(parseInt(initialBoardIndex));
  });
});
