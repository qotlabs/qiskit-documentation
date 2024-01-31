require('./server');
"use strict";
var import_watcher = require("@parcel/watcher");
var import_ws = require("ws");
var import_path = require("path");
async function createWebSocket(options) {
  const { docs: docs2, port } = options;
  const wss = new import_ws.WebSocketServer({ port });
  let sockets = [];
  const fileWatcher = await (0, import_watcher.subscribe)(docs2, (err, events) => {
    if (!err) {
      const updatedPaths = events.map((event) => event.path);
      console.log(`[remoteRefresh] ${updatedPaths.join(", ")} updated`);
      sockets.map((socket) => socket.send(JSON.stringify(updatedPaths)));
    }
  });
  return new Promise((_, reject) => {
    console.log(`[remoteRefresh] server is listening at port ${port}`);
    wss.on("error", (e) => {
      reject(e);
    }).on("connection", (ws) => {
      console.log(`[remoteRefresh] new connection`);
      sockets.push(ws);
      ws.on("close", () => {
        console.log(`[remoteRefresh] close connection`);
        sockets = sockets.filter((socket) => socket !== ws);
      });
    }).on("close", () => {
      console.log(`[remoteRefresh] close`);
      fileWatcher.unsubscribe();
      reject();
    });
  });
}
const docsDirParam = process.env.DOCS_DIR ?? "docs";
const docs = (0, import_path.isAbsolute)(docsDirParam) ? docsDirParam : (0, import_path.join)(process.cwd(), docsDirParam);
createWebSocket({ docs, port: 5001 }).catch((e) => {
  console.error(e);
  process.exit(1);
});
