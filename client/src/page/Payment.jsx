import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useBook } from "../context/Booking";
import { useAuth } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useBook();
  const [auth] = useAuth();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (location?.state) {
      setAmount(location.state.price || 0);
      setTitle(location.state.product || "Product");
    }
  }, [location]);

  const countryCodeConversion = (country) => {
    const countryMapping = {
      India: "IN",
    };
    return countryMapping[country] || country;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not ready. Try again.");
      return;
    }

    if (
      !customerName ||
      !customerAddress.line1 ||
      !customerAddress.city ||
      !customerAddress.country
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Card input not found.");
      return;
    }

    const convertedCountry = countryCodeConversion(customerAddress.country);

    const paymentPayload = {
      amount: amount * 100, // in cents
      currency: "usd",
      description: `Payment for ${title}`,
      customerName,
      customerAddress: { ...customerAddress, country: convertedCountry },
    };

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/booking/create-payment-intent`,
        paymentPayload
      );

      const clientSecret = data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Missing clientSecret");
      }
      console.log(customerAddress);

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: customerName,
              address: {
                line1: customerAddress.line1,
                city: customerAddress.city,
                state: customerAddress.state,
                postal_code: customerAddress.postalCode?.toString(),
                country: convertedCountry,
              },
            },
          },
        }
      );

      if (error) {
        toast.error(`Payment failed: ${error.message}`);
        console.log("error is here");
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const bookingData = {
          token: auth?.token,
          postId: location.state?.postId,
          bookingDate: new Date(),
          transactionId: paymentIntent.id,
        };

        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/booking/create-booking`,
          bookingData
        );

        const updatedBooking = [
          ...book,
          { title, amount, customerName, postId: location.state?.postId },
        ];
        setBook(updatedBooking);
        localStorage.setItem("booking", JSON.stringify(updatedBooking));

        await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/booking/update-availability`,
          {
            postId: location.state?.postId,
            isAvailable: false,
          }
        );

        toast.success("Payment and booking successful!");
        navigate("/user/your-order");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-4 shadow">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-lg text-gray-600">
          Price:{" "}
          <span className="text-green-600 font-semibold">
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Address Line 1"
          value={customerAddress.line1}
          onChange={(e) =>
            setCustomerAddress({ ...customerAddress, line1: e.target.value })
          }
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="City"
          value={customerAddress.city}
          onChange={(e) =>
            setCustomerAddress({ ...customerAddress, city: e.target.value })
          }
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="State"
          value={customerAddress.state}
          onChange={(e) =>
            setCustomerAddress({ ...customerAddress, state: e.target.value })
          }
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          placeholder="Postal Code"
          value={customerAddress.postalCode}
          onChange={(e) =>
            setCustomerAddress({
              ...customerAddress,
              postalCode: e.target.value,
            })
          }
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          placeholder="Country (e.g., India)"
          value={customerAddress.country}
          onChange={(e) =>
            setCustomerAddress({ ...customerAddress, country: e.target.value })
          }
          className="w-full p-3 border rounded"
          required
        />

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Card Details</label>
          <CardElement
            id="card"
            className="p-3 border rounded bg-white"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 mt-4 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
