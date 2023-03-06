import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
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
      <Title text="Orders" />
      {loading ? (
        <div className="w-full text-center mt-32">
          <ClipLoader />
        </div>
      ) : error ? (
        <div className="w-full text-center mt-32">
          <p>{message}</p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        User
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Paid
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Delivered
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr className="border-b" key={order._id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order.user && order.user.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order.isPaid ? (
                            <FaCheck className="text-green-400" />
                          ) : (
                            <FaTimes className="text-red-400" />
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order.isDelivered ? (
                            <FaCheck className="text-green-400" />
                          ) : (
                            <FaTimes className="text-red-400" />
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex items-center justify-start">
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
      )}
    </PageWrapper>
  );
};
export default Orderslistpage;
