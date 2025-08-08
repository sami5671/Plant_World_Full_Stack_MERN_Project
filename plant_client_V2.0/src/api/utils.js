import axios from "axios";
import moment from "moment";

import { Cloudinary } from "@cloudinary/url-gen";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data;
};

export const uploadCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dreamCar");

  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dgz0be5p3/image/upload",
    formData
  );
  return { publicId: data?.public_id, url: data?.secure_url };
  // return data;
};

// Create and configure your Cloudinary instance for image background removal
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
  },
});

//---------- payment method (create payment intent for stripe payment)-----------------
export const createPaymentIntent = async (price) => {
  console.log(price);
  const { data } = await axios.post("/user/create-payment-intent", price);
  return data;
};

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "🌄Good Morning ";
  } else if (currentHour < 18) {
    return "🌇Good Afternoon ";
  } else {
    return "🌃Good Evening ";
  }
};

export const dateFormate = (isoDate) => {
  const formateDate = moment(isoDate).format("MMMM Do YYYY, h:mm:ss a");
  return formateDate;
};

// datepicker date format
export const formattedDOB = (rawDate) => {
  if (!rawDate || !(rawDate instanceof Date)) return null;

  return {
    year: rawDate.getUTCFullYear(),
    month: rawDate.getUTCMonth() + 1,
    day: rawDate.getUTCDate() + 1,
  };
};
