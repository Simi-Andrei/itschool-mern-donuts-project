import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Page, Wrapper } from "../components/index";
import { SlPaypal } from "react-icons/sl";
import {
  saveDeliveryAddress,
  savePaymentMethod,
} from "../features/cart/cartSlice";

const Checkoutpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const { deliveryAddress } = useSelector((state) => state.cart);

  const [address, setAdress] = useState(deliveryAddress.address || "");
  const [city, setCity] = useState(deliveryAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    deliveryAddress.postalCode || ""
  );
  const [country, setCountry] = useState(deliveryAddress.country || "");
  const [paymentMethod, setPaymentMethod] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <Page>
      <Heading text="Checkout" />
      <div className="w-full mt-1 mx-auto">
        <Wrapper>
          <form onSubmit={submitHandler}>
            <h3 className="text-base text-center my-10 cursor-default">
              Delivery and payment
            </h3>
            <div className="form-group my-8 relative w-full md:w-1/2 mx-auto">
              <input
                className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                type="text"
                id="address"
                name="address"
                placeholder=" "
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                required
              />
              <label
                htmlFor="address"
                className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
              >
                Address
              </label>
            </div>
            <div className="form-group my-8 relative w-full md:w-1/2 mx-auto">
              <input
                className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                type="text"
                id="city"
                name="city"
                placeholder=" "
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <label
                htmlFor="city"
                className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
              >
                City
              </label>
            </div>
            <div className="form-group my-8 relative w-full md:w-1/2 mx-auto">
              <input
                className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder=" "
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <label
                htmlFor="postalCode"
                className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
              >
                Postal code
              </label>
            </div>
            <div className="form-group my-8 relative w-full md:w-1/2 mx-auto">
              <input
                className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                type="text"
                id="country"
                name="country"
                placeholder=" "
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <label
                htmlFor="country"
                className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
              >
                Country
              </label>
            </div>
            <div className="my-8 w-full md:w-1/2 mx-auto flex items-center justify-center">
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
                className="tracking-wider cursor-pointer flex items-center"
              >
                <SlPaypal className="mr-2" /> PayPal
              </label>
            </div>
            <p className="w-full my-8 md:w-1/2 mx-auto text-xxs text-center text-stone-500 mt-4">
              ( at this moment we accept only PayPal payments but in the future
              we hope to add more methods )
            </p>
            <div className="md:w-1/2 mx-auto">
              <button
                className="w-full bg-secondary text-white shadow-sm shadow-stone-200 tracking-tighter py-2 px-4 hover:brightness-95 disabled:opacity-50 rounded-sm"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </Wrapper>
      </div>
    </Page>
  );
};
export default Checkoutpage;
