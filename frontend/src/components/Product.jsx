import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import { BsHeartFill } from "react-icons/bs";
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from "../features/favorites/favoritesSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

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

  const { favoriteItems } = useSelector((state) => state.favorites);

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
    <div className="w-1/2 md:w-1/3 lg:w-1/5 p-2">
      <div className="product w-full h-full shadow-sm shadow-gray-200 py-2">
        <div className="flex items-center justify-end">
          <button
            onClick={() => toggleFavoriteItemHandler(product._id)}
            className="rounded-full mt-2 mr-2 p-2 shadow-inner hover:brightness-90 focus:outline-none"
          >
            <BsHeartFill fill="#d4be8a" />
          </button>
        </div>
        <div className="h-52 grid place-items-center">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.image}
              alt="donut"
              className="w-[150px] h-[150px] "
            />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center px-2">
          <Link to={`/products/${product._id}`} className="relative">
            <p className="tracking-tighter font-light">{product.name}</p>
            <span className="bg-tertiary w-0 h-0.5 absolute bottom-0 left-0 transition-all duration-200"></span>
          </Link>
          <div className="flex items-center justify-center mt-2">
            <p className="tracking-tighter font-light mx-1 cursor-default">
              <span className="text-tertiary">$</span>
              {product.price}
            </p>
            <button
              onClick={() => addItemToCartHandler(product._id)}
              className="bg-tertiary text-white text-sm font-light py-0.5 px-4 mx-1 hover:opacity-90 disabled:opacity-50"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "No stock" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
