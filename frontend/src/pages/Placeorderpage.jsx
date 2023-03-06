import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { placeOrder, reset } from "../features/order/orderSlice";

const Placeorderpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, deliveryAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const { order, loading, success, error, message } = useSelector(
    (state) => state.order
  );

  const { currentUser } = useSelector((state) => state.user);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryPrice = itemsPrice > 25 ? 0 : 25;
  const totalPrice = itemsPrice + deliveryPrice;

  const placeOrderHandler = () => {
    dispatch(
      placeOrder({
        items: cartItems,
        deliveryAddress,
        paymentMethod,
        itemsPrice: itemsPrice.toFixed(2),
        deliveryPrice,
        totalPrice: totalPrice.toFixed(2),
      })
    );
  };

  useEffect(() => {
    if (success && order._id) {
      dispatch(reset());
      navigate(`/orders/${order._id}`);
    } else if (!currentUser || !order.items) {
      navigate("/login");
    }
  }, [dispatch, navigate, success, order, currentUser]);

  return (
    <PageWrapper>
      <Title text="Order summary" />
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-3/6 text-sm lg:text-base">
          <div className="border-b border-b-secondary mb-4 pb-1">
            <span>
              <strong>Delivery address</strong>
            </span>
            <p>
              <span>{deliveryAddress.address}</span>,{" "}
              <span>{deliveryAddress.city}</span>,{" "}
              <span>{deliveryAddress.postalCode}</span>,{" "}
              <span>{deliveryAddress.country}</span>
            </p>
          </div>
          <div className="border-b border-b-secondary mb-4 pb-1">
            <span>
              <strong>Payment method</strong>
            </span>
            <p>{paymentMethod}</p>
          </div>
          <div>
            <span>
              <strong>Products: </strong>
            </span>
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 border-b border-b-secondary last:border-b-0"
                >
                  <div className="w-1/4 grid place-items-start">
                    <img src={item.image} alt="doughnut" width={50} />
                  </div>
                  <div className="w-1/4 grid place-items-start">
                    <Link
                      className="hover:underline"
                      to={`/products/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-1/4 flex items-center justify-center">
                    <p className="text-sm font-semibold">
                      {item.quantity} x {item.price} = $
                      {(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/6 text-sm lg:text-base">
          <Title text="Order total" />
          {cartItems.length > 0 && (
            <div className="flex flex-col p-2">
              <div className="flex items-center justify-between my-2">
                <p>Products price:</p>
                <p>${itemsPrice.toFixed(2)}</p>
              </div>
              <div className="flex flex-col  border-b border-b-secondary pb-2">
                <div className="flex items-center justify-between">
                  <p>Delivery price:</p>
                  <p>${deliveryPrice.toFixed(2)}</p>
                </div>
                <p className="italic text-xs tracking-wide">
                  (free delivery for orders above $50)*
                </p>
              </div>
              <div className="flex items-center justify-between font-bold mt-2">
                <p>Total price:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="text-center">
                {error && <p className="mt-6">{message}</p>}
                <button
                  className="bg-tertiary w-full text-white text-sm py-2 px-4 hover:opacity-90 disabled:opacity-50 mt-6"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0}
                >
                  {loading ? "Placing order..." : "Place order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
export default Placeorderpage;
