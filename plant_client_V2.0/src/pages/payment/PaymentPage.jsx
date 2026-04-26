import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import LocalPayment from "./SSLCommerz/LocalPayment";
import CheckoutForm from "./stripePayment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "motion/react";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("stripe");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 pt-24 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center lg:justify-start gap-3">
            Secure Checkout
            <FaShieldAlt className="text-lime-500 text-2xl" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Complete your purchase by choosing your preferred payment method.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Method Selection Column */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Payment Methods</h2>
            
            <button
              onClick={() => setSelectedMethod("stripe")}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${
                selectedMethod === "stripe"
                  ? "bg-lime-50 border-lime-500 dark:bg-lime-500/10 dark:border-lime-500 shadow-lg shadow-lime-500/10"
                  : "bg-white border-slate-100 hover:border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 dark:hover:border-slate-700"
              }`}
            >
              <div className={`p-3 rounded-xl ${selectedMethod === "stripe" ? "bg-lime-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                <FaCreditCard className="text-xl" />
              </div>
              <div className="text-left">
                <p className={`font-bold ${selectedMethod === "stripe" ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>Stripe</p>
                <p className="text-xs text-slate-400">Credit or Debit Card</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod("local")}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${
                selectedMethod === "local"
                  ? "bg-lime-50 border-lime-500 dark:bg-lime-500/10 dark:border-lime-500 shadow-lg shadow-lime-500/10"
                  : "bg-white border-slate-100 hover:border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 dark:hover:border-slate-700"
              }`}
            >
              <div className={`p-3 rounded-xl ${selectedMethod === "local" ? "bg-lime-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                <FaMoneyBillWave className="text-xl" />
              </div>
              <div className="text-left">
                <p className={`font-bold ${selectedMethod === "local" ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>Local Payment</p>
                <p className="text-xs text-slate-400">SSLCommerz / Wallet</p>
              </div>
            </button>
          </div>

          {/* Form Content Column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMethod}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 md:p-8 rounded-[2rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 premium-shadow"
              >
                {selectedMethod === "local" ? (
                  <LocalPayment />
                ) : (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Security Note */}
            <div className="mt-6 flex items-center justify-center gap-3 text-slate-400 text-sm">
              <FaShieldAlt className="text-emerald-500" />
              <span>Your payment information is encrypted and secure.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
