import { io } from "socket.io-client";

const socket = io("http://localhost:5000/gameconnection");
socket.connect();

socket.on("move", (move: string) => {
    console.log(move);
  });

export default socket;
