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
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="w-full mt-40 text-center">
          <p>{message}</p>
        </div>
      ) : (
        <>
          <Title text="Products" />
          <div className="flex flex-col bg-white shadow-sm shadow-stone-200 p-2 lg:p-4 mt-1">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Sold
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr className="border-b" key={product._id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            {product.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            ${product.price}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {product.sold}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex items-center justify-start">
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
