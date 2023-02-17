import React from "react";
import { useSelector } from "react-redux";

import { User } from "./User.js";
import "./Users.css";

function UsersList() {
  const users = useSelector((state) => state.usersReducer);

  return (
    <div>
      <div className="user-list-container">
        {users.map((user) => (
          <User user={user} key={user?._id}></User>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
