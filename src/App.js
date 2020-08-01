import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatContainer from "./components/ChatContainer";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  const getRoomIdFromUrl = () => window.location.pathname.substr(1);
  const setRoomIdToUrl = (roomId) =>
    roomId && window.history.pushState({}, "", roomId);

  useEffect(() => {
    const roomIdFromUrl = getRoomIdFromUrl();
    roomIdFromUrl && setRoomId(roomIdFromUrl);
  }, []);

  const loginHandler = async (nickname) => {
    const { data } = await axios.post("/", { nickname, roomId });

    setUser(data.user);
    setRoomId(data.roomId);
    setRoomIdToUrl(data.roomId);

    const {
      data: { room },
    } = await axios.get(`/${data.roomId}`);
    setRoom(room);
    setIsLogin(true);
  };

  return (
    <>
      {!isLogin ? (
        <Login loginHandler={loginHandler} />
      ) : (
        <ChatContainer room={room} user={user} />
      )}
    </>
  );
}

export default App;
