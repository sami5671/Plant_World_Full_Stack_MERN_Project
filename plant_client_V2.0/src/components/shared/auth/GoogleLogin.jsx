import { FaGooglePlusG } from "react-icons/fa6";

const GoogleLogin = () => {
  return (
    <div>
      <button
        //   onClick={handleGoogleLogin}
        className="border-2 text-4xl text-green-500 bg-slate-100 shadow-xl p-1"
      >
        <FaGooglePlusG />
      </button>
    </div>
  );
};

export default GoogleLogin;
