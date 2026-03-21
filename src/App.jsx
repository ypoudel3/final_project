import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage.jsx";
import TryOnUI from "./components/TryOnUI.jsx";
import Tutorials from "./components/Tutorials.jsx";
import Pricing from "./components/Pricing.jsx";
import Mygallery from "./components/Mygallery.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/UI" element={<TryOnUI />} />
        <Route path="/Tutorials" element={<Tutorials />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Mygallery" element={<Mygallery />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;