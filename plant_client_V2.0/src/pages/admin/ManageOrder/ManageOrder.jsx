import React from "react";
import { useGetAllOrdersQuery } from "../../../features/adminControl/manageOrderApi";

const ManageOrder = () => {
  const { data: orders } = useGetAllOrdersQuery();
  console.log(orders.data.length);
  return <div></div>;
};

export default ManageOrder;
