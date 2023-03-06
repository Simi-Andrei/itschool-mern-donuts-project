import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SlPaypal } from "react-icons/sl";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { savePaymentMethod } from "../features/cart/cartSlice";

const Paymentpage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deliveryAddress } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (!deliveryAddress) {
      navigate("/delivery");
    }
  }, [navigate, user, deliveryAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center">
        <Title text="Payment" />
        <form onSubmit={submitHandler} className="w-64 text-sm lg:text-base">
          <div className="my-4 flex items-center justify-center">
            <input
              className="focus:outline-none mr-4 cursor-pointer accent-secondary"
              type="checkbox"
              id="paymentMethod"
              name="paymentMethod"
              placeholder=" "
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            <label
              htmlFor="paymentMethod"
              className="tracking-wider cursor-pointer"
            >
              <p className="flex items-center">
                <SlPaypal className="mr-2" /> PayPal
              </p>
            </label>
          </div>
          <div className="text-sm lg:text-base">
            <button
              className="w-full bg-tertiary text-white py-2 px-4 hover:opacity-90 disabled:opacity-50 mt-4"
              type="submit"
            >
              Continue
            </button>
          </div>
          <p className="text-xxs text-center text-gray-400 mt-4">
            ( at this moment we accept only PayPal payments but in the future we
            hope to add more methods )
          </p>
        </form>
      </div>
    </PageWrapper>
  );
};
export default Paymentpage;
