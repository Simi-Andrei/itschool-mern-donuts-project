import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { getProfile, updateProfile, reset } from "../features/user/userSlice";
import { getOrders } from "../features/order/orderSlice";

const Profilepage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, loading, success, error, message } = useSelector(
    (state) => state.user
  );

  const {
    orders,
    loading: loadingOrders,
    error: errorOrders,
    message: messageOrders,
  } = useSelector((state) => state.order);

  const ErrorToast = ({ text }) => (
    <div className="flex items-center justify-center">
      <img
        className="mr-2"
        src="/images/errorDoughnut.png"
        alt="donut"
        width={30}
      />
      <p>{message || text}</p>
    </div>
  );

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
    dispatch(reset());
    dispatch(getOrders());
    if (!currentUser) {
      navigate("/login");
    } else if (error) {
      toast(<ErrorToast />, {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (success) {
      toast(<SuccessToast text="Profile updated" />, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      if (!currentUser.name) {
        dispatch(getProfile("profile"));
      } else {
        setName(currentUser.name);
        setEmail(currentUser.email);
      }
    }
  }, [dispatch, currentUser, navigate, error, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast(<ErrorToast text="Passwords don't match" />, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      dispatch(updateProfile({ id: currentUser._id, name, email, password }));
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-4/12 p-2">
          <Title text="Profile" />
          <form
            onSubmit={submitHandler}
            autoComplete="off"
            className="w-3/4 mx-auto md:w-64"
          >
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
                <div className="form-group my-8 relative">
                  <input
                    className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    htmlFor="name"
                    className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                  >
                    Name
                  </label>
                </div>
                <div className="form-group my-8 relative">
                  <input
                    className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                  >
                    Email
                  </label>
                </div>
                <div className="form-group my-8 relative">
                  <input
                    className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                  >
                    Password
                  </label>
                </div>
                <div className="form-group my-8 relative">
                  <input
                    className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="text-sm lg:text-base">
                  <button
                    className="w-full bg-tertiary text-white py-2 px-4 hover:opacity-90 disabled:opacity-50 mt-4"
                    type="submit"
                    disabled={!name && !email && !password && !confirmPassword}
                  >
                    {loading
                      ? "Updating..."
                      : !name && !email && !password && !confirmPassword
                      ? "Nothing to update"
                      : "Update"}
                  </button>
                </div>
              </>
            )}
            <img src="/images/doughnutsOnPlate.png" alt="donuts on plate" />
          </form>
        </div>
        <div className="w-full lg:w-8/12 p-2">
          <Title text="My orders" />
          {loadingOrders ? (
            <div className="w-full text-center mt-20">
              <ClipLoader />
            </div>
          ) : errorOrders ? (
            <div className="w-full text-center mt-20">
              <p>{messageOrders}</p>
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
                                order.deliveredAt.substring(0, 10)
                              ) : (
                                <FaTimes className="text-red-400" />
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link
                                to={`/orders/${order._id}`}
                                className="hover:underline"
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
        </div>
      </div>
    </PageWrapper>
  );
};
export default Profilepage;
