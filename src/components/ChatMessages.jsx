import React, { useEffect, useRef } from "react";

export default function ChatMessages({ user, messages }) {
  const messagesRef = useRef();

  useEffect(() =>
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
  );

  return (
    <div className="messages-container" ref={messagesRef}>
      <ul className="messages">
        {messages.map((msg, i) => (
          <li
            key={i}
            className={
              msg.author.id === user.id ? "message my-message" : "message"
            }
          >
            <span className="message-author">{msg.author.nickname}</span>
            <span className="message-text">{msg.text}</span>
            <span className="message-time">{msg.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
