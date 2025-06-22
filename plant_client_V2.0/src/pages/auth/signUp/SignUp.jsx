import { FaFacebookF, FaTree } from "react-icons/fa6";
import GitHubLogin from "../../../components/shared/auth/GitHubLogin";
import GoogleLogin from "../../../components/shared/auth/GoogleLogin";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { Input, Password, FileInput, Radio, RadioGroup } from "rizzui";
import { Link, useNavigate } from "react-router-dom";
import {
  useGithubLoginMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
} from "../../../features/auth/authApi";
import * as Yup from "yup";
import { imageUpload } from "../../../api/utils";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../components/shared/loader/Loader";
import "./signup.css";
import { getCurrentAddress } from "../../../features/auth/getCurrentAddress";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const SignUp = () => {
  const [googleLogin] = useGoogleLoginMutation();
  const [githubLogin] = useGithubLoginMutation();
  const navigate = useNavigate();
  const [register, { isLoading, error: responseError, isSuccess }] =
    useRegisterMutation();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    avatar: null,
    dateOfBirth: null,
    gender: "",
  };
  // Validation schema
  const registerSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Name is required!")
      .min(3, "Name must be at least 3 characters."),
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email format."),
    dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/\d/, "Password must contain at least one number.")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character."
      ),
    avatar: Yup.mixed()
      .required("Avatar is required!")
      .test("fileSize", "File too large, max size is 2MB.", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB
      })
      .test(
        "fileType",
        "Unsupported file format. Only images allowed.",
        (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          );
        }
      ),
  });
  // Background Style
  const bgStyle = {
    backgroundImage: `url('https://i.ibb.co/g3RNsyL/banner.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // get location from geolocation
      const currentAddress = await getCurrentAddress();
      // console.log(currentAddress);
      // upload avatar cloud
      const image = values.avatar;
      const imageData = await imageUpload(image);

      const rawDate = values.dateOfBirth; // assuming you used this field in Formik
      const formattedDOB = {
        year: rawDate?.getUTCFullYear() || null,
        month: rawDate ? rawDate.getUTCMonth() + 1 : null, // getUTCMonth is 0-based
        day: rawDate?.getUTCDate() || null,
      };
      console.log(formattedDOB);
      // console.log(imageData, values);
      // Registration API call with image URL

      const response = await register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        avatar: imageData?.data?.display_url,
        address: currentAddress,
        DOB: formattedDOB,
        gender: values.gender,
      }).unwrap();

      console.log(response);

      if (isSuccess) {
        resetForm();
        setSubmitting(false);
        toast.success(`Welcome, ${values.name}!! You registered successfully`);
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };
  const handleGoogleLogin = async () => {
    await googleLogin();
  };

  const handleGitHubLogin = async () => {
    await githubLogin();
  };
  return (
    <>
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
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
              >
                {({
                  errors,
                  touched,
                  values,
                  handleChange,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <Form className="space-y-5">
                    <div className="form-control">
                      <Input
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        inputClassName={`border-2 ${
                          errors.fullName && touched.fullName
                            ? "border-red-500"
                            : "border-lime-500"
                        } bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2`}
                      />
                      {errors.fullName && touched.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="form-control">
                      <Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
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
                    </div>

                    <div className="form-control">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <ReactDatePicker
                        selected={values.dateOfBirth}
                        onChange={(date) => setFieldValue("dateOfBirth", date)}
                        placeholderText="Select Date"
                        className="w-full p-2 border-2 rounded-md bg-white opacity-80 border-lime-500 focus:outline-lime-500 outline-none focus:outline-none"
                      />
                      {errors.dateOfBirth && touched.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="gender" className="font-semibold mt-4">
                        Select Gender
                      </label>
                      <RadioGroup
                        value={values.gender}
                        setValue={(val) => setFieldValue("gender", val)}
                        className="flex gap-4 mt-2"
                      >
                        <Radio
                          label="Male👨‍🦰"
                          value="male"
                          inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
                        />
                        <Radio
                          label="Female👩‍🦰"
                          value="female"
                          inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
                        />
                      </RadioGroup>
                    </div>

                    <div className="form-control">
                      <FileInput
                        label="Upload Avatar"
                        name="avatar"
                        className="custom-file-input"
                        onChange={(e) =>
                          setFieldValue("avatar", e.target.files[0])
                        }
                        inputClassName={`border-2 ${
                          errors.avatar && touched.avatar
                            ? "border-red-500"
                            : "border-lime-500"
                        } bg-white opacity-100 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2`}
                      />
                      {errors.avatar && touched.avatar && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.avatar}
                        </p>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                        className="py-2 w-full bg-lime-300 border-2 font-bold text-black hover:bg-white hover:text-black hover:shadow-lg transition duration-200 rounded-md"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading || isSubmitting ? <Loading /> : "Register"}
                      </button>
                      {responseError && (
                        <p className="text-red-500 text-sm mt-2">
                          {responseError.data?.message ||
                            "Registration failed!"}
                        </p>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-[16px]">
                  Don't Have an account?{" "}
                  <Link to="/login">
                    <span className="text-[12px] ml-2 underline text-blue-600 font-bold">
                      Login
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

export default SignUp;
