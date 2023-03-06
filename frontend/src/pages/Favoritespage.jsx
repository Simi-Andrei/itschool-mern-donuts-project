import { Link } from "react-router-dom";
import Title from "../components/Title";
import { BsArrowRight, BsHeartFill } from "react-icons/bs";
import PageWrapper from "../components/PageWrapper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import { removeItemFromFavorites } from "../features/favorites/favoritesSlice";

const Favoritespage = () => {
  const dispatch = useDispatch();

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

  const addItemToCartHandler = (id) => {
    dispatch(addItemToCart(id));
    toast(<SuccessToast message="Donut added to cart" />, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const removeItemFromFavoritesHandler = (id) => {
    dispatch(removeItemFromFavorites(id));
    toast(<SuccessToast message="Donut removed from cart" />, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <PageWrapper>
      <Title text="Favorite donuts" />
      {favoriteItems.length === 0 ? (
        <div className="h-64 w-full flex flex-col items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center">
            <p className="mr-4 text-xl tracking-tighter text-center">
              You have no favorite <span className="text-tertiary">donuts</span>{" "}
              right now
            </p>
            <img
              src="/images/errorDoughnut.png"
              width={50}
              alt="donut"
              className="my-2"
            />
          </div>
          <Link
            to="/products"
            className="bg-secondary border border-secondary text-white font-light my-4 py-2 px-8 tracking-widest hover:text-secondary hover:bg-white transition-all duration-200 flex items-center relative group"
          >
            GET SOME DONUTS
            <span className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 text-secondary">
              <BsArrowRight />
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start">
          {favoriteItems.map((item) => (
            <div className="w-1/2 md:w-1/4 lg:w-1/6 p-2" key={item._id}>
              <div className="product w-full h-full shadow-sm shadow-gray-200 py-2">
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => removeItemFromFavoritesHandler(item._id)}
                    className="rounded-full mt-2 mr-2 p-2 shadow-inner hover:brightness-90"
                  >
                    <BsHeartFill fill="#d4be8a" />
                  </button>
                </div>
                <div className="h-52 grid place-items-center">
                  <Link to={`/products/${item._id}`}>
                    <img
                      src={item.image}
                      alt="donut"
                      className="w-[150px] h-[150px] "
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-center justify-center px-2">
                  <Link to={`/products/${item._id}`} className="relative">
                    <p className="text-lg tracking-tighter">{item.name}</p>
                    <span className="bg-tertiary w-0 h-0.5 absolute bottom-0 left-0 transition-all duration-200"></span>
                  </Link>
                  <div className="flex items-center justify-center">
                    <p className="text-lg tracking-tighter mx-1 cursor-default italic">
                      <span className="text-tertiary">$</span>
                      {item.price}
                    </p>
                    <button
                      onClick={() => addItemToCartHandler(item._id)}
                      className="bg-tertiary text-white text-sm font-light py-0.5 px-4 mx-1 hover:opacity-90 disabled:opacity-50"
                      disabled={item.stock === 0}
                    >
                      {item.stock === 0 ? "No stock" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
};
export default Favoritespage;
