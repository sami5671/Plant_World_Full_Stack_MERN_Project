import { FaSearch } from "react-icons/fa";
import { Empty } from "rizzui/empty";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Empty
        image={<FaSearch className="text-[300px] text-lime-500" />}
        text="No Result Found"
        className="text-lime-500 font-semibold text-4xl"
      />
    </div>
  );
};

export default ErrorPage;
