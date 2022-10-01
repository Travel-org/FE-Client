import io from "socket.io-client";

const ENDPOINT = "localhost:4000";

export default io(ENDPOINT, { reconnection: true });