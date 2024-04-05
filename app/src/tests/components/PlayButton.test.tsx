// @vitest-environment jsdom

import { test, describe, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { JSDOM } from "jsdom";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
global.window = window;
global.document = window.document;

import { PlayButton } from "../../renderer/components/PlayButton";

describe("Playbutton", () => {
  test("Initial state of autoSendMove is false", () => {
    const { getByLabelText } = render(<PlayButton />);
    const checkbox = getByLabelText("Send PLAY after move") as HTMLInputElement;
    expect(!checkbox.checked).toBe(true);
  });
  test("Clicking on checkbox toggles autoSendMove state", () => {
    const { getByLabelText } = render(<PlayButton />);
    const checkbox = getByLabelText("Send PLAY after move") as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(!checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(!checkbox.checked).toBe(true);
  });
});
