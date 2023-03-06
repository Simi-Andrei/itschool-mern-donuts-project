import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { BsHeartFill } from "react-icons/bs";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import BackButton from "../components/BackButton";
import { getSingleProduct } from "../features/product/productSlice";
import { getAllProducts } from "../features/product/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from "../features/favorites/favoritesSlice";

const Productpage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { product, products, loading, error, message } = useSelector(
    (state) => state.product
  );

  const { favoriteItems } = useSelector((state) => state.favorites);

  const SuccessToast = ({ message }) => (
    <div className="flex items-center justify-center">
      <img
        className="mr-2"
        src="/images/successDoughnut.png"
        alt="donut"
        width={30}
      />
      <p>{message}</p>
    </div>
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getAllProducts());
  }, [dispatch, id]);

  const addItemToCartHandler = (id) => {
    dispatch(addItemToCart(id));
    toast(<SuccessToast message="Donut added to cart" />, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const toggleFavoriteItemHandler = (id) => {
    const favoriteItemExists = favoriteItems.find((item) => item._id === id);
    if (favoriteItemExists) {
      dispatch(removeItemFromFavorites(id));
      toast(<SuccessToast message="Donut removed from favorites" />, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      dispatch(addItemToFavorites(id));
      toast(<SuccessToast message="Donut added to favorites" />, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <PageWrapper>
      <BackButton />
      {loading ? (
        <div className="w-full text-center mt-40">
          <ClipLoader />
        </div>
      ) : error ? (
        <div className="w-full text-center mt-40">
          <p>{message}</p>
        </div>
      ) : (
        <div className="mt-10 md:mt-20 md:flex md:flex-wrap justify-between">
          <div className="w-full md:w-1/2 grid place-items-center mb-6 md:mb-0">
            <img
              src={product.image}
              alt="donut"
              className="w-[300px] lg:w-[360px] xl:w-[400px]"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="flex items-center justify-end w-full md:w-1/2"></div>
            <Title text={`${product.name}`} />
            <p className="italic mt-4 text-center">”{product.description}”</p>
            <div className="flex items-center justify-center mt-4">
              <p className="text-2xl tracking-tighter mx-1 cursor-default">
                <span className="text-tertiary">$</span>
                {product.price}
              </p>
              <button
                onClick={() => addItemToCartHandler(product._id)}
                disabled={product.stock === 0}
                className="bg-tertiary text-white text-sm font-light py-0.5 px-4 mx-1 hover:opacity-90 disabled:opacity-50"
              >
                {product.stock === 0 ? "No stock" : "Add"}
              </button>
              <button
                onClick={() => toggleFavoriteItemHandler(product._id)}
                className="rounded-full p-2 shadow-inner mx-1 hover:brightness-90"
              >
                <BsHeartFill fill="#d4be8a" />
              </button>
            </div>
            <p className="text-xs mt-4 flex items-center">
              <span
                className={`${
                  product.stock === 0
                    ? "bg-red-500 border border-red-700"
                    : "bg-green-600 border border-green-700"
                } mr-1 w-2 h-2 rounded-full`}
              ></span>
              {product.stock === 0 ? "Out of stock" : "In stock"}
            </p>
            <p className="text-sm mt-4 flex items-center">
              Already sold:
              <span className="text-tertiary">{product.sold}</span>
            </p>
          </div>
        </div>
      )}
      <div className="mt-52">
        <Title text="Related donuts" />
        {loading ? (
          <div className="w-full text-center mt-40">
            <ClipLoader />
          </div>
        ) : error ? (
          <div className="w-full text-center mt-40">
            <p>{message}</p>
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
            {products.map((product) => (
              <SplideSlide key={product._id}>
                <div className="h-72" key={product._id}>
                  <div className="product w-full h-full">
                    <div className="h-52 grid place-items-center">
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.image}
                          alt="donut"
                          className="w-[150px] h-[150px]"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center px-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="relative"
                      >
                        <p className="text-lg tracking-tighter">
                          {product.name}
                        </p>
                      </Link>
                      <div className="flex items-center justify-center">
                        <p className="text-lg tracking-tightermx-1 cursor-default italic">
                          <span className="text-tertiary">$</span>
                          {product.price}
                        </p>
                        <button
                          onClick={() => addItemToCartHandler(product._id)}
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
    </PageWrapper>
  );
};
export default Productpage;
