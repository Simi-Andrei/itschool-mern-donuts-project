import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Title, Loader, PageWrapper } from "../components/index";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  getAllProducts,
  deleteProduct,
  reset,
} from "../features/product/productSlice";

const Productslistpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, success, error, message } = useSelector(
    (state) => state.product
  );

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      dispatch(reset());
    } else if (currentUser && currentUser.isAdmin) {
      dispatch(getAllProducts({}));
    } else {
      navigate("/login");
    }
  }, [dispatch, currentUser, navigate, success]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Product deleted", {
      position: "top-center",
      autoClose: 2000,
    });
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
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="w-full mt-40 text-center">
          <p>{message}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col p-2 bg-white shadow-sm shadow-stone-200 mt-1">
            <div className="overflow-x-auto text-xs xl:text-sm">
              <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left font-light">
                    <thead className="border-b">
                      <tr>
                        <th scope="col" className="p-3">
                          Name
                        </th>
                        <th scope="col" className="p-3">
                          Price
                        </th>
                        <th scope="col" className="p-3">
                          Sold
                        </th>
                        <th scope="col" className="p-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr className="border-b" key={product._id}>
                          <td className="whitespace-nowrap p-3">
                            {product.name}
                          </td>
                          <td className="whitespace-nowrap p-3">
                            ${product.price}
                          </td>
                          <td className="whitespace-nowrap p-3">
                            {product.sold}
                          </td>
                          <td className="whitespace-nowrap p-3 flex items-center justify-start">
                            <Link
                              className="p-1 mr-4"
                              to={`/admin/products/${product._id}/edit`}
                            >
                              <FaEdit className="text-secondary" />
                            </Link>
                            <button
                              className="p-1"
                              onClick={() => deleteHandler(product._id)}
                            >
                              <FaTrashAlt className="text-tertiary" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
};
export default Productslistpage;
