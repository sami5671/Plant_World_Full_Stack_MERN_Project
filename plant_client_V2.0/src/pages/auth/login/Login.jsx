import { FaFacebookF, FaTree } from "react-icons/fa6";
import GitHubLogin from "../../../components/shared/auth/GitHubLogin";
import GoogleLogin from "../../../components/shared/auth/GoogleLogin";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "rizzui";
import { Password } from "rizzui";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useGithubLoginMutation,
  useGoogleLoginMutation,
  useLoginMutation,
} from "../../../features/auth/authApi";
import { useEffect, useState } from "react";
import Loading from "../../../components/shared/loader/Loader";

const Login = () => {
  const [
    googleLogin,
    { isSuccess: isGoogleLoginSuccess, responseError: googleResponseError },
  ] = useGoogleLoginMutation();
  const [githubLogin, { isSuccess: isGitHubLoginSuccess }] =
    useGithubLoginMutation();
  const MAXLENGTH = 50;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, isLoading, isSuccess, error: responseError }] =
    useLoginMutation();

  const navigate = useNavigate();

  // ========================Input validation using Formik and Yup ====================
  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Required!").email("Invalid Email!"),
    password: Yup.string().required("Required!"),
  });

  const handleSubmit = (values) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
  };

  const handleGitHubLogin = async () => {
    await githubLogin();
  };

  useEffect(() => {
    if (isSuccess || isGoogleLoginSuccess || isGitHubLoginSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate, isGoogleLoginSuccess, isGitHubLoginSuccess]);

  // ====================Adding the background Style=================
  const bgStyle = {
    backgroundImage: `url('https://i.ibb.co/g3RNsyL/banner.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center"
        style={bgStyle}
      >
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="flex-shrink-0 w-full rounded-2xl shadow-2xl lg:px-28 bg-white bg-opacity-30 p-8">
              {/* Header Section */}
              <div className="text-center mb-8">
                <span className="flex justify-center text-lime-500 text-3xl lg:text-6xl">
                  <FaTree />
                </span>
                <h1 className="text-2xl font-bold text-slate-500 mb-2">
                  Already have an account?
                </h1>
                <p className="text-[14px] font-bold text-slate-500">
                  Use Social Media Credentials
                </p>
              </div>

              {/* Social Login */}
              <div className="flex justify-center gap-6 mt-6">
                <button onClick={handleGoogleLogin}>
                  <GoogleLogin />
                </button>
                <button onClick={handleGitHubLogin}>
                  <GitHubLogin />
                </button>
                <p className="border-2 text-4xl text-blue-500 bg-slate-200 shadow-xl p-1 rounded-md">
                  <FaFacebookF />
                </p>
              </div>

              <div className="divider my-6">OR</div>

              {/* Formik Form */}
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, handleChange }) => (
                  <Form className="space-y-5">
                    <div className="form-control">
                      <Input
                        label="Email"
                        name="email"
                        value={values.email}
                        placeholder="Enter Your Name"
                        maxLength={MAXLENGTH}
                        onChange={handleChange}
                        suffix={`${values.email.length}/${MAXLENGTH}`}
                        suffixClassName="opacity-90"
                        inputClassName={`border-2 ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-lime-500"
                        } bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2`}
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="form-control">
                      <Password
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        inputClassName={`border-2 ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-lime-500"
                        } bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2`}
                        visibilityToggleIcon={(visible) =>
                          visible ? (
                            <LockOpenIcon className="h-auto w-5" />
                          ) : (
                            <LockClosedIcon className="h-auto w-5" />
                          )
                        }
                      />
                      {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}

                      <label className="label">
                        <a
                          href="#"
                          className="label-text-alt link link-hover text-blue-500"
                        >
                          Forgot password?
                        </a>
                      </label>
                    </div>

                    <div className="mt-6">
                      {isLoading ? (
                        <button className="py-2 w-full bg-lime-300 border-2 font-bold text-black hover:bg-white hover:text-black hover:shadow-lg transition duration-200 rounded-md">
                          <Loading />
                        </button>
                      ) : (
                        <button
                          className="py-2 w-full bg-lime-300 border-2 font-bold text-black hover:bg-white hover:text-black hover:shadow-lg transition duration-200 rounded-md"
                          type="submit"
                        >
                          Login
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-[16px]">
                  Don't Have an account?{" "}
                  <Link to="/signup">
                    <span className="text-[12px] ml-2 underline text-blue-600 font-bold">
                      Sign Up
                    </span>
                  </Link>
                </p>
                <p className="text-[12px]">
                  For any issues or assistance, email{" "}
                  <a
                    href="mailto:samialam5671@gmail.com"
                    className="underline text-blue-500"
                  >
                    samialam5671@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
