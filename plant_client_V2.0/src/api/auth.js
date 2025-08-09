import requestOnAxios from "./index";

export const getToken = async (email) => {
  console.log(email);
  const { data } = await requestOnAxios.post(`/auth/jwt`, { email });
  // console.log("Token received from server: ", data);
  return data;
};
