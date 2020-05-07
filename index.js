const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const path = require("path");
const PUBLIC_DIR_PATH = "public/";
const userService = require("./services/UserService");

app.use(express.static(__dirname + "/public"));

function onConnection(socket) {
  socket.on("play", (data) => socket.broadcast.emit("play", data));
  socket.on("pause", (data) => socket.broadcast.emit("pause", data));
  socket.on("seek", (data) => socket.broadcast.emit("seek", data));
}

io.on("connection", onConnection);

http.listen(port, () => console.log("listening on port " + port));

// get req
app.get("/", (req, res) => {
  var options = { root: path.join(__dirname, PUBLIC_DIR_PATH) };
  res.sendFile("index.html", options);
});
