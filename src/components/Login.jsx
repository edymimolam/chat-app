import React, { useState, useEffect, useRef } from "react";

export default function Login({ loginHandler }) {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const nicknameInput = useRef();

  useEffect(() => nicknameInput.current.focus(), []);

  const handleSumblit = (e) => {
    e.preventDefault();
    if (!verifyNickname()) return;
    loginHandler(nickname);
  };

  const verifyNickname = () => {
    if (!nickname) {
      setError("Nickname must be at least 1 symbol");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSumblit} className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="Your nickname please"
          ref={nicknameInput}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </form>
      {error && <div className="login-error">{error}</div>}
    </div>
  );
}
