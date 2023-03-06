import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { getAllUsers, deleteUser, reset } from "../features/user/userSlice";

const Userslistpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, users, loading, success, error, message } = useSelector(
    (state) => state.user
  );

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
      toast(<SuccessToast text="User deleted" />, {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (currentUser && currentUser.isAdmin) {
      dispatch(getAllUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, currentUser, navigate, success]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <PageWrapper>
      <Title text="Users" />
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
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Admin
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr className="border-b" key={user._id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <a
                            className="hover:underline"
                            href={`mailto:${user.email}`}
                          >
                            {user.email}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.isAdmin ? (
                            <FaCheck className="text-green-400" />
                          ) : (
                            <FaTimes className="text-red-400" />
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex items-center justify-start">
                          <Link
                            className="p-1 mr-4"
                            to={`/admin/users/${user._id}/edit`}
                          >
                            <FaEdit className="text-secondary" />
                          </Link>
                          <button
                            className="p-1"
                            onClick={() => deleteHandler(user._id)}
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
export default Userslistpage;
