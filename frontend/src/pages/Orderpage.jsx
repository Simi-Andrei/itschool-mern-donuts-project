import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsArrowRight } from "react-icons/bs";
import { Title, Loader, PageWrapper } from "../components/index";
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
    toast.success("Order delivered", {
      position: "top-center",
      autoClose: 2000,
    });
    dispatch(deliverOrder(order._id));
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    });
  };

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(reset());
      toast.success("Order paid", {
        position: "top-center",
        autoClose: 2000,
      });
      dispatch(payOrder(order._id, details));
    });
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
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[64.2%]">
            <Title text={`Order no ${order._id}`} />
            <div className="bg-white shadow-sm shadow-stone-200 mt-1 text-xs xl:text-sm p-2">
              <p className="mb-1">
                <strong>Name: </strong>
                <span>{order.user && order.user.name}</span>
              </p>
              <p className="mb-1">
                <strong>Email: </strong>
                <span>
                  <a
                    className="hover:underline"
                    href={`mailTo:${order.user && order.user.email}`}
                  >
                    {order.user && order.user.email}
                  </a>
                </span>
              </p>
              <p className="mb-1">
                <strong>Delivery address: </strong>
                <span>{order.deliveryAddress.address}</span>,{" "}
                <span>{order.deliveryAddress.city}</span>,{" "}
                <span>{order.deliveryAddress.postalCode}</span>,{" "}
                <span>{order.deliveryAddress.country}</span>
              </p>
              <p>
                <strong>Payment method: </strong>
                {order.paymentMethod}
              </p>
            </div>
            <div className="bg-white shadow-sm shadow-stone-200 mt-1 text-xs xl:text-sm p-2">
              <span>
                <strong>Delivery status</strong>
              </span>
              {order.isDelivered ? (
                <p className="text-green-400">
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </p>
              ) : (
                <p className="text-rose-400">Not delivered</p>
              )}
            </div>
            <div className="bg-white shadow-sm shadow-stone-200 mt-1 text-xs xl:text-sm p-2">
              <span>
                <strong>Payment status</strong>
              </span>
              {order.isPaid ? (
                <p className="text-green-400">
                  Paid on {order.paidAt.substring(0, 10)}
                </p>
              ) : (
                <p className="text-rose-400">Not paid</p>
              )}
            </div>
            <div className="bg-white shadow-sm shadow-stone-200 mt-1 text-xs xl:text-sm p-2">
              <span>
                <strong>Products</strong>
              </span>
              <div>
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between mt-2 pb-2 border-b border-b-secondary last:border-b-0 text-xs xl:text-sm"
                  >
                    <div className="w-3/12 grid place-items-center">
                      <img src={item.image} alt="product" width={50} />
                    </div>
                    <div className="w-6/12 text-center">
                      <Link
                        className="hover:underline"
                        to={`/product/${item._id}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="w-3/12 text-center">
                      <p>
                        ${(item.quantity * item.price).toFixed(2)} (x
                        {item.quantity})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full mt-1 md:mt-0 md:w-[35.4%]">
            <Title text="Total" />
            <div className="bg-white shadow-sm shadow-stone-200 mt-1 text-xs xl:text-sm p-2">
              {order.items.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between my-2">
                    <p>Products price:</p>
                    <p className="font-semibold">
                      ${order.itemsPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col  border-b border-b-secondary pb-2">
                    <div className="flex items-center justify-between">
                      <p>Delivery price:</p>
                      <p className="font-semibold">
                        ${order.deliveryPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="italic text-xxs xl:text-xs">
                      (free delivery for orders above $50)*
                    </p>
                  </div>
                  <div className="flex items-center justify-between font-semibold mt-2">
                    <p>Total price:</p>
                    <p>${order.totalPrice.toFixed(2)}</p>
                  </div>
                  {!order.isPaid && (
                    <div className="text-center mt-4">
                      {loading && <Loader />}
                      {isPending && <Loader />}
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
                      <p className="text-xxs text-center text-stone-500">
                        ( at this moment we accept only PayPal payments but in
                        the future we hope to add more methods )
                      </p>
                    </div>
                  )}
                  {currentUser &&
                    currentUser.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <div className="text-center mt-4 text-xs xl:text-sm">
                        <button
                          type="button"
                          onClick={deliverHandler}
                          className="w-full bg-stone-900 text-white py-2 px-4 hover:bg-stone-800 disabled:opacity-50 mt-4"
                        >
                          {loading ? "Delivering..." : "Mark as delivered"}
                        </button>
                      </div>
                    )}
                  {order.isPaid && (
                    <div className="text-center mt-4">
                      <Link
                        to="/categories"
                        className="bg-secondary border border-secondary text-white font-light py-2 px-8 tracking-widest hover:text-secondary hover:bg-white transition-all duration-200 flex items-center justify-center relative group uppercase"
                      >
                        Back to shop
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
        </div>
      )}
    </PageWrapper>
  );
};
export default Orderpage;
