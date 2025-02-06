import { GiFruitTree } from "react-icons/gi";

const Logo = ({ color }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <GiFruitTree className={`text-2xl ${color}`} />
      </div>
      <a className={`hidden lg:block ${color} font-bold text-2xl`}>
        Plant World
      </a>
    </div>
  );
};

export default Logo;
