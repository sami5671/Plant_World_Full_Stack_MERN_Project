import { Link } from "react-router-dom";

const StatsCard = ({ title, value, link, linkName, icon, color }) => {
  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow border">
        <div className="text-xs font-medium text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-semibold mb-3">{value}</div>
        <div className="flex items-center justify-between">
          <Link to={link}>
            <button className="text-sm text-blue-600 underline">
              {linkName}
            </button>
          </Link>
          <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
