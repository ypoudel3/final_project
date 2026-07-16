import { Outlet, Navigate } from "react-router-dom";
import SellerNavbar from "./SellerNavbar"; // You'll create this next
// You can omit the Footer here if the seller dashboard doesn't need one

const SellerLayout = () => {
  // Gate every seller page behind login. If there's no token, bounce
  // straight to the seller login screen instead of rendering the dashboard.
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/hosting/login" replace />;
  }

  return (
    <>
      <SellerNavbar /> 
      <div className="seller-content">
        <Outlet /> {/* This is where Today, Listings, etc., will render */}
      </div>
    </>
  );
};

export default SellerLayout;