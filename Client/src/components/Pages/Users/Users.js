import React from "react";
import { useLocation } from "react-router-dom";

import LeftSideBar from "../Home/LeftSideBar";
import UsersList from "./UsersList";
import "./Users.css";

function Users() {
  const location = useLocation();

  return (
    <div className="user-container-1">
      <LeftSideBar></LeftSideBar>
      <div className="user-container-2">
        <h1>Users</h1>
        {location.pathname === "/Users" ? <UsersList></UsersList> : <></>}
      </div>
    </div>
  );
}

export default Users;
