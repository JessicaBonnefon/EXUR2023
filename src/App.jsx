
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import NavBar from "./components/NavBar/NavBar";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";


function App() {
  return (
    <>
       <NavBar />
      <Routes>
        <Route path='/signup' exact element={<SignUp />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/forgot-password' exact element={<ForgotPassword />} />
        <Route path='/reset-password' exact element={<ResetPassword />} />
        <Route path='/' exact element={<Home />} />
        <Route path='*' exact element={<Home />} />
        <Route path='/profile' exact element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
