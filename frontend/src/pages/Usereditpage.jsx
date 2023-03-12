import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, PageWrapper } from "../components/index";
import { getUser, updateUser, reset } from "../features/user/userSlice";

const Usereditpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { currentUser, user, loading, success, error, message } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      navigate("/login");
    } else if (success) {
      dispatch(reset());
      navigate("/admin/users");
      toast.success("User updated", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUser(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, id, success, navigate, currentUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center mt-4">
        <h2 className="bg-white p-2 text-center uppercase mt-20 w-64 shadow-sm shadow-stone-200 h-10">
          Edit user
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
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="form-label block absolute cursor-text bottom-0.5 left-0 text-sm tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
                >
                  Email
                </label>
              </div>
              <div className="my-4 flex">
                <input
                  className="focus:outline-none mr-4 cursor-pointer accent-secondary"
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  placeholder=" "
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label
                  htmlFor="isAdmin"
                  className="tracking-wider cursor-pointer"
                >
                  Is admin
                </label>
              </div>
              <div className="text-xs xl:text-sm">
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
export default Usereditpage;
