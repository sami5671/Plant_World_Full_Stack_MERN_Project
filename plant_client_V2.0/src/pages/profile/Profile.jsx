import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Select } from "rizzui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useGetUserProfileInfoQuery,
  useUpdateUserPasswordMutation,
  useUpdateUserProfileInfoMutation,
} from "../../features/users/userApi";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formattedDOB, imageUpload } from "../../api/utils";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

const GenderOptions = [
  { label: "Male 👨‍🦰", value: "male" },
  { label: "Female 👩‍🦰", value: "female" },
];

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Profile = () => {
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    alternativeEmail: "",
    primaryNumber: "",
    alternativeNumber: "",
    occupation: "",
    gender: "",
    DOB: null,
    address: "",
    role: "",
    biography: "",
    avatar: "",
  });

  const user = useSelector((state) => state?.auth?.user);
  const userId = user?._id;

  const { data: userInfo, isSuccess: isUserInfoSuccess } =
    useGetUserProfileInfoQuery({ userId });

  const [
    updateUserProfileInfo,
    { isSuccess: isUpdateUserInfoSuccess, isLoading: isUpdateUserInfoLoading },
  ] = useUpdateUserProfileInfoMutation();

  const [
    updateUserPassword,
    { isSuccess: isUpdatePasswordSuccess, isLoading: isUpdatePasswordLoading },
  ] = useUpdateUserPasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = async () => {
    if (!image) {
      toast.info("Please select an image first", { position: "top-center" });
      return;
    }
    const imageData = await imageUpload(image);
    // console.log(imageData?.data?.display_url);
    try {
      updateUserProfileInfo({
        id: user._id,
        avatar: imageData?.data?.display_url,
      });
      toast("Image uploaded successfully", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  // form submit
  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log("Submitted:", values);

    const dateOfBirth = await formattedDOB(values?.DOB);
    try {
      updateUserProfileInfo({
        id: user._id,
        fullName: values.fullName,
        email: values.email,
        alternativeEmail: values.alternativeEmail,
        primaryNumber: values.primaryNumber,
        alternativeNumber: values.alternativeNumber,
        occupation: values.occupation,
        gender: values.gender,
        DOB: dateOfBirth,
        address: values.address,
        role: values.role,
        biography: values.biography,
      });
      toast("profile updated successfully");
      setSubmitting(false);
    } catch (error) {
      toast.error(error);
    }
    // console.log(dateOfBirth);
  };

  // password change
  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.error("Both old and new passwords are required", {
        position: "top-center",
      });
      return;
    }

    try {
      updateUserPassword({
        id: user._id,
        oldPassword,
        newPassword,
      });
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  useEffect(() => {
    if (isUserInfoSuccess && userInfo?.data) {
      const { year, month, day } = userInfo?.data?.DOB || {};
      const dateOfBirth =
        year && month && day ? new Date(year, month - 1, day) : null;

      setInitialValues({
        fullName: userInfo.data.fullName || "",
        email: userInfo.data.email || "",
        alternativeEmail: userInfo.data.alternativeEmail || "",
        primaryNumber: userInfo.data.primaryNumber || "",
        alternativeNumber: userInfo.data.alternativeNumber || "",
        occupation: userInfo.data.occupation || "",
        gender: userInfo.data.gender || "",
        DOB: dateOfBirth || null,
        address: userInfo.data.address || "",
        avatar: userInfo.data.avatar || "",
        role: userInfo.data.role || "",
        biography: userInfo.data.biography || "",
      });
    }
  }, [isUserInfoSuccess, userInfo?.data]);

  console.log(user);
  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 bg-gray-50 min-h-screen">
      {/* Left panel omitted for brevity */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                preview ||
                initialValues?.avatar ||
                "https://i.pravatar.cc/150?img=3"
              }
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full"
            />
          </div>
          <label className="mt-4 w-full text-center">
            <div className="flex items-center gap-3 justify-center text-white font-semibold">
              <div className="bg-primary-dashboardPrimaryColor hover:bg-primary-dashboardPrimaryTextColor py-2 px-4 rounded cursor-pointer">
                Upload Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {/* Save Button */}
              <button
                onClick={handleSaveImage}
                className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded cursor-pointer"
              >
                Save Photo
              </button>
            </div>
          </label>
        </div>
        {user?.provider === "local" ? (
          <form onSubmit={handleChangePassword}>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-primary-dashboardPrimaryColor text-white py-2 rounded hover:bg-blue-700"
            >
              Change Password
            </button>
          </form>
        ) : (
          ""
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <Field
                  name="fullName"
                  as={Input}
                  placeholder="Full name"
                  inputClassName="border-lime-500 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Primary Email</label>
                <Field
                  name="email"
                  as={Input}
                  placeholder="Email"
                  readOnly
                  inputClassName="border-lime-500 bg-gray-200 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Alternative Email */}
              <div>
                <label className="block text-sm mb-1">Alternative Email</label>
                <Field
                  name="alternativeEmail"
                  as={Input}
                  inputClassName="border-lime-500 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                  placeholder="Alternative email"
                />
                <ErrorMessage
                  name="alternativeEmail"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Primary Number */}
              <div>
                <label className="block text-sm mb-1">Primary Number</label>
                <Field
                  name="primaryNumber"
                  as={Input}
                  placeholder="Primary number"
                  inputClassName="border-lime-500 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="primaryNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Alternative Number */}
              <div>
                <label className="block text-sm mb-1">Alternative Number</label>
                <Field
                  name="alternativeNumber"
                  as={Input}
                  placeholder="Alternative number"
                  inputClassName="border-lime-500 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="alternativeNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm mb-1">Occupation</label>
                <Field
                  name="occupation"
                  as={Input}
                  placeholder="Occupation"
                  inputClassName="border-lime-500 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="occupation"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm mb-1">Gender</label>
                <Select
                  options={GenderOptions}
                  value={GenderOptions.find(
                    (opt) => opt.value === values.gender
                  )}
                  onChange={(option) => setFieldValue("gender", option.value)}
                  dropdownClassName="bg-white"
                  selectClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm mb-1">Role</label>
                <Field
                  name="role"
                  as={Input}
                  placeholder="User role"
                  readOnly
                  inputClassName="border-lime-500 bg-gray-200 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Date of Birth */}
              <div className="md:col-span-2 grid grid-cols-3 gap-2">
                <div className="form-control">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <ReactDatePicker
                      selected={values.DOB}
                      onChange={(date) => setFieldValue("DOB", date)}
                      placeholderText="Select Date"
                      className="w-full p-2 pr-10 border-2 rounded-md bg-white opacity-80 border-lime-500 focus:outline-lime-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Address</label>
                <Field
                  name="address"
                  as={Input}
                  placeholder="Address"
                  inputClassName="border-lime-500 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="mt-6">
              <label className="block text-sm mb-1">Biography</label>
              <Field
                as="textarea"
                name="biography"
                rows={4}
                className="w-full border border-lime-500 opacity-80 focus:border-lime-600 focus:ring-lime-600 hover:border-lime-600 hover:ring-lime-600 text-gray-800 rounded-md p-2 outline-none"
                placeholder="Write something about yourself..."
              />
              <ErrorMessage
                name="biography"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-primary-dashboardPrimaryTextColor mt-5 text-[10px] lg:text-[14px] text-white px-4 py-2 rounded-full font-bold hover:bg-lime-500"
            >
              {isUpdateUserInfoLoading || isSubmitting ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                "Update Profile"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
