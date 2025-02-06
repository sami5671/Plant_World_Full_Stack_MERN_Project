import { Loader } from "rizzui";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader variant="threeDot" className="text-4xl" />
    </div>
  );
};

export default Loading;
