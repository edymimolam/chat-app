const { v4: uuidv4 } = require("uuid");
const express = require("express");

const app = express();
const http = require("http").createServer(app);

app.use(express.json());

const rooms = [];

app.get("/:id", ({ params: { id } }, res) => {
  const room = getRoom(id);
  res.json({ room });
});

app.post("/", (req, res) => {
  let { roomId, nickname } = req.body;
  if (!roomId) roomId = createRoom();
  const user = joinToRoom(roomId, nickname);

  res.send({ user, roomId });
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
  const room = getRoom(roomId);

  const user = {
    id: uuidv4(),
    nickname,
  };
  room.users.push(user);
  return user;
}

function getRoom(roomId) {
  const room = rooms.find((room) => room.id === roomId);
  if (!room) throw new Error(`can't  get room with ID ${roomId}`);
  return room;
}

http.listen(3210, () => {
  console.log("listening on *:3210");
});
