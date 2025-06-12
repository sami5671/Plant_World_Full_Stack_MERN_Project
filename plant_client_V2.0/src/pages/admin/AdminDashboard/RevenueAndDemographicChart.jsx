import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { useMemo, useState } from "react";
import { Select } from "rizzui";
import { yearBasedGraphChart } from "../../../features/adminControl/manageOrderSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const yearOptions = [
  { label: "2025", value: 2025 },
  { label: "2024", value: 2024 },
  { label: "2023", value: 2023 },
];
const RevenueAndDemographicChart = () => {
  const dispatch = useDispatch();
  const { filteredOrdersChart } = useSelector((state) => state?.manageOrders);
  const [value, setValue] = useState(null);
  const handleYearBasedGraph = (year) => {
    // console.log(year);
    setValue(year);
    dispatch(yearBasedGraphChart(year));
  };
  // Process chart data
  const chartData = useMemo(() => {
    const monthLabels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const ordersPerMonth = Array(12).fill(0);
    const earningsPerMonth = Array(12).fill(0);

    filteredOrdersChart?.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const monthIndex = orderDate.getMonth(); // 0 = January, 11 = December

      ordersPerMonth[monthIndex] += 1;
      earningsPerMonth[monthIndex] += Number(order.orderInfo.paidAmount) || 0;
    });

    return {
      labels: monthLabels,
      datasets: [
        {
          type: "line",
          label: "Total Orders",
          data: ordersPerMonth,
          backgroundColor: "rgba(79, 121, 66, 0.8)",
          borderColor: "rgba(80, 200, 150)",
          borderWidth: 1,
          stack: "Stack 0",
        },
        {
          type: "line",
          label: "Total Earnings",
          data: earningsPerMonth,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          tension: 0.4,
          yAxisID: "y1",
        },
      ],
    };
  }, [filteredOrdersChart]);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Orders and Earnings (Bar + Line)",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Total Orders",
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Total Earnings ($)",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="p-6 rounded-xl shadow">
      <div className="w-2/4 bg-white p-6 rounded-xl shadow-lg">
        <div>
          <Select
            label="Select Year"
            options={yearOptions}
            onChange={handleYearBasedGraph}
            value={value}
            dropdownClassName="bg-white"
            selectClassName="border-lime-500 bg-white w-[200px] opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-4"
          />
        </div>
        <Chart type="bar" data={chartData} options={options} />
      </div>
      <div></div>
    </div>
  );
};

export default RevenueAndDemographicChart;
