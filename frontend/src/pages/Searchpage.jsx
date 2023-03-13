import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";
import { Heading, Loader, Product, Page, Wrapper } from "../components/index";
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
    <Page>
      <Heading text="Products" button address={-1} />
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="md:hidden w-full">
          <Wrapper>
            <button
              className="h-6 w-full flex items-center justify-center font-semibold focus:outline-black"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            >
              <FaFilter className="mr-1" />
              Filter
            </button>
          </Wrapper>
          {filterMenuOpen && (
            <Wrapper>
              <h2 className="p-2 font-semibold text-xs">Categories</h2>
              <ul>
                {categories.map((c) => (
                  <li className="flex" key={c}>
                    <Link
                      onClick={() => setFilterMenuOpen(false)}
                      className={`block w-full mt-1 py-1 px-2 rounded-sm ${
                        c === category && "bg-secondary text-white "
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
              </ul>
            </Wrapper>
          )}
        </div>
        <Wrapper className="hidden md:block md:w-[26.3%] xl:w-[22.3%]">
          <h2 className="font-semibold text-sm mt-1 mb-2 px-2">Categories</h2>
          <ul>
            {categories.map((c) => (
              <li className="w-full flex" key={c}>
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
        </Wrapper>
        <div className="w-full md:w-[73.3%] xl:w-[77.3%]">
          <Wrapper className="flex items-center justify-center md:justify-start h-10">
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
          </Wrapper>
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="w-full mt-40 text-center">
              <p>{message}</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-between">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};
export default Searchpage;
