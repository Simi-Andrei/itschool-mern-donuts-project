import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { saveDeliveryAddress } from "../features/cart/cartSlice";

const Deliverypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const { deliveryAddress } = useSelector((state) => state.cart);

  const [address, setAdress] = useState(deliveryAddress.address || "");
  const [city, setCity] = useState(deliveryAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    deliveryAddress.postalCode || ""
  );
  const [country, setCountry] = useState(deliveryAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center">
        <Title text="Delivery" />
        <form onSubmit={submitHandler} className="w-64 text-sm lg:text-base">
          <div className="form-group my-8 relative">
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
          <div className="form-group my-8 relative">
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
          <div className="form-group my-8 relative">
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
          <div className="form-group my-8 relative">
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
          <div className="text-sm lg:text-base">
            <button
              className="w-full bg-tertiary text-white py-2 px-4 hover:opacity-90 disabled:opacity-50 mt-4"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};
export default Deliverypage;
