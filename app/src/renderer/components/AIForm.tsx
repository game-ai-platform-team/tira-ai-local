import { useState } from "react";
import { io } from "socket.io-client";
import socket from "../MySocket";

function AIForm() {
  const [filepath, setFilePath] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const game = "chess";

    socket.emit("startgame", filepath);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">SUBMIT</button>
        <input
          id="fileinput"
          value={filepath}
          onChange={(e) => setFilePath(e.target.value)}
        />
      </form>
    </div>
  );
}

export default AIForm;
