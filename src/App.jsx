import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage.jsx";
import TryOnUI from "./components/TryOnUI.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ now Link will work everywhere */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/UI" element={<TryOnUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;