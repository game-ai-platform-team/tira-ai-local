import {createRoot} from "react-dom/client";
import React from "react";

export function doStuff() {

    const root = createRoot(document.body);
    root.render(<h2>Hello from React!</h2>);
}

