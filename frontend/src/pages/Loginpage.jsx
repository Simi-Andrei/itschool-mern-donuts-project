import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { PageWrapper } from "../components/index";
import * as Yup from "yup";
import { login, reset } from "../features/user/userSlice";

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { currentUser, loading, success, error, message } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    dispatch(reset());
    if (error) {
      toast.error("Invalid email or password", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    if (success || currentUser) {
      navigate(redirect);
    }
  }, [message, currentUser, error, success, navigate, dispatch, redirect]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please fill in a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const currentUser = { ...values };
      dispatch(login(currentUser));
    },
  });

  return (
    <PageWrapper>
      <div className="bg-white p-10 text-stone-900 relative shadow-shadow mt-20 flex flex-col items-center justify-start w-full max-w-[320px] mx-auto">
        <div
          className="bg-secondary p-1 absolute top-0 left-[50%]
            -translate-y-[50%] -translate-x-[50%] rounded-full"
        >
          <div className="bg-stone-900 rounded-full w-16 h-16 flex flex-col items-center justify-center font-bold">
            <p className="leading-none uppercase text-white">
              tech<span className="text-secondary">i</span>e
            </p>
          </div>
        </div>
        <h2 className="text-center uppercase mt-6">Login</h2>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="w-full md:w-64 text-xs md:text-sm"
        >
          <div className="form-group my-8 relative">
            <input
              className="form-input bg-transparent border-b border-b-stone-200 pt-2 focus:outline-none w-full"
              type="text"
              id="email"
              name="email"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="form-label block absolute cursor-text bottom-0.5 left-0 tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
            >
              Email
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="absolute -bottom-5 text-rose-400 text-xxs tracking-wider">
                {formik.errors.email}*
              </p>
            )}
          </div>
          <div className="form-group my-8 relative">
            <input
              className="form-input bg-transparent border-b border-b-stone-200 pt-2 focus:outline-none w-full"
              type="password"
              id="password"
              name="password"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="form-label block absolute cursor-text bottom-0.5 left-0 tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
            >
              Password
            </label>
            {formik.touched.password && formik.errors.password && (
              <p className="absolute -bottom-5 text-rose-400 text-xxs tracking-wider">
                {formik.errors.password}*
              </p>
            )}
          </div>
          <button
            className="w-full bg-stone-900 text-white py-2 px-4 hover:bg-stone-800 disabled:opacity-50 mt-4 uppercase"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="mt-10 text-center">
            <p className="text-xs">
              Don't have an account?{" "}
              <Link className="underline text-secondary" to="/register">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};
export default Loginpage;
