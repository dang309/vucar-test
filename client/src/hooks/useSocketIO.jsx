import { useContext } from "react";

import { SocketIOContext } from "../contexts/SocketIOContext";

// ----------------------------------------------------------------------

const useSocketIO = () => useContext(SocketIOContext);

export default useSocketIO;
