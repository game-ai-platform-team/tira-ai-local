// @vitest-environment jsdom

import {render} from "@testing-library/react";
import {test, describe, expect} from "vitest";
import AIForm from "../../renderer/components/AIForm";


describe('In AIForm, there is', () => {

    test("submit button", () => {

        const rendered = render(<AIForm handleSubmit={() => {
        }}/>);

        console.log(rendered)

        const submitButton = rendered.container.querySelector("#submit");

        expect(submitButton).not.toBeNull();

    });
    test("a field for ai path", () => {
        const {container} = render(<AIForm handleSubmit={() => {
        }}/>);
        const fileInput = container.querySelector("#fileinput");
        expect(fileInput).not.toBeNull();

    });
    test("a field for FEN notation", () => {
        const {container} = render(<AIForm handleSubmit={() => {
        }}/>);
        const fenInput = container.querySelector("#feninput");
        expect(fenInput).not.toBeNull();
    });


})