import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import Index from "../pages/Index";
import ProductStore from "../pages/ProductStore";
import Shopping from "../pages/Shopping";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import Footer from "../Components/Footer";
import { PATH } from "../utils/path";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/checkout";

function RouterComponent() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={PATH.Index} element={<Index />} />
        <Route path={PATH.Store} element={<ProductStore />} />
        <Route path={PATH.Cart} element={<Cart />} />
        <Route path={PATH.Shopping} element={<Shopping />} />
        <Route path={PATH.Contact_Us} element={<ContactUs />} />
        <Route path={PATH.About_Us} element={<AboutUs />} />
        <Route path={PATH.Product_Details} element={<ProductDetails />} />
        <Route path={PATH.Checkout} element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default RouterComponent;
