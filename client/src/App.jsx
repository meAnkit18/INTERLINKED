import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Not404Pg from "./pages/Not404Pg";
import AccoutDetails from "./pages/AccoutDetails";
import Home from "./pages/Home";
import  NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import PostDetails from "./pages/PostDetails";


function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/account" element={<AccoutDetails/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/createpost" element={<CreatePost/>} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="*" element={<Not404Pg/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
