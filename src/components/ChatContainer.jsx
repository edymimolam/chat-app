import React from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatMessageInput from "./ChatMessageInput";

export default function ChatContainer({ users, sendMessage, messages, user }) {
  return (
    <div className="chat-container">
      <ChatSidebar users={users} />
      <ChatMessages messages={messages} user={user} />
      <ChatMessageInput sendMessage={sendMessage} />
    </div>
  );
}
