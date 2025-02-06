import img1 from "../../../assets/images/tree4.gif";
import img2 from "../../../assets/images/tree5.gif";
import SectionTitle from "../../shared/sectionTitle/SectionTitle";

const WhoWeAre = () => {
  return (
    <>
      <div className="lg:mt-52">
        <SectionTitle heading="Who we are" subHeading="Know about Ourself" />
      </div>

      <section className="lg:mt-24">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:gap-32">
          <div className="lg:w-1/2 lg:px-24 px-8">
            <h1 className="text-4xl font-bold bg-gradient-to-br from-lime-400 to-amber-600 text-transparent bg-clip-text ">
              Who We are <br />& What We Do
            </h1>
            <p className="text-slate-500">
              Welcome to our plant world, where the Flourish Tree reigns,
              creating a serene ambiance. Our commitment to consistent and
              trustworthy support ensures your every need is met. Like the
              plants we offer, our maintenance is top-notch, guaranteeing their
              well-being. Enjoy a seamless shopping experience with our
              budget-friendly plant selections and free delivery service!
            </p>
            <button className="px-8 py-1 mt-3 font-Rancho text-xl text-white rounded-bl-full rounded-tr-full bg-gradient-to-br from-lime-400 to-amber-600 hover:bg-white hover:text-black hover:border-2 hover:border-black">
              Learn More
            </button>
          </div>
          <div>
            <img src={img2} className="lg:w-[300px] hidden lg:block" alt="" />
            <img src={img1} className="lg:w-[400px] block lg:hidden" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAre;
