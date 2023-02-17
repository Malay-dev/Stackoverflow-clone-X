import React from "react";
import { useState } from "react";
import "./Auth.css";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../../actions/auth.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

var logo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="622"
    height="124"
    viewBox="0 0 622 124">
    <g fill="none" fillRule="evenodd">
      <polygon
        fill="#BBBBBB"
        points="88 80 99 80 99 124 0 124 0 80 11 80 11 113 88 113"
      />
      <path
        fill="#F58025"
        fillRule="nonzero"
        d="M22.9878906,76.73 L77.0128906,88.085 L79.2838906,77.285 L25.2588906,65.925 L22.9878906,76.73 Z M30.1368906,50.861 L80.1828906,74.169 L84.8448906,64.16 L34.7978906,40.852 L30.1368906,50.861 Z M43.9848906,26.308 L86.4128906,61.639 L93.4788906,53.154 L51.0508906,17.824 L43.9848906,26.308 Z M71.3718906,0.192 L62.5118906,6.782 L95.4598906,51.082 L104.319891,44.493 L71.3718906,0.192 Z M22,102 L77,102 L77,91 L22,91 L22,102 Z"
      />
    </g>
  </svg>
);
function Auth() {
  const [IsSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter Email and Password");
    }
    if (IsSignUp) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password, dob }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const handleSwitch = () => {
    setIsSignUp(!IsSignUp);
  };
  return (
    <div>
      <section className="auth-section">
        {IsSignUp && <AboutAuth></AboutAuth>}
        <div className="auth-container-2">
          {!IsSignUp && <div className="login-logo">{logo}</div>}
          <form onSubmit={handleSubmit}>
            {IsSignUp && (
              <label htmlFor="name">
                <h4>Display Name</h4>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
            )}
            <label htmlFor="email">
              <h4>Email</h4>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            {IsSignUp && (
              <label htmlFor="date">
                <h4>Date of birth</h4>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </label>
            )}
            <label htmlFor="password">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Password</h4>
                {!IsSignUp && (
                  <p style={{ color: "#007ac6", fontSize: "13px" }}>
                    forgot password?
                  </p>
                )}
              </div>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {IsSignUp && (
                <div>
                  <p style={{ color: "#000", fontSize: "13px" }}>
                    Passwords must contain at least eight characters,<br></br>{" "}
                    including at least 1 letter and 1 number.
                    <br />
                    Password Complexity must contain at least 3 of <br></br>the
                    4 categories: <br /> English Upper case characters (A-Z){" "}
                    <br /> English Lowercase characters (a-z) <br /> Base Digits
                    (0-9) <br /> Non Alphanumeric Characters (e.g.,@,%,#,!)
                  </p>
                </div>
              )}
            </label>
            {IsSignUp && (
              <label htmlFor="check" style={{ display: "flex", gap: "20px" }}>
                <input type="checkbox" id="check"></input>
                <p style={{ fontSize: "13px" }}>
                  Opt-in to receive occasional product <br></br> updates, user
                  research invitations,<br></br> company announcements, and
                  digests.
                </p>
              </label>
            )}
            <button type="submit" className="auth-btn">
              {IsSignUp ? "Sign up" : "Log in"}
            </button>
            {IsSignUp && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                By clicking “Sign up”, you agree to our
                <span style={{ color: "#007ac6" }}> terms of service</span>,
                <span style={{ color: "#007ac6" }}> privacy policy</span> and
                <span style={{ color: "#007ac6" }}> cookie policy</span>
              </p>
            )}
          </form>
          <p>
            {IsSignUp ? "Already have an account!" : "Don't have an Account!"}
            <button
              type="button"
              className="handle-switch-btn"
              onClick={handleSwitch}>
              {IsSignUp ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Auth;
