import { MyChessboard } from "./components/MyChessboard";
import React from "react";
import { createRoot } from "react-dom/client";
import AIForm from "./components/AIForm";

export function render() {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <div>
      <MyChessboard />
      <AIForm />
    </div>
  );
}
