import { createRoot } from "react-dom/client";
import { MainView } from "./components/MainView";

export function render() {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <MainView/>
  );
}
