import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const path = useLocation();
  const loggedinTime = new Date(localStorage.getItem("loggedinTime"));
   if(path.pathname!=="/auth") {
    if(loggedinTime) {
      setInterval(()=>{
        const now = new Date();
        const timeDifference = now - loggedinTime;
        const minutesDifference = timeDifference / (1000 * 60);
        console.log(minutesDifference)
        if (minutesDifference > 10) {
            localStorage.removeItem("loggedinTime");
            localStorage.removeItem("store");
            localStorage.removeItem("profile")
            window.location.replace("http://localhost:3000/auth");
        }
      },60000)
    }
   }
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
