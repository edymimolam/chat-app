import React, { useState } from "react";

export default function ChatMessageInput({ sendMessage }) {
  const [newMessage, setNewMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!newMessage) return;
    sendMessage(newMessage);
    setNewMessage("");
  };
  return (
    <form className="new-message" onSubmit={submitHandler}>
      <input
        type="text"
        className="new-message-input"
        placeholder="Write a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
    </form>
  );
}
