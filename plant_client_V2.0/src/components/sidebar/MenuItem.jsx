import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-xl border ${
          isActive 
            ? "bg-white/20 text-white border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.1)]" 
            : "border-transparent text-emerald-100/80 hover:bg-white/10 hover:text-white hover:border-white/10"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-200/80'}`} />
          <span className="mx-4 font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;
