// @vitest-environment jsdom

import {test, describe, expect} from "vitest";
import { ChessView } from "../../../renderer/components/chess/ChessView";
import { render } from "@testing-library/react";

describe("ChessView", () => {
    test("renders correctly", () => {
        const ui = (<ChessView />);
        const board = render(ui);

        expect(board).not.toBe(null);
    });
});
