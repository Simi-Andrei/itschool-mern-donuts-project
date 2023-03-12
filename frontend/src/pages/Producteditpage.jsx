import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, PageWrapper } from "../components/index";
import {
  getSingleProduct,
  updateProduct,
  reset,
} from "../features/product/productSlice";

const Producteditpage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [sold, setSold] = useState("");

  const { product, loading, success, error, message } = useSelector(
    (state) => state.product
  );
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      navigate("/login");
    } else if (success) {
      dispatch(reset());
      navigate("/admin/products");
      toast.success("Product updated", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      if (!product.name || product._id !== id) {
        dispatch(getSingleProduct(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setStock(product.stock);
        setSold(product.sold);
      }
    }
  }, [dispatch, product, id, success, navigate, currentUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: id, name, price, description, stock, sold }));
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center mt-4">
        <h2 className="bg-white p-2 text-center uppercase mt-20 w-64 shadow-sm shadow-stone-200 h-10">
          Edit product
        </h2>
        <form
          onSubmit={submitHandler}
          autoComplete="off"
          className="bg-white mt-1 shadow-sm shadow-stone-200 w-64 text-sm lg:text-base p-2 lg:p-4"
        >
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="w-full mt-40 text-center">
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
                  type="number"
                  id="price"
                  name="price"
                  placeholder=" "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label
                  htmlFor="price"
                  className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                >
                  Price
                </label>
              </div>
              <div className="form-group my-8 relative">
                <input
                  className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                  type="text"
                  id="description"
                  name="description"
                  placeholder=" "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label
                  htmlFor="description"
                  className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                >
                  Description
                </label>
              </div>
              <div className="form-group my-8 relative opacity-50">
                <input
                  className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                  type="text"
                  id="image"
                  name="image"
                  placeholder=" "
                  defaultValue="/images/productImage"
                  disabled
                />
                <label
                  htmlFor="description"
                  className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                >
                  Image
                </label>
              </div>
              <div className="form-group my-8 relative">
                <input
                  className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder=" "
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
                <label
                  htmlFor="stock"
                  className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                >
                  Stock
                </label>
              </div>
              <div className="form-group my-8 relative">
                <input
                  className="form-input bg-transparent border-b border-b-cream pt-2 focus:outline-none w-full"
                  type="number"
                  id="sold"
                  name="sold"
                  placeholder=" "
                  value={sold}
                  onChange={(e) => setSold(e.target.value)}
                />
                <label
                  htmlFor="sold"
                  className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                >
                  Sold
                </label>
              </div>
              <div className="text-sm lg:text-base">
                <button
                  className="w-full bg-stone-900 text-white py-2 px-4 hover:brightness-95 disabled:opacity-50 mt-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </PageWrapper>
  );
};
export default Producteditpage;
