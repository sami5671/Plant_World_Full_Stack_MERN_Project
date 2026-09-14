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
  ArcElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useMemo, useState, useEffect } from "react";
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
  Title,
  ArcElement
);

const RevenueAndDemographicChart = () => {
  const dispatch = useDispatch();
  const { filteredOrdersChart, ordersChart } = useSelector((state) => state?.manageOrders);
  const { male, female } = useSelector((state) => state?.manageUsers);
  const [value, setValue] = useState(null);
  
  const yearOptions = useMemo(() => {
    if (!ordersChart || ordersChart.length === 0) {
      const currentYear = new Date().getFullYear();
      return [{ label: currentYear.toString(), value: currentYear }];
    }
    
    const years = new Set(ordersChart.map(order => new Date(order.createdAt).getFullYear()));
    return Array.from(years)
      .sort((a, b) => b - a)
      .map(year => ({ label: year.toString(), value: year }));
  }, [ordersChart]);

  useEffect(() => {
    if (yearOptions.length > 0 && !value) {
      setValue(yearOptions[0]);
    }
  }, [yearOptions, value]);

  const handleYearBasedGraph = (yearOption) => {
    setValue(yearOption);
    dispatch(yearBasedGraphChart(yearOption));
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
          type: "bar",
          label: "Total Orders",
          data: ordersPerMonth,
          backgroundColor: "rgba(163, 230, 53, 0.8)", // lime-400
          borderColor: "rgba(163, 230, 53, 1)",
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          type: "line",
          label: "Total Earnings",
          data: earningsPerMonth,
          borderColor: "rgba(52, 211, 153, 1)", // emerald-400
          backgroundColor: "rgba(52, 211, 153, 0.2)",
          fill: true,
          tension: 0.4,
          yAxisID: "y1",
          pointBackgroundColor: "rgba(52, 211, 153, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(52, 211, 153, 1)",
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
        labels: { color: "#334155", font: { family: "Outfit" } },
      },
      title: {
        display: true,
        text: "Monthly Orders and Earnings",
        color: "#0f172a",
        font: { family: "Outfit", size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#0f172a",
        bodyColor: "#334155",
        borderColor: "rgba(203, 213, 225, 0.5)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: { color: "rgba(203, 213, 225, 0.4)", drawBorder: false },
        ticks: { color: "#64748b", font: { family: "Outfit" } },
        title: {
          display: true,
          text: "Total Orders",
          color: "#475569",
          font: { family: "Outfit", weight: "500" }
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: { color: "#64748b", font: { family: "Outfit" } },
        title: {
          display: true,
          text: "Total Earnings ($)",
          color: "#475569",
          font: { family: "Outfit", weight: "500" }
        },
      },
      x: {
        grid: { color: "rgba(203, 213, 225, 0.4)", drawBorder: false },
        ticks: { color: "#64748b", font: { family: "Outfit" } },
      }
    },
  };

  // Pie chart data for user demographics
  const data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "User Demographics",
        data: [female, male],
        backgroundColor: [
          "rgba(52, 211, 153, 0.8)",  // emerald-400
          "rgba(163, 230, 53, 0.8)",  // lime-400
        ],
        borderColor: [
          "rgba(52, 211, 153, 1)",
          "rgba(163, 230, 53, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#334155", font: { family: "Outfit" }, padding: 20 },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#0f172a",
        bodyColor: "#334155",
        borderColor: "rgba(203, 213, 225, 0.5)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    cutout: "60%",
  };

  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <div className="lg:w-2/3 bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-6 flex justify-end">
          <Select
            label="Select Year"
            options={yearOptions}
            onChange={handleYearBasedGraph}
            value={value}
            dropdownClassName="bg-white border-slate-200 text-slate-800"
            selectClassName="border-slate-200 bg-white/80 text-slate-800 w-[200px] focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl"
            labelClassName="text-slate-600"
          />
        </div>
        <div className="w-full">
          <Chart type="bar" data={chartData} options={options} />
        </div>
      </div>
      <div className="lg:w-1/3 lg:h-[480px] bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-5 items-center justify-center">
        <div className="mb-4">
          <h1 className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold text-xl drop-shadow-sm">
            Demographic Dividend
          </h1>
        </div>
        <div className="w-full flex-1 flex items-center justify-center relative">
          <Pie data={data} options={pieOptions} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-3xl font-extrabold text-slate-200 opacity-50">USERS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAndDemographicChart;
