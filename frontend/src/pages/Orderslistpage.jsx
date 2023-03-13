import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Title, Loader, PageWrapper } from "../components/index";
import { FaCheck, FaTimes } from "react-icons/fa";
import { getAllOrders } from "../features/order/orderSlice";

const Orderslistpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error, message } = useSelector(
    (state) => state.order
  );

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      dispatch(getAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, currentUser, navigate]);

  return (
    <PageWrapper>
      <div className="relative">
        <Title text="Orders" className="pl-16" />
        <button
          className="absolute top-2 -left-1 py-0.5 px-3 rounded-tr-md rounded-br-md rounded-tl-sm rounded-bl-sm bg-stone-900 text-white text-sm"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="w-full mt-40 text-center">
          <p>{message}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col p-2 bg-white shadow-sm shadow-stone-200 mt-1">
            <div className="overflow-x-auto text-xs xl:text-sm">
              <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left font-light">
                    <thead className="border-b">
                      <tr>
                        <th scope="col" className="p-3">
                          User
                        </th>
                        <th scope="col" className="p-3">
                          Date
                        </th>
                        <th scope="col" className="p-3">
                          Total
                        </th>
                        <th scope="col" className="p-3">
                          Paid
                        </th>
                        <th scope="col" className="p-3">
                          Delivered
                        </th>
                        <th scope="col" className="p-3">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr className="border-b" key={order._id}>
                          <td className="whitespace-nowrap p-3">
                            {order.user && order.user.name}
                          </td>
                          <td className="whitespace-nowrap p-3">
                            {order.createdAt.substring(0, 10)}
                          </td>
                          <td className="whitespace-nowrap p-3">
                            ${order.totalPrice.toFixed(2)}
                          </td>
                          <td className="whitespace-nowrap p-3">
                            {order.isPaid ? (
                              <FaCheck className="text-green-400" />
                            ) : (
                              <FaTimes className="text-rose-400" />
                            )}
                          </td>
                          <td className="whitespace-nowrap p-3">
                            {order.isDelivered ? (
                              <FaCheck className="text-green-400" />
                            ) : (
                              <FaTimes className="text-rose-400" />
                            )}
                          </td>
                          <td className="whitespace-nowrap p-3 flex items-center justify-start">
                            <Link
                              className="hover:underline"
                              to={`/orders/${order._id}`}
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
};
export default Orderslistpage;
