import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Mainlayout.jsx";
import SellerLayout from "./components/SellerLayout.jsx";
import LandingPage from "./components/Landingpage.jsx";
import TryOnUI from "./components/TryOnUI.jsx";
import Tutorials from "./components/Tutorials.jsx";
import Pricing from "./components/Pricing.jsx";
import Mygallery from "./components/Mygallery.jsx";
import SellerLogin from "./components/SellerLogin.jsx";
import { TodayPage, ListingsPage, MessagesPage } from "./components/SellerPages.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- MAIN SITE (Buyer View) --- */}
        {/* This "element" acts as a wrapper that includes Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/UI" element={<TryOnUI />} />
          <Route path="/Tutorials" element={<Tutorials />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Mygallery" element={<Mygallery />} />
          <Route path="/layout" element={<SellerLayout />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/login" element={<SellerLogin/>}/>
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;