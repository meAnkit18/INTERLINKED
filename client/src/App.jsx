import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Not404Pg from "./pages/Not404Pg";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Not404Pg/>} />
      </Routes>
    </>
  );
}

export default App;
