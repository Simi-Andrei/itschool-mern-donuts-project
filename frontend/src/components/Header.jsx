import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronDown, BsHeart } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { logout, reset } from "../features/user/userSlice";
import { getProductCategories } from "../features/product/productSlice";

const Header = () => {
  const [accMenuOpen, setAccMenuOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const { favoriteItems } = useSelector((state) => state.favorites);

  const { currentUser } = useSelector((state) => state.user);

  const cartItemsCount = cartItems.reduce(
    (acc, item) => (acc += item.quantity),
    0
  );

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="bg-stone-900 text-white w-full fixed top-0 left-0 z-50">
      <nav className="w-full lg:w-8/12 mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <Link
          to="/"
          className="tracking-tighter text-xl md:text-2xl mb-5 md:mb-0"
        >
          tech<span className="text-secondary">i</span>e
        </Link>
        <ul className="flex items-center text-xs md:text-sm font-light">
          <li className="ml-4">
            <Link to="/">Home</Link>
          </li>
          <li className="ml-4">
            <Link to="/categories">Products</Link>
          </li>
          <li className="ml-4 mr-2 relative">
            <Link to="/cart">
              <RiShoppingCartLine className="text-lg" />
            </Link>
            <span className="absolute text-xs -top-3 -right-3.5 rounded-full w-5 h-5 grid place-items-center bg-secondary pointer-events-none text-white">
              {cartItemsCount}
            </span>
          </li>
          <li className="ml-4 mr-2 relative">
            <Link to="/favorites">
              <BsHeart className="text-lg" />
            </Link>
            <span className="absolute text-xs -top-3 -right-3.5 rounded-full w-5 h-5 grid place-items-center bg-secondary pointer-events-none text-white">
              {favoriteItems.length}
            </span>
          </li>
          {currentUser && currentUser.isAdmin ? (
            <li className="ml-4">
              <div className="relative">
                <button
                  onClick={() => setAccMenuOpen(!accMenuOpen)}
                  className="flex items-center justify-evenly w-full focus:outline-none"
                >
                  Account
                  <BsChevronDown
                    className={`ml-1 transition-all duration-150 ${
                      accMenuOpen && "rotate-180"
                    }`}
                  />
                </button>
                {accMenuOpen && (
                  <ul className="absolute shadow-md w-36 top-8 -right-4 text-right bg-white text-stone-900 p-2">
                    <p
                      className="capitalize cursor-default block w-full py-2 px-4 text-sm text-stone-900 font-semibold"
                      data-te-dropdown-item-ref
                    >
                      {currentUser && currentUser.name}
                    </p>
                    <li onClick={() => setAccMenuOpen(!accMenuOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-stone-100 rounded-md transition duration-100"
                        to="/profile"
                        data-te-dropdown-item-ref
                      >
                        Profile
                      </Link>
                    </li>
                    <li onClick={() => setAccMenuOpen(!accMenuOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-stone-100 rounded-md transition duration-100"
                        to="/admin/users"
                        data-te-dropdown-item-ref
                      >
                        Users
                      </Link>
                    </li>
                    <li onClick={() => setAccMenuOpen(!accMenuOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-stone-100 rounded-md transition duration-100"
                        to="/admin/products"
                        data-te-dropdown-item-ref
                      >
                        Products
                      </Link>
                    </li>
                    <li onClick={() => setAccMenuOpen(!accMenuOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-stone-100 rounded-md transition duration-100 mb-1"
                        to="/admin/orders"
                        data-te-dropdown-item-ref
                      >
                        Orders
                      </Link>
                    </li>
                    <li
                      onClick={() => setAccMenuOpen(!accMenuOpen)}
                      className="border-t border-t-gray-100"
                    >
                      <button
                        onClick={logoutHandler}
                        className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white rounded-md transition duration-100 text-right mt-1"
                        href="#"
                        data-te-dropdown-item-ref
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ) : (
            currentUser &&
            !currentUser.isAdmin && (
              <li className="ml-4">
                <div className="relative">
                  <button
                    onClick={() => setAccMenuOpen(!accMenuOpen)}
                    className="flex items-center justify-evenly w-full"
                  >
                    Account
                    <BsChevronDown
                      className={`ml-1 transition-all duration-150 ${
                        accMenuOpen && "rotate-180"
                      }`}
                    />
                  </button>
                  {accMenuOpen && (
                    <ul className="absolute shadow-md w-36 top-8 -right-4 text-right bg-white text-stone-900 p-2">
                      <p
                        className="capitalize cursor-default block w-full py-2 px-4 text-sm text-stone-900 font-semibold"
                        data-te-dropdown-item-ref
                      >
                        {currentUser && currentUser.name}
                      </p>
                      <li onClick={() => setAccMenuOpen(!accMenuOpen)}>
                        <Link
                          className="block w-full py-2 px-4 text-sm hover:bg-stone-100 rounded-md transition duration-100 mb-1"
                          to="/profile"
                          data-te-dropdown-item-ref
                        >
                          Profile
                        </Link>
                      </li>
                      <li
                        onClick={() => setAccMenuOpen(!accMenuOpen)}
                        className="border-t border-t-gray-100"
                      >
                        <button
                          onClick={logoutHandler}
                          className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white rounded-md transition duration-100 text-right mt-1"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            )
          )}
          {!currentUser && (
            <>
              <li className="ml-4">
                <Link to="/login">Login</Link>
              </li>
              <li className="ml-4">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Header;
