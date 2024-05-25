import "./App.css";
import IndexPage from "./Pages/IndexPage";
import UserLogin from "./Pages/UserLogin";
import UserDashboard from "./Pages/UserDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions } from "./store/current-user";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Charts from "./Pages/Charts";
import Dashboard from "./Pages/Dashboard";
import Logs from "./Pages/Logs";
import Main from "./Pages/Main";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const alreadyLoggedInUser = localStorage.getItem("currentUser");
    if (alreadyLoggedInUser) {
      dispatch(
        currentUserActions.alreadyLoggedIn(JSON.parse(alreadyLoggedInUser))
      );
    }
  }, []);
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route
          path="/user/login"
          element={
            !currentUser ? <UserLogin /> : <Navigate to="/user/dashboard" element={<Dashboard />} />
          }
        />
        
        
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/logs" element={<Logs />} />
        <Route path="/user/main" element={<Main />} />
        <Route path="/user/charts" element={<Charts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;