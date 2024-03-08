import {createRoot} from "react-dom/client";
import React from "react";
import {MyChessboard} from "./components/MyChessboard";

export function render() {

    const root = createRoot(document.body);
    root.render(<div>
        <MyChessboard/>

    </div>);
}

