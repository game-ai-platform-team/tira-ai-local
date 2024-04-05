// @vitest-environment jsdom

import { test, describe, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { PlayButton } from "../../renderer/components/PlayButton";

describe("Playbutton", () => {
	afterEach(cleanup);
	test("Initial state of autoSendMove is true", () => {
		const { getByLabelText } = render(<PlayButton />);
		const checkbox = getByLabelText(
			"Send PLAY after move",
		) as HTMLInputElement;
		expect(!checkbox.checked).toBe(false);
	});
	test("Clicking on checkbox toggles autoSendMove state", () => {
		const { getByLabelText } = render(<PlayButton />);
		const checkbox = getByLabelText(
			"Send PLAY after move",
		) as HTMLInputElement;

		fireEvent.click(checkbox);
		expect(!checkbox.checked).toBe(true);
		fireEvent.click(checkbox);
		expect(!checkbox.checked).toBe(false);
	});
	test("Play button calls sendEmpty", () => {
		const sendEmpty = vi.fn();
		const { getAllByText } = render(<PlayButton sendEmpty={sendEmpty} />);

		const playButton = getAllByText("PLAY!");
		fireEvent.click(playButton[0]);
		expect(sendEmpty).toHaveBeenCalledOnce();
	});
});
