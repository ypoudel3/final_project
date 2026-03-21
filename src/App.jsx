import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage.jsx";
import TryOnUI from "./components/TryOnUI.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/UI" element={<TryOnUI />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;