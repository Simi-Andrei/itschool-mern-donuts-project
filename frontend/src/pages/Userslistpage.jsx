import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Title, Loader, PageWrapper } from "../components/index";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { getAllUsers, deleteUser, reset } from "../features/user/userSlice";

const Userslistpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, users, loading, success, error, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (success) {
      dispatch(reset());
    } else if (currentUser && currentUser.isAdmin) {
      dispatch(getAllUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, currentUser, navigate, success]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    toast.success("User deleted", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <PageWrapper>
      <div className="relative">
        <Title text="Users" className="pl-16" />
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
          <div className="flex flex-col bg-white shadow-sm shadow-stone-200 p-2 mt-1">
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
                          Email
                        </th>
                        <th scope="col" className="p-3">
                          Admin
                        </th>
                        <th scope="col" className="p-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr className="border-b" key={user._id}>
                          <td className="whitespace-nowrap p-3">{user.name}</td>
                          <td className="whitespace-nowrap p-3">
                            <a
                              className="hover:underline"
                              href={`mailto:${user.email}`}
                            >
                              {user.email}
                            </a>
                          </td>
                          <td className="whitespace-nowrap p-3">
                            {user.isAdmin ? (
                              <FaCheck className="text-green-400" />
                            ) : (
                              <FaTimes className="text-rose-400" />
                            )}
                          </td>
                          <td className="whitespace-nowrap p-3 flex items-center justify-start">
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
                              <BsTrash className="text-tertiary" />
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
export default Userslistpage;
