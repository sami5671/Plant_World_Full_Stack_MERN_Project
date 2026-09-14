import { Link } from "react-router-dom";

const StatsCard = ({ title, value, link, linkName, icon, color, gradient, borderColor, iconBg }) => {
  return (
    <div className={`relative group p-6 rounded-2xl bg-white/80 backdrop-blur-xl border ${borderColor || 'border-slate-200'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}>
      {/* Background glowing gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-slate-50 to-slate-100'} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="text-xs font-bold text-slate-500 mb-2 tracking-wider">{title}</div>
        <div className={`text-3xl font-extrabold mb-4 ${color || 'text-slate-800'}`}>{value}</div>
        <div className="flex items-center justify-between mt-auto">
          <Link to={link}>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-200 flex items-center gap-1 group/btn font-medium">
              {linkName}
              <span className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </Link>
          <div className={`p-3 rounded-xl ${iconBg || 'bg-slate-100'} border ${borderColor || 'border-slate-200'} shadow-sm`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
