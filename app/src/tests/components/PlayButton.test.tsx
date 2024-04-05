// @vitest-environment jsdom

import { test, describe, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { PlayButton } from "../../renderer/components/PlayButton";

describe("Playbutton", () => {
	test("Initial state of autoSendMove is false", () => {
		const { getByLabelText } = render(<PlayButton />);
		const checkbox = getByLabelText(
			"Send PLAY after move",
		) as HTMLInputElement;
		expect(!checkbox.checked).toBe(true);
	});
	test("Clicking on checkbox toggles autoSendMove state", () => {
		const { getByLabelText } = render(<PlayButton />);
		const checkbox = getByLabelText(
			"Send PLAY after move",
		) as HTMLInputElement;

		fireEvent.click(checkbox);
		expect(!checkbox.checked).toBe(false);
		fireEvent.click(checkbox);
		expect(!checkbox.checked).toBe(true);
	});
});
