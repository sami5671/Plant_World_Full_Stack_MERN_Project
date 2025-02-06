import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 text-base-content mt-12 lg:mt-44 bg-[#f4f3f1] ">
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Social</header>
          <div className="grid grid-flow-col gap-4 text-2xl">
            <a href="">
              <FaFacebook></FaFacebook>
            </a>
            <a href="">
              <FaTwitter></FaTwitter>
            </a>
            <a href="">
              <FaYoutube></FaYoutube>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
