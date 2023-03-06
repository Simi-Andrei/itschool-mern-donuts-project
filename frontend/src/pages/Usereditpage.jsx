import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Title from "../components/Title";
import BackButton from "../components/BackButton";
import PageWrapper from "../components/PageWrapper";
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
    if (currentUser && !currentUser.isAdmin) {
      navigate("/login");
    } else if (success) {
      dispatch(reset());
      navigate("/admin/users");
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
    toast(<SuccessToast text="User updated" />, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <PageWrapper>
      <BackButton />
      <Title text="Edit user" />
      <div className="flex items-center justify-center mt-4">
        <form
          onSubmit={submitHandler}
          autoComplete="off"
          className="w-64 text-sm lg:text-base"
        >
          {loading ? (
            <div className="w-full text-center mt-40">
              <ClipLoader />
            </div>
          ) : error ? (
            <div className="w-full text-center mt-40">
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
              <div className="text-sm lg:text-base">
                <button
                  className="w-full bg-tertiary text-white py-2 px-4 hover:opacity-90 disabled:opacity-50 mt-4"
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
