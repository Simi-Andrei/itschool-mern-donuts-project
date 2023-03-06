import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronDown, BsHandbag, BsHeart } from "react-icons/bs";
import { logout, reset } from "../features/user/userSlice";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const { favoriteItems } = useSelector((state) => state.favorites);

  const { currentUser } = useSelector((state) => state.user);

  const cartItemsCount = cartItems.reduce(
    (acc, item) => (acc += item.quantity),
    0
  );

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="bg-white w-full fixed top-0 left-0 z-50">
      <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <Link
          to="/"
          className="font-bold tracking-wider text-xl md:text-2xl mb-5 md:mb-0"
        >
          d<span className="text-tertiary">o</span>nuts
        </Link>
        <ul className="flex items-center text-sm font-light">
          <li className="ml-4">
            <Link to="/">Home</Link>
          </li>
          <li className="ml-4">
            <Link to="/products">Products</Link>
          </li>
          <li className="ml-4 mr-2 relative">
            <Link to="/cart">
              <BsHandbag />
            </Link>
            <span className="absolute text-xs -top-3 -right-3.5 rounded-full w-5 h-5 grid place-items-center bg-secondary pointer-events-none text-white">
              {cartItemsCount}
            </span>
          </li>
          <li className="ml-4 mr-2 relative">
            <Link to="/favorites">
              <BsHeart />
            </Link>
            <span className="absolute text-xs -top-3 -right-3.5 rounded-full w-5 h-5 grid place-items-center bg-secondary pointer-events-none text-white">
              {favoriteItems.length}
            </span>
          </li>
          {currentUser && currentUser.isAdmin ? (
            <li className="ml-4">
              <div className="relative">
                <button
                  onClick={() => setNavOpen(!navOpen)}
                  className="flex items-center justify-evenly w-full focus:outline-none"
                >
                  Account
                  <BsChevronDown
                    className={`ml-1 transition-all duration-150 ${
                      navOpen && "rotate-180"
                    }`}
                  />
                </button>
                {navOpen && (
                  <ul className="absolute shadow-md w-28 top-8 right-0 text-right bg-white">
                    <li className="border-b border-b-gray-100">
                      <p
                        className="capitalize cursor-default block w-full py-2 px-4 text-sm text-tertiary"
                        data-te-dropdown-item-ref
                      >
                        {currentUser && currentUser.name}
                      </p>
                    </li>
                    <li onClick={() => setNavOpen(!navOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white transition duration-100"
                        to="/profile"
                        data-te-dropdown-item-ref
                      >
                        Profile
                      </Link>
                    </li>
                    <li onClick={() => setNavOpen(!navOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white transition duration-100"
                        to="/admin/users"
                        data-te-dropdown-item-ref
                      >
                        Users
                      </Link>
                    </li>
                    <li onClick={() => setNavOpen(!navOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white transition duration-100"
                        to="/admin/products"
                        data-te-dropdown-item-ref
                      >
                        Products
                      </Link>
                    </li>
                    <li onClick={() => setNavOpen(!navOpen)}>
                      <Link
                        className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white transition duration-100"
                        to="/admin/orders"
                        data-te-dropdown-item-ref
                      >
                        Orders
                      </Link>
                    </li>
                    <li
                      onClick={() => setNavOpen(!navOpen)}
                      className="border-t border-t-gray-100"
                    >
                      <button
                        onClick={logoutHandler}
                        className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white transition duration-100 text-right"
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
                    onClick={() => setNavOpen(!navOpen)}
                    className="flex items-center justify-evenly w-full"
                  >
                    Account
                    <BsChevronDown
                      className={`ml-1 transition-all duration-150 ${
                        navOpen && "rotate-180"
                      }`}
                    />
                  </button>
                  {navOpen && (
                    <ul className="absolute shadow-md w-28 top-6 right-0 text-right bg-white">
                      <li className="border-b border-b-gray-100">
                        <p
                          className="capitalize cursor-default block w-full py-2 px-4 text-sm text-tertiary"
                          data-te-dropdown-item-ref
                        >
                          {currentUser && currentUser.name}
                        </p>
                      </li>
                      <li onClick={() => setNavOpen(!navOpen)}>
                        <Link
                          className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white transition duration-100"
                          to="/profile"
                          data-te-dropdown-item-ref
                        >
                          Profile
                        </Link>
                      </li>
                      <li
                        onClick={() => setNavOpen(!navOpen)}
                        className="border-t border-t-gray-100"
                      >
                        <button
                          onClick={logoutHandler}
                          className="block w-full py-2 px-4 text-sm hover:bg-secondary hover:text-white transition duration-100 text-right"
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
