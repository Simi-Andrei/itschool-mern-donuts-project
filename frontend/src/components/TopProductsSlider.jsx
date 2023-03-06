import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ClipLoader } from "react-spinners";
import Title from "./Title";
import { getTopProducts } from "../features/product/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";

const TopProductsSlider = () => {
  const dispatch = useDispatch();

  const { topProducts, error, message, loading } = useSelector(
    (state) => state.product
  );

  const ErrorToast = () => (
    <div className="flex items-center justify-center">
      <img
        className="mr-2"
        src="/images/errorDoughnut.png"
        alt="donut"
        width={30}
      />
      <p>{message}</p>
    </div>
  );

  useEffect(() => {
    if (error) {
      toast(<ErrorToast />, {
        position: "top-center",
        autoClose: 2000,
      });
    }
    dispatch(getTopProducts());
  }, [error, message, dispatch]);

  const addItemToCartHandler = (product) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="mt-20">
      <Title text="Find below our customers' most desired donut recipes (most sold)" />
      {loading ? (
        <div className="w-full text-center mt-40">
          <ClipLoader />
        </div>
      ) : (
        <Splide
          options={{
            type: "loop",
            pagination: false,
            perPage: 5,
            perMove: 1,
            lazyLoad: "nearby",
            breakpoints: {
              425: {
                arrows: false,
                perPage: 2,
              },
              768: {
                arrows: true,
                perPage: 3,
              },
            },
          }}
          aria-label="My Favorite Images"
        >
          {topProducts.map((product) => (
            <SplideSlide key={product._id}>
              <div className="h-72" key={product._id}>
                <div className="product w-full h-full">
                  <div className="h-52 grid place-items-center">
                    <Link to={`/products/${product._id}`}>
                      <img
                        src={product.image}
                        alt="doughnut"
                        className="w-[150px] h-[150px]"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col items-center justify-center px-2">
                    <Link to={`/products/${product._id}`} className="relative">
                      <p className="text-lg tracking-tighter">{product.name}</p>
                    </Link>
                    <div className="flex items-center justify-center">
                      <p className="text-lg tracking-tighter mx-1 cursor-default italic">
                        <span className="text-tertiary">$</span>
                        {product.price}
                      </p>
                      <button
                        onClick={() => addItemToCartHandler(product)}
                        className="bg-tertiary text-white text-sm font-light py-0.5 px-4 mx-1 hover:opacity-90"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
};
export default TopProductsSlider;
