import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsArrowRight } from "react-icons/bs";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { removeItemFromCart } from "../features/cart/cartSlice";

const Cartpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

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

  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
    toast(<SuccessToast message="Donut(s) removed from cart" />, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=${"/delivery"}`);
  };

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryPrice = itemsPrice > 25 ? 0 : 25;
  const totalPrice = itemsPrice + deliveryPrice;

  return (
    <PageWrapper>
      <div className="flex flex-wrap justify-between">
        {cartItems.length === 0 ? (
          <div className="h-64 w-full flex flex-col items-center justify-center">
            <div className="flex flex-col lg:flex-row items-center">
              <p className="mr-4 text-xl tracking-tighter text-center">
                You have no <span className="text-tertiary">donuts</span> in
                your cart right now
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
          <>
            <div className="w-full md:w-7/12">
              <Title text="Your donuts" />
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between mt-4 pb-4 border-b border-b-secondary last:border-b-0 text-sm lg:text-base"
                >
                  <div className="w-2/12 grid place-items-start">
                    <img src={item.image} alt="doughnut" width={50} />
                  </div>
                  <div className="w-3/12 grid place-items-start">
                    <Link
                      className="hover:underline"
                      to={`/products/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-4/12 flex items-center justify-center">
                    <p className="font-semibold">
                      {item.quantity} x {item.price} = $
                      {(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-3/12 grid place-items-end">
                    <button
                      className="bg-tertiary text-white py-1 px-4 hover:opacity-90 disabled:opacity-50"
                      onClick={() => removeItemFromCartHandler(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-4/12">
              <Title text="Your total" />
              {cartItems.length > 0 && (
                <div className="flex flex-col text-sm lg:text-base">
                  <div className="flex items-center justify-between my-2">
                    <p>Products price:</p>
                    <p>${itemsPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col border-b border-b-secondary pb-2">
                    <div className="flex items-center justify-between">
                      <p>Delivery price:</p>
                      <p>${deliveryPrice.toFixed(2)}</p>
                    </div>
                    <p className="italic text-xxs lg:text-xs tracking-wide">
                      (free delivery for orders above $50)*
                    </p>
                  </div>
                  <div className="flex items-center justify-between font-bold mt-2">
                    <p>Total price:</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <button
                      onClick={checkoutHandler}
                      className="w-full bg-tertiary text-white py-2 px-4 hover:opacity-90 disabled:opacity-50 mt-4"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="w-full mt-10 md:mt-20 grid place-items-center">
            <img
              src="/images/doughnutsWithCrumbs.png"
              alt="donuts"
              width={200}
              className=""
            />
          </div> */}
          </>
        )}
      </div>
    </PageWrapper>
  );
};
export default Cartpage;
