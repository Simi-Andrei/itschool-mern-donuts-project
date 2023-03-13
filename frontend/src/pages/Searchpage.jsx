import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";
import { Title, Loader, Product, PageWrapper } from "../components/index";
import {
  getAllProducts,
  getProductCategories,
} from "../features/product/productSlice";

const Searchpage = () => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, order = "newest" } = useParams();

  const { products, categories, loading, error, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAllProducts({ category, order }));
    dispatch(getProductCategories());
  }, [dispatch, category, order]);

  const filterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const sortOrder = filter.order || order;
    return `/search/category/${filterCategory}/order/${sortOrder}`;
  };

  return (
    <PageWrapper>
      <div className="relative">
        <Title text="Products" className="pl-16" />
        <button
          className="absolute top-2 -left-1 py-0.5 px-3 rounded-tr-md rounded-br-md rounded-tl-sm rounded-bl-sm bg-stone-900 text-white text-sm"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:hidden">
          <div className="bg-white w-full h-10 mt-1 flex items-center justify-center text-xs xl:text-sm rounded-sm shadow-sm shadow-stone-200">
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            >
              <FaFilter className="mr-1" />
              Filter
            </button>
          </div>
          {filterMenuOpen && (
            <div className="bg-white w-full flex flex-col items-start shadow-sm shadow-stone-200 mt-1 pb-2 md:w-1/4 xl:w-[22%] rounded-sm">
              <h2 className="p-2 px-4 font-semibold text-xs">Categories</h2>
              <div className="flex flex-col px-2 w-full">
                {categories.map((c) => (
                  <li className="w-full flex text-xs xl:text-sm" key={c}>
                    <Link
                      onClick={() => setFilterMenuOpen(false)}
                      className={`"block w-full mt-1 py-1 px-2 rounded-sm " ${
                        c !== category && "hover:bg-stone-100"
                      } ${
                        c === category
                          ? "bg-secondary text-white hover:bg-secondary"
                          : ""
                      }`}
                      to={filterUrl({ category: c })}
                    >
                      {c === "inEarHeadphones"
                        ? "Headphones"
                        : c === "onEarHeadsets"
                        ? "Headsets"
                        : c === "speakers"
                        ? "Speakers"
                        : "Watches"}{" "}
                      <span className="text-xxs">
                        ({products.length} products)
                      </span>
                    </Link>
                  </li>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white hidden md:flex flex-col items-start shadow-sm shadow-stone-200 mt-1 px-2 mr-1 pb-8 md:w-1/4 xl:w-[22%] rounded-sm">
          <h2 className="mb-2 p-2 font-semibold text-sm mt-1">Categories</h2>
          <ul className="flex flex-col w-full">
            {categories.map((c) => (
              <li className="w-full flex text-xs xl:text-sm" key={c}>
                <Link
                  className={`"block w-full mt-1 py-1 px-2 rounded-sm " ${
                    c !== category && "hover:bg-stone-100"
                  } ${
                    c === category
                      ? "bg-secondary text-white hover:bg-secondary"
                      : ""
                  }`}
                  to={filterUrl({ category: c })}
                >
                  {c === "inEarHeadphones"
                    ? "Headphones"
                    : c === "onEarHeadsets"
                    ? "Headsets"
                    : c === "speakers"
                    ? "Speakers"
                    : "Watches"}{" "}
                  <span className="text-xxs">({products.length} products)</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4 xl:w-[78%]">
          <div className="bg-white flex items-center justify-center md:justify-start h-10 shadow-sm text-xs md:text-sm shadow-stone-200 mt-1 p-2 rounded-sm">
            <span className="mr-2 font-semibold">Sort by</span>
            <select
              value={order}
              onChange={(e) => navigate(filterUrl({ order: e.target.value }))}
              name="order"
              id="order"
              className="border border-stone-200 px-6 py-1 focus:outline-black"
            >
              <option value="newest">Newest</option>
              <option value="rated">Top rated</option>
              <option value="low">Price low to high</option>
              <option value="high">Price high to low</option>
            </select>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="w-full mt-40 text-center">
              <p>{message}</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-between mt-1">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
export default Searchpage;
