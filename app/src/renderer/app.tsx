import {MyChessboard} from "./components/MyChessboard";
import React from "react";
import {createRoot} from 'react-dom/client';


export function render() {

    const root = createRoot(document.getElementById("root"));
    root.render(<div>
        <MyChessboard/>

    </div>);
}

