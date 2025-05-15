// import visa from "../../../../public/Extra/visa";
// import stripeLogo from "../../../../public/Extra/stripelogo";
// import mastercard from "../../../../public/Extra/mastercard";
// import americanExpress from "../../../../public/Extra/americanexpress";
// import discover from "../../../../public/Extra/discover";
// import jcb from "../../../../public/Extra/jcb";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// =================================
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { createPaymentIntent } from "../../../api/utils";
// ==================================
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  // ==========================================

  // ==========================================
  const [billerPhoneNumber, setBillerPhoneNumber] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  // ==========================================

  const price = 12.2;
  useEffect(() => {
    // create payment intent
    if (price > 0) {
      createPaymentIntent({ price: price }).then((data) => {
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
    }
  }, [price]);
  // ==========================================

  // ===============Stripe Form handling Start===========================
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");
    // =================================================================
    const form = event.target;

    const billerName = form.billerName.value;
    const billerZipCode = form.zipCodeBiller.value;
    const billerEmail = form.billerEmail.value;
    const billerPhone = billerPhoneNumber;

    const shippingAddress = form.shippingAddress.value;
    const receiverName = form.receiverName.value;
    const receiverEmail = form.receiverEmail.value;
    const receiverPhone = receiverPhoneNumber;

    const customerInfo = {
      billerName,
      billerZipCode,
      billerEmail,
      billerPhone,
      receiverName,
      shippingAddress,
      receiverEmail,
      receiverPhone,
    };
    console.log(customerInfo);

    // =================================================================

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    // Card data lookup (Asynchronous Network Call )
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);

    // Ekhane taka katbe
    // const { paymentIntent, error: confirmError } =
    //   await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         email: "samialam5671@gmail.com",
    //         name: "Sami alam",
    //       },
    //     },
    //   });

    // if (confirmError) {
    //   console.log(confirmError);
    //   setCardError(confirmError.message);
    // }

    // console.log("payment intent", paymentIntent);

    // if (paymentIntent.status === "succeeded") {
    //   const paymentInfo = {
    //     transactionId: paymentIntent.id,
    //     date: new Date(),
    //     email: user.email,
    //     photo: user.photoURL,
    //     status: "processing",
    //     paymentStatus: "Success",
    //     customerInfo,
    //     car,
    //   };
    //   try {
    //     // save payment information to the server
    //     await saveSoldCarInfo(paymentInfo);

    //     // Update room status in db
    //     // await updateStatus(bookingInfo.roomId, true);
    //     const text = `Booking Successful! ${paymentIntent.id}`;
    //     toast.success(text);
    //     // navigate("/dashboard/my-bookings");
    //     closeModal();
    //   } catch (err) {
    //     console.log(err);
    //     toast.error(err.message);
    //   } finally {
    //     setProcessing(false);
    //   }

    //   setProcessing(false);
    // }
  };
  // ===============Stripe Form handling End===========================
  return (
    <>
      <div className="flex items-center justify-center">
        <img
          // src={stripeLogo}
          className="w-[80px] "
          alt=""
        />
      </div>
      <h1 className="text-center font-bold text-3xl">
        <span className="text-cyan-600">Stripe</span>{" "}
        <span className="text-slate-600">Payment</span>
      </h1>
      <div className="mt-6 flex items-center justify-center mb-10">
        <div>
          <p className="font-bold mr-2">We Allow:</p>
        </div>

        {/* <div className="flex items-center justify-center">
          <img src={visa} className="w-[50px]" alt="" />
          <img src={mastercard} className="w-[50px]" alt="" />
          <img src={americanExpress} className="w-[50px]" alt="" />
          <img src={discover} className="w-[50px]" alt="" />
          <img src={jcb} className="w-[50px]" alt="" />
        </div> */}
      </div>

      <div>
        <h1 className="font-bold">Enter Card Number:</h1>
      </div>
      <form className="my-2" onSubmit={handleSubmit}>
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

        {/* other details */}
        <div>
          {/* billing */}
          <div className="mt-8">
            <h1 className="text-xl font-semibold">Billing Info</h1>
            <hr />
            <div className="flex gap-2 mt-4">
              <div className="space-y-1 text-sm">
                <label htmlFor="biller name" className="block text-gray-600">
                  Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-purple-400 focus:outline-purple-500 rounded-md "
                  name="billerName"
                  type="text"
                  placeholder="Biller Name"
                  required
                  // defaultValue={user?.displayName}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="zip code" className="block text-gray-600">
                  Zip Code
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-purple-400 focus:outline-purple-500 rounded-md "
                  name="zipCodeBiller"
                  type="text"
                  placeholder="Zip"
                  required
                />
              </div>
            </div>
            <div className="space-y-1 text-sm mt-2">
              <label htmlFor="biller email" className="block text-gray-600">
                Email
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-purple-400 focus:outline-purple-500 rounded-md "
                name="billerEmail"
                type="text"
                placeholder="Biller Email"
                disabled
                // defaultValue={user?.email}
              />
            </div>
            <div className="space-y-1 text-sm mt-2">
              <label
                htmlFor="biller phone number"
                className="block text-gray-600"
              >
                Phone Number
              </label>
              <PhoneInput
                country={"ar"}
                value={billerPhoneNumber}
                onChange={setBillerPhoneNumber}
                inputStyle={{
                  width: "100%",
                  padding: "12px 24px",
                  border: "1px solid #a855f7",
                  borderRadius: "8px",
                  color: "#1f2937",
                  fontSize: "14px",
                }}
                buttonStyle={{
                  border: "1px solid #a855f7",
                  borderRadius: "8px 0 0 8px",
                }}
                dropdownStyle={{
                  borderRadius: "8px",
                  border: "1px solid #a855f7",
                  maxHeight: "200px",
                  overflowY: "scroll",
                }}
              />
            </div>
          </div>

          {/* shipping  */}
          <div className="mt-8">
            <h1 className="text-xl font-semibold">Shipping Info</h1>
            <hr />
            <div className="space-y-1 text-sm mt-2">
              <label htmlFor="shipping address" className="block text-gray-600">
                Shipping Address
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-purple-400 focus:outline-purple-500 rounded-md "
                name="shippingAddress"
                type="text"
                placeholder="Shipping Location"
                required
              />
            </div>
            <div className="flex gap-2 mt-4">
              <div className="space-y-1 text-sm">
                <label htmlFor="receiver name" className="block text-gray-600">
                  Receiver's Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-purple-400 focus:outline-purple-500 rounded-md "
                  name="receiverName"
                  type="text"
                  placeholder="Receiver Name"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="zip code" className="block text-gray-600">
                  Zip Code
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-purple-400 focus:outline-purple-500 rounded-md "
                  name="zipCodeS"
                  type="text"
                  placeholder="Zip"
                  required
                />
              </div>
            </div>
            <div className="space-y-1 text-sm mt-2">
              <label htmlFor="receiver email" className="block text-gray-600">
                Receiver's Email
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-purple-400 focus:outline-purple-500 rounded-md "
                name="receiverEmail"
                type="text"
                placeholder="Receiver Email"
                required
              />
            </div>
            <div className="space-y-1 text-sm mt-2">
              <label
                htmlFor="receiver phone number"
                className="block text-gray-600"
              >
                Phone Number
              </label>
              <PhoneInput
                country={"br"}
                value={receiverPhoneNumber}
                onChange={setReceiverPhoneNumber}
                inputStyle={{
                  width: "100%",
                  padding: "12px 24px",
                  border: "1px solid #a855f7",
                  borderRadius: "8px",
                  color: "#1f2937",
                  fontSize: "14px",
                }}
                buttonStyle={{
                  border: "1px solid #a855f7",
                  borderRadius: "8px 0 0 8px",
                }}
                dropdownStyle={{
                  borderRadius: "8px",
                  border: "1px solid #a855f7",
                  maxHeight: "200px",
                  overflowY: "scroll",
                }}
              />
            </div>
          </div>
        </div>
        {/* other details */}
        <div className="flex mt-2 justify-around">
          <button
            type="button"
            className="w-full rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            // onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="w-full ml-2 cursor-pointer rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {/* {processing ? (
              <ImSpinner9 className="m-auto animate-spin" size={24} />
            ) : (
              `Pay ${car?.CarPriceNew}$`
            )} */}
            Pay
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
