import React from "react";

export default function ChatMessages() {
  return (
    <div className="messages-container">
      <ul className="messages">
        <li className="message">
          <span className="message-author">Michael</span>
          <span className="message-text">Hi</span>
          <span className="message-time">14:86</span>
        </li>
        <li className="message">
          <span className="message-author">Michael</span>
          <span className="message-text">
            You think water moves fast? You should see ice. It moves like it has
            a mind. Like it knows it
          </span>
          <span className="message-time">14:86</span>
        </li>
        <li className="message my-message">
          <span className="message-author">Me</span>
          <span className="message-text">You think water moves fast?</span>
          <span className="message-time">14:86</span>
        </li>
      </ul>
    </div>
  );
}
