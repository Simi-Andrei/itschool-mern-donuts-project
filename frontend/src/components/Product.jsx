import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import { BsHeartFill } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { Rating, Wrapper } from "./index";
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from "../features/favorites/favoritesSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const { favoriteItems } = useSelector((state) => state.favorites);

  const addItemToCartHandler = (id) => {
    dispatch(addItemToCart(id));
    toast.success("Product added to cart", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const toggleFavoriteItemHandler = (id) => {
    const favoriteItemExists = favoriteItems.find((item) => item._id === id);
    if (favoriteItemExists) {
      dispatch(removeItemFromFavorites(id));
      toast.success("Product removed from favorites", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      dispatch(addItemToFavorites(id));
      toast.success("Product added to favorites", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full md:w-[32.6%] xl:w-[24.5%]">
      <Wrapper className="pt-6 relative">
        <div className="flex items-start justify-between md:block">
          <Link to={`/product/${product._id}`}>
            <div className="grid place-items-center">
              <img
                src={product.image}
                alt="product"
                className="w-[90px] md:w-[90px] lg:w-[140px]"
              />
            </div>
          </Link>
          <div className="text-right md:text-left mt-2 md:mt-0">
            <Link
              to={`/product/${product._id}`}
              className="relative hover:underline"
            >
              <p className="tracking-tighter text-sm mt-4">{product.name}</p>
            </Link>
            <p className="tracking-tighter cursor-default my-1 text-lg">
              ${product.price}
            </p>
            <div className="w-full flex items-center">
              <Rating value={product.rating} />{" "}
              <span className="ml-2 text-xs">{product.numReviews} reviews</span>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={() => addItemToCartHandler(product._id)}
                className="w-full bg-stone-900 rounded-sm uppercase text-white text-xs py-2 px-4 hover:bg-stone-800 disabled:bg-stone-500 flex items-center justify-center"
                disabled={product.stock === 0}
              >
                <RiShoppingCartLine className="text-[0.9rem] mr-1" />
                <span className="ml-1">
                  {product.stock === 0 ? "Out of stock" : "Add to cart"}
                </span>
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => toggleFavoriteItemHandler(product._id)}
          className="absolute top-0 right-0 rounded-md mt-2 mr-2 p-2 shadow-inner bg-white"
        >
          <BsHeartFill fill="#a8a29e" />
        </button>
      </Wrapper>
    </div>
  );
};
export default Product;
