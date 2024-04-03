import { useState } from "react";
import { killProcess } from "../MoveSender";
import "../css/Buttons.css";

function AIForm(props: {
  handleSubmit: (
    filepath: string,
    fennotation: string,
    runSetup: boolean
  ) => void;
  showFen: boolean;
  formId: string;
}) {
  const [filepath, setFilePath] = useState("");
  const [fennotation, setFenNotation] = useState("");
  const [runSetup, setRunSetup] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit(filepath, fennotation, runSetup);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id={props.formId}>
        <button type="submit" id="classic-button">
          SUBMIT
        </button>
        File path:{" "}
        <input
          id="fileinput"
          value={filepath}
          onChange={(e) => setFilePath(e.target.value)}
        />
        <br />
        {props.showFen && (
          <>
            Set board FEN:{" "}
            <input
              id="feninput"
              value={fennotation}
              onChange={(e) => setFenNotation(e.target.value)}
            />{" "}
            (empty for starting position)
          </>
        )}
        <br />
        <label htmlFor="run-setup">Run setup.sh?</label>
        <input
          type="checkbox"
          id="run-setup"
          onChange={(e) => setRunSetup(e.target.value === "false")}
          value={"" + runSetup}
        />
      </form>
      <button id="classic-button" onClick={killProcess}>
        Kill Process
      </button>
    </div>
  );
}

export default AIForm;
