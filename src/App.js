import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const getRoomIdFromUrl = () => {
    const roomId = window.location.pathname.substr(1);
    roomId && setRoomId(roomId);
  };
  const setRoomIdToUrl = (roomId) => {
    if (!roomId) return;
    window.location.pathname = roomId;
    setRoomId(roomId);
  };
  useEffect(getRoomIdFromUrl, []);

  const loginHandler = async (nickname) => {
    const { data } = await axios.post("/", { nickname, roomId });
    setRoomIdToUrl(data.roomId);
  };

  return <>{!isLogin && <Login loginHandler={loginHandler} />}</>;
}

export default App;
