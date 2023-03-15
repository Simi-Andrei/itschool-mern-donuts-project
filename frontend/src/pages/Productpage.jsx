import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Heading, Rating, Loader, Page, Wrapper } from "../components/index";
import { BsHeartFill, BsStarFill } from "react-icons/bs";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import { getSingleProduct } from "../features/product/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from "../features/favorites/favoritesSlice";
import { createReview, reset } from "../features/reviews/reviewSlice";

const Productpage = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const { favoriteItems } = useSelector((state) => state.favorites);

  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
    message: messageReview,
  } = useSelector((state) => state.review);

  const { currentUser } = useSelector((state) => state.user);

  TimeAgo.addLocale(en);

  useEffect(() => {
    if (successReview) {
      toast.success("Review added", {
        position: "top-center",
        autoClose: 2000,
      });
      setRating(0);
      setComment("");
    }
    dispatch(reset());
    dispatch(getSingleProduct(id));
  }, [dispatch, id, successReview]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    const review = {
      id,
      rating,
      comment,
    };
    dispatch(createReview(review));
  };

  const fiveStarReviews =
    product.reviews &&
    Number(
      product.reviews.filter((review) => Number(review.rating) === 5).length
    ) / Number(product.reviews.length);

  const fourStarReviews =
    product.reviews &&
    Number(
      product.reviews.filter((review) => Number(review.rating) === 4).length
    ) / Number(product.reviews.length);

  const threeStarReviews =
    product.reviews &&
    Number(
      product.reviews.filter((review) => Number(review.rating) === 3).length
    ) / Number(product.reviews.length);

  const twoStarReviews =
    product.reviews &&
    Number(
      product.reviews.filter((review) => Number(review.rating) === 2).length
    ) / Number(product.reviews.length);

  const oneStarReviews =
    product.reviews &&
    Number(
      product.reviews.filter((review) => Number(review.rating) === 1).length
    ) / Number(product.reviews.length);

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
                  ? "Speakers"
                  : product.category === "mouses"
                  ? "Mouses"
                  : product.category === "webcams"
                  ? "Webcams"
                  : "Watches"}
              </p>
            </div>
          </Wrapper>
          <Heading
            text="Reviews"
            className="mt-1"
            optionalText={`( ${
              product.reviews && product.reviews.length === 1
                ? `${product.reviews && product.reviews.length} review )`
                : `${product.reviews && product.reviews.length} reviews )`
            } `}
          />
          {product.reviews && product.reviews.length > 0 && (
            <Wrapper>
              <div className="flex flex-col md:flex-row items-center md:items-end justify-center py-2">
                <div className="w-full md:w-48 flex flex-col items-center justify-end mb-4 md:mb-0">
                  <p className="text-7xl scale-x-75 font-semibold text-secondary mb-2.5">
                    {product.rating.toFixed(1)}
                  </p>
                  <p className="text-lg tracking-tighter font-semibold text-secondary">
                    Overall Rating
                  </p>
                  <p className="tracking-wider">
                    From {product.reviews && product.reviews.length} review(s)
                  </p>
                </div>
                <div className="w-full md:w-48 relative">
                  <div className="flex flex-col">
                    <span className="h-2 w-full bg-stone-200 rounded-full"></span>
                    <span
                      style={{
                        width: `${Number(fiveStarReviews) * 100}%`,
                      }}
                      className={`h-2  bg-secondary absolute rounded-full`}
                    ></span>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      Excellent - {fiveStarReviews * 100}%
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="h-2 w-full bg-stone-200 rounded-full"></span>
                    <span
                      style={{
                        width: `${Number(fourStarReviews) * 100}%`,
                      }}
                      className={`h-2 bg-secondary absolute rounded-full`}
                    ></span>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      Good - {fourStarReviews * 100}%
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="h-2 w-full bg-stone-200 rounded-full"></span>
                    <span
                      style={{
                        width: `${Number(threeStarReviews) * 100}%`,
                      }}
                      className={`h-2 bg-secondary absolute rounded-full`}
                    ></span>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      Acceptable - {threeStarReviews * 100}%
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="h-2 w-full bg-stone-200 rounded-full"></span>
                    <span
                      style={{
                        width: `${Number(twoStarReviews) * 100}%`,
                      }}
                      className={`h-2 bg-secondary absolute rounded-full`}
                    ></span>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      Poor quality - {twoStarReviews * 100}%
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="h-2 w-full bg-stone-200 rounded-full"></span>
                    <span
                      style={{
                        width: `${Number(oneStarReviews) * 100}%`,
                      }}
                      className={`h-2 bg-secondary absolute rounded-full`}
                    ></span>
                    <p className="text-xs font-semibold tracking-widest mb-0.5">
                      Would not recommend - {oneStarReviews * 100}%
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
            </Wrapper>
          )}
          <Wrapper>
            {product.reviews && product.reviews.length === 0 && (
              <div className="p-2 mt-2">
                <p>No reviews yet</p>
              </div>
            )}
            <div>
              {product.reviews &&
                product.reviews.map((review) => (
                  <div
                    className="mb-1 p-2 rounded-sm flex flex-col md:flex-row justify-between border-b border-b-stone-200"
                    key={review._id}
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-start">
                        <Rating value={review.rating} />
                        <span className="ml-4 text-xs font-semibold">
                          {review.rating >= 4.5
                            ? "Excellent"
                            : review.rating >= 3.5
                            ? "Good"
                            : review.rating >= 2.5
                            ? "Acceptable"
                            : review.rating >= 1.5
                            ? "Poor quality"
                            : "Would not recommend"}
                        </span>
                      </div>
                      <p className="tracking-wide mb-3">”{review.comment}”</p>
                      <p className="italic text-xxs xl:text-xs text-stone-600">
                        Posted:{" "}
                        <ReactTimeAgo
                          date={Date.parse(review.date)}
                          locale="en-US"
                        />
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <p>
                        <span className="text-xs text-stone-600">
                          Review left by:
                        </span>{" "}
                        {review.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              {currentUser ? (
                <div className="p-2 rounded-sm mt-4">
                  <h3 className="font-semibold tracking-wider mb-2">
                    Leave a review
                  </h3>
                  {errorReview && (
                    <p className="my-2 text-rose-400 text-xs font-semibold">
                      {messageReview}
                    </p>
                  )}
                  <form onSubmit={submitHandler}>
                    <div className="w-full md:w-1/4 mb-2 flex">
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label key={i} className="block mr-1 mb-1 text-xs">
                            <input
                              type="radio"
                              name="rating"
                              className="hidden"
                              value={ratingValue}
                              onChange={() => setRating(ratingValue)}
                            />
                            <BsStarFill
                              size={20}
                              className="cursor-pointer"
                              color={
                                ratingValue <= (hover || rating)
                                  ? "#f0c330"
                                  : "#e7e5e4"
                              }
                              fill={
                                ratingValue <= (hover || rating)
                                  ? "#f0c330"
                                  : "#e7e5e4"
                              }
                              onMouseEnter={() => setHover(ratingValue)}
                              onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        );
                      })}
                    </div>
                    <div className="w-full mb-1">
                      <label
                        className="block w-full mb-1 text-xs xl:text-sm"
                        htmlFor="comment"
                      >
                        Share your opinion below
                      </label>
                      <textarea
                        style={{ resize: "none" }}
                        className="w-full focus:outline-black border border-stone-200 rounded-sm py-1 px-2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        name="comment"
                        id="comment"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="w-full md:w-1/6">
                      <button
                        className="w-full bg-stone-900 text-white py-2 px-4 hover:bg-stone-800 disabled:opacity-50"
                        type="submit"
                      >
                        {loadingReview ? "Leaving review..." : "Leave review"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-2">
                  <Link className="underline text-secondary" to="/login">
                    Login here
                  </Link>{" "}
                  to leave a review
                </div>
              )}
            </div>
          </Wrapper>
        </>
      )}
    </Page>
  );
};
export default Productpage;
