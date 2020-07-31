const { v4: uuidv4 } = require("uuid");
const express = require("express");

const app = express();
const http = require("http").createServer(app);

app.use(express.json());

const rooms = [];

app.get("/", (req, res) => {
  res.send("hello there");
});

app.post("/", (req, res) => {
  let { roomId, nickname } = req.body;
  if (!roomId) roomId = createRoom();
  joinToRoom(roomId, nickname);

  res.send({ roomId });
});

function createRoom() {
  const room = {
    id: uuidv4(),
    users: [],
    messages: [],
  };
  rooms.push(room);
  return room.id;
}

function joinToRoom(roomId, nickname) {
  const room = rooms.find((room) => room.id === roomId);
  const user = {
    id: uuidv4(),
    nickname,
  };
  room.users.push(user);
  console.log(room, rooms);
}

http.listen(3210, () => {
  console.log("listening on *:3210");
});
