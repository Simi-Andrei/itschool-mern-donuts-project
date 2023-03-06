import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Slider from "../components/Slider";
import PageWrapper from "../components/PageWrapper";
import TopProductsSlider from "../components/TopProductsSlider";

const Homepage = () => {
  return (
    <PageWrapper>
      <div className="text-center mt-4">
        <p className="text-3xl md:text-5xl lg:text-7xl font-light drop-shadow-md drop-shadow-primary tracking-tighter">
          All you need is love
        </p>
        <p className="text-3xl md:text-5xl lg:text-7xl font-light drop-shadow-md drop-shadow-secondary tracking-tighter">
          ...and <span className="text-tertiary">donuts!</span>
        </p>
      </div>
      <div className="flex flex-wrap mt-10">
        <div className="w-full md:w-1/2 md:mt-4 lg:mt-8 xl:mt-14 flex flex-col items-center justify-start">
          <div className="bg-secondary p-1 rounded-full">
            <div className="bg-primary text-secondary rounded-full p-1 w-16 h-16 flex flex-col items-center justify-center font-bold">
              <p className="leading-none">
                d<span className="text-tertiary">o</span>nuts
              </p>
            </div>
          </div>
          <p className="text-3xl md:text-4xl lg:text-6xl font-light my-4 tracking-tighter drop-shadow-md drop-shadow-primary text-center">
            Visit our collection
          </p>
          <Link
            to="/products"
            className="bg-secondary border border-secondary text-white font-light my-4 py-2 px-8 tracking-widest hover:text-secondary hover:bg-white transition-all duration-200 flex items-center relative group"
          >
            EXPLORE
            <span className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 text-secondary">
              <BsArrowRight />
            </span>
          </Link>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img src="/images/heroDoughnutsImage.png" alt="donuts" />
        </div>
      </div>
      <div className="mt-32">
        <Slider />
        <TopProductsSlider />
      </div>
    </PageWrapper>
  );
};
export default Homepage;
