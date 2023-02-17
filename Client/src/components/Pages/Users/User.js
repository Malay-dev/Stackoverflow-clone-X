import React from "react";
import { Link } from "react-router-dom";
import "./Users.css";
export const User = ({ user }) => {
  return (
    <>
      <Link to={`/Users/${user._id}`} className="user-profile-link">
        <div className="user-initial">
          <h3>{user.name.charAt(0).toUpperCase()}</h3>
        </div>
        <h5>{user.name}</h5>
      </Link>
    </>
  );
};
