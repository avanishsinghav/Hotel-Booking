import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./page/Login";
import Register from "./page/Register";
import HomePage from "./page/HomePage";
import UserRoutes from "./component/routes/Private";
import AdminRoutes from "./component/routes/Admin";
import Userdashboard from "./page/user/Userdashboard";
import YourOrder from "./page/YourOrder";
import Dashboard from "./page/admin/Dashboard";
import CreatePost from "./page/admin/CreatePost";
import CreateCategory from "./page/admin/CreateCategory";
import Advertisment from "./component/Advertisment";
import Footer from "./component/Footer";
import Details from "./page/admin/Details";
import AllPost from "./page/admin/AllPost";
import ProductDetails from "./page/ProductDetails";
import CartPage from "./page/CartPage";
import SearchPage from "./page/SearchPage";
import Hotel from "./component/Hotel";
import Hotels from "./component/Hotels";
import Payment from "./page/Payment";
import ThankYou from "./component/ThankYou";
import SelectedCategory from "./page/SelectedCategory";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hotel" element={<Hotels />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/category/:slug" element={<SelectedCategory />} />

        {/* {user routing} */}
        <Route path="/user" element={<UserRoutes />}>
          <Route path="" element={<Userdashboard />} />
          <Route path="your-order" element={<YourOrder />} />
        </Route>

        {/* {Admiin routing} */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/admin/details" element={<Details />} />
          <Route path="/admin/create-post" element={<CreatePost />} />
          <Route path="/admin/create-category" element={<CreateCategory />} />
          <Route path="/admin/all-post" element={<AllPost />} />
        </Route>
      </Routes>
      {/* {footer} */}
      <Advertisment />
      <Footer />
    </>
  );
}

export default App;
