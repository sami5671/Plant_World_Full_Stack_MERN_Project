import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import LocalPayment from "./SSLCommerz/LocalPayment";
import CheckoutForm from "./stripePayment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("stripe");

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="shadow-lg rounded-xl w-full max-w-2xl p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-primary-dashboardPrimaryTextColor border-b pb-2">
          💰 Choose Your Payment Method
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <label
            className={`flex items-center gap-3 cursor-pointer border px-4 py-2 rounded-lg shadow-sm transition-all ${
              selectedMethod === "stripe"
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={selectedMethod === "stripe"}
              onChange={() => setSelectedMethod("stripe")}
              className="hidden"
            />
            <FaCreditCard className="text-lg" />
            <span>Stripe Payment</span>
          </label>

          <label
            className={`flex items-center gap-3 cursor-pointer border px-4 py-2 rounded-lg shadow-sm transition-all ${
              selectedMethod === "local"
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="local"
              checked={selectedMethod === "local"}
              onChange={() => setSelectedMethod("local")}
              className="hidden"
            />
            <FaMoneyBillWave className="text-lg" />
            <span>Local Payment</span>
          </label>
        </div>

        <div className="border-t pt-4">
          {selectedMethod === "local" ? (
            <LocalPayment />
          ) : (
            <>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
