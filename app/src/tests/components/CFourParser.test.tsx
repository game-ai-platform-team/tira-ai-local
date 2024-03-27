// @vitest-environment jsdom

import React from "react";
import {test, describe, expect} from "vitest";
import CFourParser from "../../renderer/components/CFourParser";

describe("CFourParser", () => {
    test("renders a 7x6 grid with initial values of 0", () => {
        const moves: number[] = [];
        const boardIndex: number = 0;
        const board = CFourParser({moves, boardIndex})
        expect(board).toEqual([
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]);
    });

    test("adds moves correctly to the board", () => {
        const moves: number[] = [0, 1, 2, 3, 4];
        const boardIndex: number = 5;
        const board = CFourParser({moves, boardIndex})
        expect(board).toEqual([
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]);
    });

    test("stops adding moves when boardIndex is reached", () => {
        const moves = [0, 1, 2, 3, 4, 5, 6];
        const boardIndex = 3;
        const board = CFourParser({moves, boardIndex})        
        expect(board).toEqual([
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]);
      });
});
