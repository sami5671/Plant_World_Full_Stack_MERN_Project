import axios from "axios";

export const imageUpload = async (image) => {
  console.log(image);
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
