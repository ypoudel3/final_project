import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Mainlayout.jsx";
import SellerLayout from "./components/SellerLayout.jsx";
import LandingPage from "./pages/Landingpage.jsx";
import TryOnUI from "./pages/TryOnUI.jsx";
import Tutorials from "./pages/Tutorials.jsx";
import Pricing from "./pages/Pricing.jsx";
import Mygallery from "./pages/Mygallery.jsx";
import SellerLogin from "./components/SellerLogin.jsx";
import { TodayPage, ListingsPage, MessagesPage } from "./components/SellerPages.jsx";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal.jsx";
import SellerAuth from "./components/SellerLogin.jsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* --- 1. MAIN SITE (Buyer View - Uses MainLayout) --- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/UI" element={<TryOnUI />} />
            <Route path="/Tutorials" element={<Tutorials />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/Mygallery" element={<Mygallery />} />
            
            {/* The Login page belongs here so it has the Buyer Navbar */}
            <Route path="/login" element={<SellerLogin />} />
          </Route>

          {/* --- 2. SELLER DASHBOARD (Seller View - Uses SellerLayout) --- */}
          <Route element={<SellerLayout />}>
            {/* These are "nested" routes. 
               They will render INSIDE the <Outlet /> of SellerLayout.
            */}
            <Route path="/hosting/today" element={<TodayPage />} />
            <Route path="/hosting/listings" element={<ListingsPage />} />
            <Route path="/hosting/messages" element={<MessagesPage />} />
            <Route path="/SellerLogin" element={<SellerAuth />} />
          </Route>

        </Routes>

        <AuthModal />
      </BrowserRouter>
    
    </AuthProvider>
  );
}
export default App;