import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { BsArrowRight } from "react-icons/bs";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  getOrder,
  payOrder,
  deliverOrder,
  reset,
} from "../features/order/orderSlice";

const Orderpage = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading, success, error, message } = useSelector(
    (state) => state.order
  );

  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const SuccessToast = ({ text }) => (
    <div className="flex items-center justify-center">
      <img
        className="mr-2"
        src="/images/successDoughnut.png"
        alt="donut"
        width={30}
      />
      <p>{text}</p>
    </div>
  );

  useEffect(() => {
    if (success) {
      dispatch(reset());
    } else if (!currentUser) {
      navigate("/login");
    } else if (!order || order._id !== id || success) {
      dispatch(getOrder(id));
    }
  }, [dispatch, order, id, navigate, currentUser, success]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
    toast(<SuccessToast text="Order delivered" />, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    });
  };

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(payOrder(order._id, details));
    });
  };

  return (
    <PageWrapper>
      {loading ? (
        <div className="w-full text-center mt-40">
          <ClipLoader />
        </div>
      ) : error ? (
        <div className="w-full text-center mt-40">
          <p>{message}</p>
        </div>
      ) : (
        <>
          <Title text={` Order no ${order._id}`} />
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-3/6 text-sm lg:text-base">
              <div className="border-b border-b-secondary mb-4 pb-1">
                <span>
                  <strong>Name</strong>
                </span>
                <p>
                  <span>{order.user && order.user.name}</span>
                </p>
                <span>
                  <strong>Email</strong>
                </span>
                <p>
                  <span>
                    <a
                      className="hover:underline"
                      href={`mailTo:${order.user && order.user.email}`}
                    >
                      {order.user && order.user.email}
                    </a>
                  </span>
                </p>
                <span>
                  <strong>Delivery address</strong>
                </span>
                <p>
                  <span>{order.deliveryAddress.address}</span>,{" "}
                  <span>{order.deliveryAddress.city}</span>,{" "}
                  <span>{order.deliveryAddress.postalCode}</span>,{" "}
                  <span>{order.deliveryAddress.country}</span>
                </p>
                <span>
                  <strong>Delivery status</strong>
                </span>
                {order.isDelivered ? (
                  <p className="text-green-400">
                    Delivered on {order.deliveredAt.substring(0, 10)}
                  </p>
                ) : (
                  <p className="text-red-400">Not delivered</p>
                )}
              </div>
              <div className="border-b border-b-secondary mb-4 pb-1">
                <span>
                  <strong>Payment method</strong>
                </span>
                <p>{order.paymentMethod}</p>
                <span>
                  <strong>Payment status</strong>
                </span>
                {order.isPaid ? (
                  <p className="text-green-400">
                    Paid on {order.paidAt.substring(0, 10)}
                  </p>
                ) : (
                  <p className="text-red-400">Not paid</p>
                )}
              </div>
              <div>
                <span>
                  <strong>Products: </strong>
                </span>
                <div>
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between p-2 border-b border-b-secondary last:border-b-0"
                    >
                      <div className="w-1/4 grid place-items-start">
                        <img src={item.image} alt="doughnut" width={50} />
                      </div>
                      <div className="w-1/4 grid place-items-start">
                        <p className="text-sm cursor-default">{item.name}</p>
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
              {order.items.length > 0 && (
                <div className="flex flex-col p-2">
                  <div className="flex items-center justify-between my-2">
                    <p>Products price:</p>
                    <p>${order.itemsPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col  border-b border-b-secondary pb-2">
                    <div className="flex items-center justify-between">
                      <p>Delivery price:</p>
                      <p>${order.deliveryPrice.toFixed(2)}</p>
                    </div>
                    <p className="italic text-xs tracking-wide">
                      (free delivery for orders above $50)*
                    </p>
                  </div>
                  <div className="flex items-center justify-between font-bold mt-2">
                    <p>Total price:</p>
                    <p>${order.totalPrice.toFixed(2)}</p>
                  </div>
                  {!order.isPaid && (
                    <div className="text-center mt-4">
                      {loading && (
                        <div className="w-full text-center mt-40">
                          <ClipLoader />
                        </div>
                      )}
                      {isPending && (
                        <div className="w-full text-center mt-40">
                          <ClipLoader />
                        </div>
                      )}
                      {isRejected && (
                        <div className="w-full text-center mt-40">
                          <p>Something went wrong</p>
                        </div>
                      )}
                      {isResolved && (
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={successPaymentHandler}
                        />
                      )}
                      <p className="text-xxs text-center text-gray-400">
                        ( at this moment we accept only PayPal payments but in
                        the future we hope to add more methods )
                      </p>
                    </div>
                  )}
                  {currentUser &&
                    currentUser.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <div className="text-center mt-4 text-sm lg:text-base">
                        <button
                          type="button"
                          onClick={deliverHandler}
                          className="bg-tertiary w-full text-white text-sm py-2 px-4 hover:opacity-90 disabled:opacity-50 mt-6"
                        >
                          {loading ? "Delivering..." : "Mark as delivered"}
                        </button>
                      </div>
                    )}
                  {order.isPaid && (
                    <div className="text-center mt-4">
                      <Link
                        to="/products"
                        className="bg-secondary border border-secondary text-white font-light py-2 px-8 tracking-widest hover:text-secondary hover:bg-white transition-all duration-200 flex items-center justify-center relative group"
                      >
                        BACK TO DONUTS
                        <span className="absolute top-1/2 -translate-y-1/2 right-14 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 text-secondary">
                          <BsArrowRight />
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
};
export default Orderpage;
