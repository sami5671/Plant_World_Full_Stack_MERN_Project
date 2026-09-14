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
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../features/auth/authSlice";

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
  const dispatch = useDispatch();

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
      await updateUserProfileInfo({
        id: user._id,
        avatar: imageData?.data?.display_url,
      }).unwrap();
      dispatch(updateUserProfile({ avatar: imageData?.data?.display_url }));
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
      await updateUserProfileInfo({
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
      }).unwrap();
      dispatch(updateUserProfile({ ...values, DOB: dateOfBirth }));
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

  return (
    <div className="font-outfit relative z-10">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Banner */}
        <div className="w-full h-40 md:h-56 rounded-t-[2.5rem] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          {/* Subtle geometric decorations */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-1/4 bottom-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform translate-y-1/2"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 -mt-20 px-2 md:px-6">
          {/* LEFT PANEL: Avatar & Security */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* Profile Avatar Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center">
              <div className="relative -mt-16 mb-4 group">
                <img
                  src={
                    preview ||
                    initialValues?.avatar ||
                    "https://i.pravatar.cc/150?img=3"
                  }
                  alt="Profile"
                  className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-xl bg-white"
                />
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm gap-1">
                  <HiOutlineCloudArrowUp className="text-3xl" />
                  <span className="font-medium text-xs">Update</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{initialValues.fullName || user?.fullName || "User Name"}</h2>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  initialValues?.role?.toLowerCase() === 'admin' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : initialValues?.role?.toLowerCase() === 'moderator'
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                {initialValues.role || user?.role || "User"}
              </span>

              {/* Action Buttons */}
              <div className="w-full flex gap-3 mt-8">
                <label className="flex-1">
                  <div className="w-full flex items-center justify-center gap-2 bg-white border-2 border-emerald-100 hover:border-emerald-300 text-emerald-700 py-2.5 rounded-xl cursor-pointer transition-colors font-semibold shadow-sm">
                    <HiOutlineCloudArrowUp className="text-xl" />
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </label>
                <button
                  onClick={handleSaveImage}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2.5 rounded-xl font-semibold shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all duration-300"
                >
                  Save Photo
                </button>
              </div>
            </div>

            {/* Change Password Card */}
            {user?.provider === "local" && (
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Security</h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Old Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 outline-none transition-all"
                      placeholder="Enter old password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 outline-none transition-all"
                      placeholder="Enter new password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold shadow-md transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Form */}
          <div className="w-full lg:w-2/3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-100/50">
                    <h2 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
                      Profile Settings
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <Field
                        name="fullName"
                        as={Input}
                        placeholder="Full name"
                        inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                      />
                      <ErrorMessage name="fullName" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Email</label>
                      <Field
                        name="email"
                        as={Input}
                        placeholder="Email"
                        readOnly
                        inputClassName="border-slate-200 bg-slate-100 text-slate-500 rounded-xl p-3 cursor-not-allowed"
                      />
                      <ErrorMessage name="email" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Alternative Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Alternative Email</label>
                      <Field
                        name="alternativeEmail"
                        as={Input}
                        placeholder="Alternative email"
                        inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                      />
                      <ErrorMessage name="alternativeEmail" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Primary Number */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Number</label>
                      <Field
                        name="primaryNumber"
                        as={Input}
                        placeholder="Primary number"
                        inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                      />
                      <ErrorMessage name="primaryNumber" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Alternative Number */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Alternative Number</label>
                      <Field
                        name="alternativeNumber"
                        as={Input}
                        placeholder="Alternative number"
                        inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                      />
                      <ErrorMessage name="alternativeNumber" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Occupation */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Occupation</label>
                      <Field
                        name="occupation"
                        as={Input}
                        placeholder="Occupation"
                        inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                      />
                      <ErrorMessage name="occupation" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                      <Select
                        options={GenderOptions}
                        value={GenderOptions.find((opt) => opt.value === values.gender)}
                        onChange={(option) => setFieldValue("gender", option.value)}
                        dropdownClassName="bg-white border-emerald-100 rounded-xl shadow-lg"
                        selectClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                      />
                      <ErrorMessage name="gender" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                      <Field
                        name="role"
                        as={Input}
                        placeholder="User role"
                        readOnly
                        inputClassName="border-slate-200 bg-slate-100 text-slate-500 rounded-xl p-3 cursor-not-allowed capitalize"
                      />
                      <ErrorMessage name="role" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    {/* Date of Birth */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Date of Birth
                      </label>
                      <ReactDatePicker
                        selected={values.DOB}
                        onChange={(date) => setFieldValue("DOB", date)}
                        placeholderText="Select Date"
                        className="w-full border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl p-3 outline-none transition-all"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                      <Field
                        name="address"
                        as={Input}
                        placeholder="Address"
                        inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                      />
                      <ErrorMessage name="address" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Biography</label>
                    <Field
                      as="textarea"
                      name="biography"
                      rows={4}
                      className="w-full border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl p-3 outline-none transition-all resize-none"
                      placeholder="Write something about yourself..."
                    />
                    <ErrorMessage name="biography" component="div" className="text-rose-500 text-sm mt-1" />
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdateUserInfoLoading || isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isUpdateUserInfoLoading || isSubmitting ? (
                        <>
                          <ImSpinner2 className="animate-spin w-5 h-5" />
                          Saving...
                        </>
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
