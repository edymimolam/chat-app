import React from "react";

export default function ChatSidebar({ users }) {
  console.log(users);
  return (
    <div className="chat-sidebar">
      <ul className="users-list">
        {users.map((user) => (
          <li className="users-list-item" key={user.id}>
            {user.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
}
