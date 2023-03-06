import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
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

  const SuccessToast = ({ text }) => (
    <div className="flex items-center justify-center">
      <img
        className="mr-2"
        src="/images/successDoughnut.png"
        alt="donut"
        width={30}
      />
      <p>{text}</p>
    </div>
  );

  useEffect(() => {
    if (success) {
      dispatch(reset());
      toast(<SuccessToast text="Product deleted" />, {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (currentUser && currentUser.isAdmin) {
      dispatch(getAllProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, currentUser, navigate, success]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <PageWrapper>
      <Title text="Products" />
      {loading ? (
        <div className="w-full text-center mt-40">
          <ClipLoader />
        </div>
      ) : error ? (
        <div className="w-full text-center mt-40">
          <p>{message}</p>
        </div>
      ) : (
        <div className="flex flex-col">
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
      )}
    </PageWrapper>
  );
};
export default Productslistpage;
