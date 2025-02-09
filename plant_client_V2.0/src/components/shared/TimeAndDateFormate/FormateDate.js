import moment from "moment";
export const formateDate = (createdAt) => {
  const formattedDate = moment(createdAt).format("DD MMM YYYY");
  return formattedDate;
};
