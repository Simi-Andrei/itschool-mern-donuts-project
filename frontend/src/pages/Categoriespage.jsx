import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageWrapper, Title } from "../components/index";

const Categoriespage = () => {
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.product);

  return (
    <PageWrapper>
      <div className="relative">
        <Title text="Categories" className="pl-16" />
        <button
          className="absolute top-2 -left-1 py-0.5 px-3 rounded-tr-md rounded-br-md rounded-tl-sm rounded-bl-sm bg-stone-900 text-white text-sm"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="flex flex-wrap items-start justify-between mt-1">
        {categories.map((category) => {
          switch (category) {
            case "inEarHeadphones":
              return (
                <Link
                  className="w-full md:w-[49.85%] group mb-0.5"
                  key={category}
                  to="/search/category/inEarHeadphones"
                >
                  <div className="category-item group-hover:brightness-95 rounded-sm bg-white grid place-items-center h-44 border relative shadow-sm shadow-stone-200">
                    <p className="absolute bottom-1 left-2 uppercase text-white">
                      Headphones
                    </p>
                    <div className="bg-white rounded-full p-3">
                      <img
                        src="/images/productImages/inEar1.png"
                        alt="headphones"
                        className="w-[100px] md:w-[120px] xl:w-[130px]"
                      />
                    </div>
                  </div>
                </Link>
              );
            case "watches":
              return (
                <Link
                  className="w-full md:w-[49.85%] group mb-0.5"
                  key={category}
                  to="/search/category/watches"
                >
                  <div className="category-item group-hover:brightness-95 rounded-sm bg-white grid place-items-center h-44 border relative shadow-sm shadow-stone-200">
                    <p className="absolute bottom-1 left-2 uppercase text-white">
                      Watches
                    </p>
                    <div className="bg-white rounded-full p-3">
                      <img
                        src="/images/productImages/watch1.png"
                        alt="watch"
                        className="w-[100px] md:w-[120px] xl:w-[130px]"
                      />
                    </div>
                  </div>
                </Link>
              );
            case "onEarHeadsets":
              return (
                <Link
                  className="w-full md:w-[49.85%] group mb-0.5"
                  key={category}
                  to="/search/category/onEarHeadsets"
                >
                  <div className="category-item group-hover:brightness-95 rounded-sm bg-white grid place-items-center h-44 border relative shadow-sm shadow-stone-200">
                    <p className="absolute bottom-1 left-2 uppercase text-white">
                      Headsets
                    </p>
                    <div className="bg-white rounded-full p-3">
                      <img
                        src="/images/productImages/onEar1.png"
                        alt="headset"
                        className="w-[100px] md:w-[120px] xl:w-[130px]"
                      />
                    </div>
                  </div>
                </Link>
              );
            case "speakers":
              return (
                <Link
                  className="w-full md:w-[49.85%] group mb-0.5"
                  key={category}
                  to="/search/category/speakers"
                >
                  <div className="category-item group-hover:brightness-95 rounded-sm bg-white grid place-items-center h-44 border relative shadow-sm shadow-stone-200">
                    <p className="absolute bottom-1 left-2 uppercase text-white">
                      Speakers
                    </p>
                    <div className="bg-white rounded-full p-3">
                      <img
                        src="/images/productImages/speaker1.png"
                        alt="speaker"
                        className="w-[100px] md:w-[120px] xl:w-[130px]"
                      />
                    </div>
                  </div>
                </Link>
              );
            default:
              return (
                <li key={category}>
                  <p></p>
                </li>
              );
          }
        })}
      </div>
    </PageWrapper>
  );
};
export default Categoriespage;
