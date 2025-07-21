import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/Cart.jsx";
import { SearchProvider } from "./context/Search.jsx";
import { BookingProvider } from "./context/Booking.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <SearchProvider>
          <CartProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
            <ToastContainer />
          </CartProvider>
        </SearchProvider>
      </BookingProvider>
    </BrowserRouter>
  </StrictMode>
);
