import { Outlet } from "react-router-dom";
import SellerNavbar from "./SellerNavbar"; // You'll create this next
// You can omit the Footer here if the seller dashboard doesn't need one

const SellerLayout = () => {
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