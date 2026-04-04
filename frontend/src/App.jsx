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

function App() {
  return (
    <AuthProvider> {/* ✅ WRAP EVERYTHING */}
      <BrowserRouter>
        <Routes>

          {/* --- MAIN SITE (Buyer View) --- */}
          <Route element={<MainLayout />}>

            <Route path="/" element={<LandingPage />} />
            <Route path="/UI" element={<TryOnUI />} />
            <Route path="/Tutorials" element={<Tutorials />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/Mygallery" element={<Mygallery />} />

            {/* Seller Routes */}
            <Route path="/layout" element={<SellerLayout />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/login" element={<SellerLogin />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/messages" element={<MessagesPage />} />

          </Route>

        </Routes>

        {/* ✅ GLOBAL MODAL (important) */}
        <AuthModal />

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;