import { GiVikingChurch } from "react-icons/gi";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md: w-4/12 my-8 font-arapey font-bold">
      <GiVikingChurch className="mx-auto text-3xl text-lime-800" />
      <p className="text-lime-600 mb-2"> ----- {subHeading} ----- </p>
      <p className="text-3xl text-lime-500 uppercase border-y-2 border-lime-500 py-2">
        {heading}
      </p>
    </div>
  );
};

export default SectionTitle;
