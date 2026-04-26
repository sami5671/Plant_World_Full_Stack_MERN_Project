import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { FaCreditCard, FaUser, FaEnvelope, FaMapMarkerAlt, FaHashtag, FaPhone } from "react-icons/fa";

// Images
import visa from "../../../assets/images/visa.png";
import stripeLogo from "../../../assets/images/stripelogo.png";
import mastercard from "../../../assets/images/mastercard.png";
import americanExpress from "../../../assets/images/americanexpress.png";
import discover from "../../../assets/images/discover.png";
import jcb from "../../../assets/images/jcb.png";
import DummyCards from "../../../components/shared/payment/DummyCards";
import { useCreatePaymentIntentMutation } from "../../../features/payment/stripePay/stripePayApi";

// CSS
import "./checkOutform.css";
import { useMakeOrderMutation } from "../../../features/users/orderApi";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../../features/users/cartSlice";
import { motion } from "motion/react";

const validationSchema = Yup.object({
  billerName: Yup.string().required("Required"),
  zipCodeBiller: Yup.string().required("Required"),
  billerEmail: Yup.string().email("Invalid").required("Required"),
  billerPhone: Yup.string().required("Required"),
  shippingAddress: Yup.string().required("Required"),
  receiverName: Yup.string().required("Required"),
  zipCodeReceiver: Yup.string().required("Required"),
  receiverEmail: Yup.string().email("Invalid").required("Required"),
  receiverPhone: Yup.string().required("Required"),
});

const CheckoutForm = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const cart = useSelector((state) => state?.cart);
  const user = useSelector((state) => state?.auth?.user);
  const price = cart?.totalPriceAfterDiscount;

  const plantIdWithQuantity = cart?.cart?.plants?.map((item) => ({
    plantId: item.plant._id,
    quantity: item.quantity,
  }));
  const cartId = cart?.cart?._id;
  const userId = user?._id;

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [makeOrder] = useMakeOrderMutation();

  useEffect(() => {
    if (price > 0) {
      const fetchIntent = async () => {
        try {
          const result = await createPaymentIntent({ price }).unwrap();
          setClientSecret(result.clientSecret);
        } catch (err) {
          console.error("Error creating payment intent:", err);
        }
      };
      fetchIntent();
    }
  }, [price, createPaymentIntent]);

  const initialValues = {
    billerName: user?.fullName || "",
    zipCodeBiller: "",
    billerEmail: user?.email || "",
    billerPhone: "",
    shippingAddress: "",
    receiverName: "",
    zipCodeReceiver: "",
    receiverEmail: "",
    receiverPhone: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setCardError("");
    if (!stripe || !elements || !clientSecret) {
      setSubmitting(false);
      if (!clientSecret) toast.error("Payment session not initialized. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setSubmitting(false);
      return;
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: values.billerEmail,
          name: values.billerName,
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      setSubmitting(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const orderData = {
        transactionId: paymentIntent.id,
        orderInfo: {
          ...values,
          billerZipCode: values.zipCodeBiller,
          receiverZipCode: values.zipCodeReceiver,
          paidAmount: price,
          orderStatus: "pending",
          paymentStatus: "paid",
          totalPrice: cart?.totalPrice,
          totalPriceAfterDiscount: cart?.totalPriceAfterDiscount,
          shippingDiscount: cart?.shippingDiscount,
          shippingHandling: cart?.shippingHandling,
        },
        userId,
        plantIdWithQuantity,
        cartId,
      };

      try {
        await makeOrder({ orderData }).unwrap();
        toast.success("Order placed successfully!");
        resetForm();
        dispatch(resetCart());
        navigate("/dashboard/recent-order");
      } catch (err) {
        toast.error("Payment succeeded but order creation failed. Please contact support.");
      }
    }

    setProcessing(false);
    setSubmitting(false);
  };

  const InputField = ({ label, name, icon: Icon, disabled = false, placeholder }) => (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <Icon className="text-lime-500" />
        {label}
      </label>
      <Field
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
          disabled 
            ? "bg-slate-50 dark:bg-slate-800/50 text-slate-400 border-slate-100 dark:border-slate-800" 
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-lime-500 dark:focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10"
        }`}
      />
      <ErrorMessage name={name} component="div" className="text-rose-500 text-[10px] font-bold" />
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <img src={stripeLogo} className="w-24 mb-2 dark:brightness-200" alt="Stripe" />
          <p className="text-slate-400 text-sm">Powered by Stripe Secure Checkout</p>
        </div>
        <div className="flex gap-2">
          {[visa, mastercard, americanExpress, discover, jcb].map((img, i) => (
            <img key={i} src={img} className="h-8 grayscale hover:grayscale-0 transition-all cursor-help" alt="Card" />
          ))}
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Payment & Billing */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-lime-500 rounded-full" />
                    Payment Information
                  </h3>
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <DummyCards />
                    <div className="mt-6">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Card Details</label>
                      <div className="p-4 rounded-xl bg-white border border-slate-200 focus-within:border-lime-500 transition-all">
                        <CardElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#1e293b",
                                "::placeholder": { color: "#94a3b8" },
                              },
                              invalid: { color: "#e11d48" },
                            },
                          }}
                        />
                      </div>
                      {cardError && <p className="text-rose-500 text-xs mt-2 font-medium">{cardError}</p>}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-lime-500 rounded-full" />
                    Billing Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Name" name="billerName" icon={FaUser} disabled />
                    <InputField label="Zip Code" name="zipCodeBiller" icon={FaHashtag} placeholder="10001" />
                    <InputField label="Email" name="billerEmail" icon={FaEnvelope} disabled />
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <FaPhone className="text-lime-500" /> Phone
                      </label>
                      <PhoneInput
                        country={"us"}
                        value={values.billerPhone}
                        onChange={(val) => setFieldValue("billerPhone", val)}
                        inputClass="!w-full !h-12 !rounded-xl !border-slate-200 dark:!border-slate-700 !bg-white dark:!bg-slate-900 dark:!text-white focus:!border-lime-500"
                        buttonClass="!border-slate-200 dark:!border-slate-700 !bg-white dark:!bg-slate-900 !rounded-l-xl"
                      />
                      <ErrorMessage name="billerPhone" component="div" className="text-rose-500 text-[10px] font-bold" />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Shipping & Receiver */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-lime-500 rounded-full" />
                    Shipping & Receiver
                  </h3>
                  <div className="space-y-4">
                    <InputField label="Shipping Address" name="shippingAddress" icon={FaMapMarkerAlt} placeholder="123 Plant Street, Nature City" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Receiver Name" name="receiverName" icon={FaUser} placeholder="John Doe" />
                      <InputField label="Receiver Zip" name="zipCodeReceiver" icon={FaHashtag} placeholder="10001" />
                    </div>
                    <InputField label="Receiver Email" name="receiverEmail" icon={FaEnvelope} placeholder="receiver@example.com" />
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <FaPhone className="text-lime-500" /> Receiver Phone
                      </label>
                      <PhoneInput
                        country={"us"}
                        value={values.receiverPhone}
                        onChange={(val) => setFieldValue("receiverPhone", val)}
                        inputClass="!w-full !h-12 !rounded-xl !border-slate-200 dark:!border-slate-700 !bg-white dark:!bg-slate-900 dark:!text-white focus:!border-lime-500"
                        buttonClass="!border-slate-200 dark:!border-slate-700 !bg-white dark:!bg-slate-900 !rounded-l-xl"
                      />
                      <ErrorMessage name="receiverPhone" component="div" className="text-rose-500 text-[10px] font-bold" />
                    </div>
                  </div>
                </section>

                <div className="p-6 rounded-[2rem] bg-lime-500 text-white shadow-2xl shadow-lime-500/30">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold uppercase tracking-widest text-lime-100 text-xs">Total Amount</span>
                    <span className="text-3xl font-black">${price}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || processing}
                    className="w-full h-14 rounded-2xl bg-white text-lime-600 font-black text-lg hover:bg-slate-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {processing ? (
                      <>
                        <ImSpinner9 className="animate-spin" />
                        SECURELY PROCESSING...
                      </>
                    ) : (
                      <>
                        <FaCreditCard />
                        COMPLETE PAYMENT
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;
