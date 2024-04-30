import React, { useState, useEffect } from "react";
import "./Auth.css";
import Logo from "../../img/2121.jpg";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [ecode, setEcode] = useState("");
  const [ver, setVer] = useState("");
  const [code, setCode] = useState("");
  const [vcode, setVcode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateRandomWord = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let word = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      word += characters[randomIndex];
    }
    setVcode(word);
  };

  useEffect(() => {
    generateRandomWord();
  }, []);

  const handleCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/getcode`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      setVer(data.verify);
    } catch (error) {
      console.error("Error fetching code:", error);
      setErrorMessage("Error fetching code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (data.password === data.confirmpass) {
          if (ecode === ver) {
            await dispatch(signUp(data, navigate));
          } else {
            setErrorMessage("Invalid verification code");
          }
        } else {
          setErrorMessage("Passwords do not match");
        }
      } else {
        if (vcode === code) {
          const response = await dispatch(logIn(data, navigate));
          if (response.error) {
            setErrorMessage("Wrong username or password.");
          } else {
            let d = new Date();
            localStorage.setItem("loggedinTime", d);
            // Redirect or perform other actions upon successful login
          }
        } else {
          setErrorMessage("Invalid code");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setErrorMessage("Wrong Password");
    }
  };

  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };

  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setData(initialState);
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Synergy Sphere</h1>
          <h6>Connecting Dreams, Creating Realities</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <>
              <div>
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="infoInput"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="button infoButton" onClick={handleCode}>
                  Get Code
                </button>
                <input
                  placeholder="Enter the code"
                  className="infoInput"
                  onChange={(e) => setEcode(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>
          {!isSignUp && (
            <div style={{ padding: "30px 10px 10px 0" }}>
              <h3 style={{ marginTop: "-10px" }}>Enter the code: {vcode}</h3>
              <input
                type="text"
                className="infoInput"
                placeholder="enter the code"
                style={{ marginTop: "-40px", width: "50%" }}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
