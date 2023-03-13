import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsArrowRight, BsTrash } from "react-icons/bs";
import { Heading, Page, Wrapper } from "../components/index";
import { removeItemFromCart, clearCart } from "../features/cart/cartSlice";

const Cartpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success("Product removed from cart", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=${"/checkout"}`);
  };

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryPrice = itemsPrice > 25 ? 0 : 25;
  const totalPrice = itemsPrice + deliveryPrice;

  const clearCartHandler = () => {
    dispatch(clearCart());
    toast.success("Products removed from cart", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <Page>
      <div className="flex flex-wrap justify-between items-start">
        {cartItems.length === 0 ? (
          <div className="bg-white h-64 w-full flex flex-col items-center justify-center shadow-sm shadow-stone-200">
            <div className="flex flex-col lg:flex-row items-center">
              <p className="mr-4 tracking-tighter text-center">
                You have no products in your cart right now
              </p>
            </div>
            <Link
              to="/categories"
              className="bg-secondary uppercase border border-secondary text-white font-light my-4 py-2 px-8 tracking-widest hover:text-secondary hover:bg-white transition-all duration-200 flex items-center relative group rounded-sm text-sm"
            >
              Back to shop
              <span className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 text-secondary">
                <BsArrowRight />
              </span>
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full md:w-[64.2%]">
              <Heading text="Cart" button address={-1} />
              {cartItems.map((item) => (
                <Wrapper
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="w-[20%] md:w-[25%] grid place-items-center">
                    <img src={item.image} alt="product" width={50} />
                  </div>
                  <div className="w-[40%] md:w-[30%] text-center">
                    <Link
                      className="hover:underline"
                      to={`/product/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-[30%] md:w-[25%] text-center justify-center">
                    <p>
                      ${(item.quantity * item.price).toFixed(2)} (x
                      {item.quantity})
                    </p>
                  </div>
                  <div className="w-[10%] md:w-[20%] flex items-center justify-center">
                    <button
                      className="bg-stone-900 md:hidden text-white p-2 md:px-4 rounded-sm hover:brightness-95 disabled:opacity-50"
                      onClick={() => removeItemFromCartHandler(item._id)}
                    >
                      <BsTrash />
                    </button>
                    <button
                      className="hidden md:block bg-white text-stone-900 py-1 px-1 md:px-4 rounded-sm hover:bg-stone-200 disabled:opacity-50"
                      onClick={() => removeItemFromCartHandler(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </Wrapper>
              ))}
              <div className="text-xs xl:text-sm">
                <button
                  className="w-full bg-secondary text-white shadow-sm shadow-stone-200 mt-1 tracking-tighter py-2 px-4 hover:brightness-95 disabled:opacity-50 rounded-sm"
                  onClick={clearCartHandler}
                >
                  Empty cart
                </button>
              </div>
            </div>
            <div className="w-full md:w-[35.4%] mt-1 md:mt-0">
              <Heading text="Total" />
              {cartItems.length > 0 && (
                <Wrapper>
                  <div className="flex items-center justify-between my-2">
                    <p>Products price:</p>
                    <p className="font-semibold">${itemsPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col border-b border-b-secondary pb-2">
                    <div className="flex items-center justify-between">
                      <p>Delivery price:</p>
                      <p className="font-semibold">
                        ${deliveryPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="italic text-xxs xl:text-xs">
                      (free delivery for orders above $50)*
                    </p>
                  </div>
                  <div className="flex items-center justify-between font-semibold mt-2">
                    <p>Total price:</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <button
                      onClick={checkoutHandler}
                      className="w-full bg-stone-900 text-white py-2 px-4 hover:bg-stone-800 disabled:opacity-50 mt-4"
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </Wrapper>
              )}
            </div>
          </>
        )}
      </div>
    </Page>
  );
};
export default Cartpage;
