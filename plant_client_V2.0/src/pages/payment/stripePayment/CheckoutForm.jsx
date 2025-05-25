import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

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
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../../features/users/cartSlice";

// Validation schema
const validationSchema = Yup.object({
  billerName: Yup.string().required("Biller Name is required"),
  zipCodeBiller: Yup.string().required("Biller Zip Code is required"),
  billerEmail: Yup.string()
    .email("Invalid email")
    .required("Biller Email is required"),
  billerPhone: Yup.string().required("Biller Phone is required"),
  shippingAddress: Yup.string().required("Shipping Address is required"),
  receiverName: Yup.string().required("Receiver Name is required"),
  zipCodeReceiver: Yup.string().required("Receiver Zip Code is required"),
  receiverEmail: Yup.string()
    .email("Invalid email")
    .required("Receiver Email is required"),
  receiverPhone: Yup.string().required("Receiver Phone is required"),
});

const CheckoutForm = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const cartCalculation = useSelector((state) => state?.cart);
  const cart = useSelector((state) => state?.cart);
  const user = useSelector((state) => state?.auth?.user?.data);
  const price = cartCalculation.totalPriceAfterDiscount;

  const plantId = cart?.cart?.plants?.map((item) => item.plant._id);
  const cartId = cart?.cart?._id;
  const userId = user?._id;
  // console.log(userId);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [
    makeOrder,
    {
      isLoading: makeOrderLoading,
      isError: makeOrderError,
      isSuccess: makeOrderSuccess,
    },
  ] = useMakeOrderMutation();

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

  useEffect(() => {
    if (makeOrderSuccess) {
      toast.success("Order placed successfully!");
      setProcessing(false);
    }
  }, [makeOrderSuccess]);

  const initialValues = {
    billerName: user?.name || "",
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

    // console.log(values);

    if (!stripe || !elements) {
      setSubmitting(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setSubmitting(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setSubmitting(false);
      return;
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
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
      const orderInfo = {
        billerName: values.billerName,
        billerEmail: values.billerEmail,
        billerZipCode: values.zipCodeBiller,
        billerPhone: values.billerPhone,
        shippingAddress: values.shippingAddress,
        receiverName: values.receiverName,
        receiverEmail: values.receiverEmail,
        receiverZipCode: values.zipCodeReceiver,
        receiverPhone: values.receiverPhone,
        orderStatus: "pending",
        paymentStatus: "paid",
      };

      const orderData = {
        transactionId: paymentIntent.id,
        orderInfo,
        userId,
        plantId,
        cartId,
      };
      console.log(orderData);
      await makeOrder({ orderData });
      toast.success(`Payment Successful! Transaction ID: ${paymentIntent.id}`);
      resetForm();
      dispatch(resetCart());
      navigate("/dashboard/cart");
    }

    setProcessing(false);
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="text-center mb-6">
        <img src={stripeLogo} className="w-20 mx-auto" alt="Stripe" />
        <h1 className="text-3xl font-bold">
          <span className="text-cyan-600">Stripe</span>{" "}
          <span className="text-slate-600">Payment</span>
        </h1>
        <div className="flex items-center justify-center mt-4 space-x-4">
          {[visa, mastercard, americanExpress, discover, jcb].map((img, i) => (
            <img key={i} src={img} className="w-12" alt="Payment Option" />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Card Section */}
        <div className="w-full lg:w-1/2">
          <DummyCards />
          <div className="mt-6">
            <label className="block font-bold mb-1">Enter Card Number:</label>
            <CardElement
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
            {cardError && <p className="text-red-500 mt-2">{cardError}</p>}
          </div>
        </div>

        {/* RIGHT: Billing and Shipping */}
        <div className="w-full lg:w-1/2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                <h2 className="text-xl font-semibold mb-2">Billing Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>Name</label>
                    <Field name="billerName" className="input" disabled />
                    <ErrorMessage
                      name="billerName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Zip Code</label>
                    <Field name="zipCodeBiller" className="input" />
                    <ErrorMessage
                      name="zipCodeBiller"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <Field name="billerEmail" className="input" disabled />
                    <ErrorMessage
                      name="billerEmail"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Phone</label>
                    <PhoneInput
                      country={"us"}
                      value={values.billerPhone}
                      onChange={(value) => setFieldValue("billerPhone", value)}
                      inputStyle={{
                        width: "100%",
                        padding: "12px 24px",
                        border: "1px solid #a855f7",
                        borderRadius: "8px",
                        color: "#1f2937",
                        fontSize: "14px",
                      }}
                    />
                    <ErrorMessage
                      name="billerPhone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label>Shipping Address</label>
                    <Field name="shippingAddress" className="input" />
                    <ErrorMessage
                      name="shippingAddress"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                  Receiver Info
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>Name</label>
                    <Field name="receiverName" className="input" />
                    <ErrorMessage
                      name="receiverName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Zip Code</label>
                    <Field name="zipCodeReceiver" className="input" />
                    <ErrorMessage
                      name="zipCodeReceiver"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <Field name="receiverEmail" className="input" />
                    <ErrorMessage
                      name="receiverEmail"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Phone</label>
                    <PhoneInput
                      country={"us"}
                      value={values.receiverPhone}
                      onChange={(value) =>
                        setFieldValue("receiverPhone", value)
                      }
                      inputStyle={{
                        width: "100%",
                        padding: "12px 24px",
                        border: "1px solid #a855f7",
                        borderRadius: "8px",
                        color: "#1f2937",
                        fontSize: "14px",
                      }}
                    />
                    <ErrorMessage
                      name="receiverPhone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded transition"
                  disabled={isSubmitting || processing}
                >
                  {processing ? (
                    <span className="flex justify-center items-center gap-2">
                      <ImSpinner9 className="animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
