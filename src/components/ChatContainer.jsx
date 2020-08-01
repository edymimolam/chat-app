import React from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";

export default function ChatContainer({ room }) {
  return (
    <div className="chat-container">
      <ChatSidebar users={room.users} />
      <ChatMessages />
      <form className="new-message">
        <input
          type="text"
          className="new-message-input"
          placeholder="Write a mesage..."
        />
      </form>
    </div>
  );
}
