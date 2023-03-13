import { Link } from "react-router-dom";
import { Page } from "../components/index";

const Notfoundpage = () => {
  return (
    <Page>
      <div className="w-full h-[500px] flex flex-col items-center justify-center p-2 lg:p-4">
        <div className="relative mt-36">
          <p className="mt-2 font-semibold text-secondary text-7xl">404</p>
          <img
            className="absolute -top-36 xl:-top-48 left-[50%] -translate-x-[50%] w-[100px] xl:w-[140px]"
            src="/images/notFoundImage.png"
            alt="robot"
          />
        </div>
        <p className="text-center text-sm font-bold">
          Oups! The page you are trying to access does not exist...
        </p>
        <Link
          className="bg-stone-900 rounded-sm uppercase text-white text-xs font-light py-2 px-4 hover:brightness-95 disabled:bg-stone-500 mt-6"
          to="/"
        >
          Take me home
        </Link>
      </div>
    </Page>
  );
};
export default Notfoundpage;
