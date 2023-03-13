import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Heading, Rating, Loader, Page, Wrapper } from "../components/index";
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
    <Page>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="w-full mt-40 text-center">
          <p>{message}</p>
        </div>
      ) : (
        <>
          <Heading text={`${product.name}`} button address={-1} />
          <Wrapper className="flex flex-wrap flex-col md:flex-row items-start justify-between static md:relative">
            <div className="w-full md:w-[49.5%] p-2 py-10 grid place-items-center relative md:static">
              <img
                src={product.image}
                alt="product"
                className="w-[160px] md:w-[220px] xl:w-[260px] md:mt-6"
              />
              <button
                onClick={() => toggleFavoriteItemHandler(product._id)}
                className="absolute top-0 right-0 rounded-md mt-2 mr-2 p-2 shadow-inner"
              >
                <BsHeartFill fill="#a8a29e" />
              </button>
            </div>
            <div className="w-full md:w-[49.5%] p-2 md:py-10 h-full">
              <p className="md:mt-2">
                <span className="font-semibold">Description: </span>
                {product.description}
              </p>
              <div className="w-full flex items-center my-4">
                <Rating value={product.rating} />{" "}
                <span className="ml-2 mt-0.5">
                  {product.numReviews} reviews
                </span>
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
                className="w-full md:w-1/2 bg-stone-900 rounded-sm uppercase text-white text-xs py-2 my-2 hover:bg-stone-800 disabled:bg-stone-500"
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
                  ? "Headphones"
                  : product.category === "onEarHeadsets"
                  ? "Headsets"
                  : product.category === "speakers"
                  ? "speakers"
                  : "watches"}
              </p>
            </div>
          </Wrapper>
        </>
      )}
    </Page>
  );
};
export default Productpage;
