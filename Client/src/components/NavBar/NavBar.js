import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import decode from "jwt-decode";

import "./NavBar.css";
import setCurrentUser from "../../actions/currentUser";
import { useNavigate } from "react-router-dom";

var logo = require("../../assets/logo-stackoverflow.png");

export default function NavBar() {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="nav-item  nav-logo">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <div>
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
            </svg>
          </div>
          <input type="text" placeholder="Search..." />
        </form>
        <div>
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-link">
              Log In
            </Link>
          ) : (
            <div className="user-details-logout">
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{ textDecoration: "none" }}>
                <Avatar
                  backgroundColor={"#009dff"}
                  px="35px"
                  py="35px"
                  color={"white"}
                  borderRadius="50%">
                  {" " + User.result.name.charAt(0).toUpperCase() + " "}
                </Avatar>
              </Link>
              <button className="nav-item nav-link" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
          {/* <div></div> */}
        </div>
      </nav>
    </div>
  );
}
