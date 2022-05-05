import chalk from "chalk";
import app from "./app.js";

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "5010");

/**
 * Event listener for HTTP server "listening" event.
 */

// create a http server
const server = app.listen(port, async () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  const log = `${chalk.yellow("[?]")} ${chalk.green(
    "Checking colors have been seeded..."
  )}`;
  console.log(`Listening on ${chalk.green(bind)}`);
  console.log(log);
});

// create a socket server
import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

import socketInstance from "./sockets/index.js";
global.IO = socketInstance(io);

import "./sockets/bootstrap.js";
