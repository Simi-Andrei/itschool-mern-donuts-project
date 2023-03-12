import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Rating, Loader, PageWrapper } from "../components/index";
import { BsHeartFill } from "react-icons/bs";
import { getSingleProduct } from "../features/product/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from "../features/favorites/favoritesSlice";

const Productpage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const { favoriteItems } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

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
    <PageWrapper>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="w-full mt-40 text-center">
          <p>{message}</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start justify-between static md:relative rounded-sm bg-white shadow-sm shadow-stone-200">
          <div className="w-full md:w-[49.5%] p-2 grid place-items-center relative md:static">
            <img
              src={product.image}
              alt="product"
              className="md:w-2/3 lg:w-full xl:w-2/3"
            />
            <button
              className="absolute top-2 -left-1 py-0.5 px-3 rounded-tr-md rounded-br-md rounded-tl-sm rounded-bl-sm bg-stone-900 text-white text-sm"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              onClick={() => toggleFavoriteItemHandler(product._id)}
              className="absolute top-0 right-0 rounded-md mt-2 mr-2 p-2 shadow-inner group"
            >
              <BsHeartFill
                fill="#a8a29e"
                className="group-hover:fill-secondary transition-all duration-150"
              />
            </button>
          </div>
          <div className="w-full md:w-[49.5%] p-2 text-sm h-full">
            <h2 className="font-semibold text-lg mb-8">{product.name}</h2>
            <p>
              <span className="font-semibold">Description: </span>
              {product.description}
            </p>
            <div className="w-full flex items-center my-4">
              <Rating value={product.rating} />{" "}
              <span className="ml-2 text-xs">{product.numReviews} reviews</span>
            </div>
            <p className="font-semibold text-lg mb-4">${product.price}</p>
            <p className="flex items-center text-gray-500 text-xs">
              <span
                className={`mr-1 w-2 h-2 rounded-full ${
                  product.stock === 0
                    ? "bg-rose-400 border border-rose-500"
                    : "bg-green-400 border border-green-500"
                }`}
              ></span>
              {product.stock === 0 ? "Out of stock" : "In stock"}
            </p>
            <button
              onClick={() => addItemToCartHandler(product._id)}
              className="w-full md:w-1/2 bg-stone-900 rounded-sm uppercase text-white text-xs font-light py-2 my-2 disabled:bg-stone-500"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of stock" : "Add to cart"}
            </button>
            <p className="text-gray-500 text-xs mt-2">
              Currently sold: {product.sold}
            </p>
            <p className="text-gray-500 text-xs">
              Category:{" "}
              {product.category === "inEarHeadphones"
                ? "In ear headphones"
                : product.category === "onEarHeadsets"
                ? "On ear headsets"
                : product.category === "speakers"
                ? "speakers"
                : "watches"}
            </p>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};
export default Productpage;
