import { useState } from "react";

function AIForm() {
  const [filepath, setFilePath] = useState("");
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log("I was here");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit"></button>
        <input
          id="fileinput"
          value={filepath}
          onChange={(e) => setFilePath(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default AIForm;
