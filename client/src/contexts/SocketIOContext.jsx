import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

// ----------------------------------------------------------------------

const SocketIOContext = createContext({
  socket: null,
  io: null,
});

const SocketIOProvider = ({ children }) => {
  const socket = io(import.meta.env.VITE_API_ROOT, { autoConnect: false });

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketIOContext.Provider
      value={{
        io,
        socket,
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};

export { SocketIOProvider, SocketIOContext };
