import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useGetUserOrderQuery } from "../../../features/users/orderApi";
import { useMemo } from "react";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ShoppingActivityGraph = () => {
  const user = useSelector((state) => state?.auth?.user?.data);
  const userId = user?._id;

  const { data: order, isSuccess: isOrderSuccess } = useGetUserOrderQuery(
    { userId },
    { skip: !userId }
  );

  // Format like "June 2025"
  const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  };

  const { labels, quantityData, priceData } = useMemo(() => {
    const quantityMap = {};
    const priceMap = {};

    if (isOrderSuccess && Array.isArray(order?.data)) {
      order.data.forEach((ord) => {
        const label = formatMonthYear(ord.createdAt);

        ord.plantIdWithQuantity?.forEach((item) => {
          const quantity = item?.quantity || 0;
          quantityMap[label] = (quantityMap[label] || 0) + quantity;
        });
        const price = ord?.orderInfo?.totalPriceAfterDiscount;
        priceMap[label] = (priceMap[label] || 0) + price;
      });
    }

    const sortedLabels = Object.keys(quantityMap).sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA - dateB;
    });

    const quantityData = sortedLabels.map((label) => quantityMap[label]);
    const priceData = sortedLabels.map((label) =>
      Number(priceMap[label].toFixed(2))
    );

    return { labels: sortedLabels, quantityData, priceData };
  }, [order, isOrderSuccess]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Shopping Activity by Month & Year",
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Plant Quantity",
        data: quantityData,
        backgroundColor: "rgba(185, 53, 122, 1)",
      },
      {
        label: "Total Price",
        data: priceData,
        backgroundColor: "rgba(145, 180, 150)",
      },
    ],
  };

  return (
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
};

export default ShoppingActivityGraph;
