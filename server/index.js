const { v4: uuidv4 } = require("uuid");
const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

let rooms = [];

app.get("/:id", ({ params: { id } }, res) => {
  const room = getRoom(id);
  res.json({ room });
});

io.on("connection", (socket) => {
  socket.on("JOIN_USER", ({ roomId, nickname }) => {
    if (!roomId) roomId = createRoom();
    const user = joinToRoom(roomId, nickname, socket);

    io.to(socket.id).emit("USER_JOINED", { user, roomId });
    socket.to(roomId).emit("SET_USERS", getRoom(roomId).users);
  });

  socket.on("SEND_MESSAGE", ({ roomId, message }) => {
    addMessage({ roomId, message });
    io.in(roomId).emit("SET_MESSAGES", getRoom(roomId).messages);
  });

  socket.on("disconnect", (reason) => {
    if (reason === "ping timeout") return;
    const roomId = leaveRoom(socket.id);
    rooms.forEach((room) => {
      if (room.id !== roomId) return;
      room.users.length === 0
        ? deleteRoom(roomId)
        : socket.to(roomId).emit("SET_USERS", getRoom(roomId).users);
    });
  });
});

http.listen(3210, () => {
  console.log("listening on *:3210");
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

function getRoom(roomId) {
  const room = rooms.find((room) => room.id === roomId);
  if (!room) throw new Error(`can't  get room with ID ${roomId}`);
  return room;
}

function joinToRoom(roomId, nickname, socket) {
  socket.join(roomId);
  const room = getRoom(roomId);
  const user = {
    id: socket.id,
    nickname,
  };
  room.users.push(user);
  return user;
}

function leaveRoom(id) {
  let leavedRoomId = "";
  rooms.forEach(
    (room) =>
      (room.users = room.users.filter((user) => {
        if (user.id === id) {
          leavedRoomId = room.id;
          return false;
        } else {
          return true;
        }
      }))
  );
  return leavedRoomId;
}

function deleteRoom(id) {
  rooms = rooms.filter((room) => room.id !== id);
}

function addMessage({ roomId, message }) {
  rooms.forEach((room) => {
    if (room.id !== roomId) return;
    room.messages.push(message);
  });
}
