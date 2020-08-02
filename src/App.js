import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatContainer from "./components/ChatContainer";
import axios from "axios";
import io from "socket.io-client";
const { v4: uuidv4 } = require("uuid");

const serverUrl = "http://localhost:3210";

function App() {
  const [socket, setSocket] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  const getRoomIdFromUrl = () => window.location.pathname.substr(1);
  const setRoomIdToUrl = (roomId) =>
    roomId && window.history.pushState({}, "", roomId);

  const loginHandler = (nickname) => {
    socket.emit("JOIN_USER", { nickname, roomId });
  };

  const enterTheRoom = ({ roomId, user }) => {
    axios.get(`${serverUrl}/${roomId}`).then(({ data: { room } }) => {
      setUser(user);
      setRoomId(roomId);
      setRoomIdToUrl(roomId);
      setUsers(room.users);
      setMessages(room.messages);
      setIsLogin(true);
    });
  };

  const sendMessage = (text) => {
    const date = new Date();
    const message = {
      id: uuidv4(),
      text,
      author: user,
      time: `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`,
    };
    socket.emit("SEND_MESSAGE", { message, roomId });
  };

  useEffect(() => {
    const roomIdFromUrl = getRoomIdFromUrl();
    roomIdFromUrl && setRoomId(roomIdFromUrl);

    const socket = io(serverUrl);
    socket.on("SET_USERS", setUsers);
    socket.on("SET_MESSAGES", setMessages);
    socket.on("USER_JOINED", enterTheRoom);
    setSocket(socket);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLogin ? (
        <Login loginHandler={loginHandler} />
      ) : (
        <ChatContainer
          messages={messages}
          users={users}
          user={user}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
}

export default App;
