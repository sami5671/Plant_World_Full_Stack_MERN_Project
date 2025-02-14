const OrderSummary = () => {
  return (
    <>
      {/* order Summary */}
      <div className="bg-slate-100 mt-4 lg:mt-3 lg:ml-12 rounded-2xl px-4 lg:px-6 text-slate-500 mb-12 py-4">
        <h1 className="text-2xl text-lime-500 font-bold mb-2">Order Summary</h1>
        <hr />
        <div className="flex justify-between items-center mb-2 ">
          <p>Subtotal </p>
          <span className="text-black font-bold">$ 89</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p>Shipping Fee</p>
          <span className="text-black font-bold">$0</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p>Use Voucher code For Discount</p>
          <span className="text-black font-bold">$ -5</span>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-center mb-2">
          <div className="lg:flex-grow">
            <input
              type="text"
              id="voucherInput"
              placeholder="Enter Voucher Code R45"
              className="border-2 text-center py-1"
            />
          </div>
          <button
            // onClick={handleApplyVoucher}
            className=" bg-lime-600 hover:bg-lime-400 font-bold transition duration-300 ease-in-out text-white px-4 py-1 rounded-sm"
          >
            Apply
          </button>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-4 mb-2">
          <p className="text-xl">Total</p>
          <span className="text-orange-500 text-xl">$ 78</span>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2">
          <p className="text-xl">After Discount</p>
          <span className="text-orange-500 text-xl">$ 89</span>
        </div>
        {/* ==================user info============ */}
        <hr />

        <button
          type="button"
          className="w-full px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-amber-500 bg-amber-400 mt-6 text-white font-bold"
        >
          Proceed To Checkout
        </button>

        <button
          type="button"
          disabled
          className="w-full px-4 py-2 rounded-md transition duration-300 ease-in-out bg-amber-200 mt-6 text-white font-bold"
        >
          Proceed To Checkout
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
