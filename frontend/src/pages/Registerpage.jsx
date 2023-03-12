import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { PageWrapper } from "../components/index";
import * as Yup from "yup";
import { register, reset } from "../features/user/userSlice";

const Registerpage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser, loading, success, error, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(reset());
    if (error) {
      toast.error("Email already exists", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    if (success || currentUser) {
      navigate("/");
    }
  }, [message, currentUser, error, success, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Please fill in a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Please confirm password"),
    }),
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords don't match", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        const currentUser = { ...values };
        dispatch(register(currentUser));
      }
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
        <h2 className="text-center uppercase mt-6">Register</h2>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="w-full md:w-64 text-xs md:text-sm"
        >
          <div className="form-group my-8 relative">
            <input
              className="form-input bg-transparent border-b border-b-stone-200 pt-2 focus:outline-none w-full"
              type="text"
              id="name"
              name="name"
              placeholder=" "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="name"
              className="form-label block absolute cursor-text bottom-0.5 left-0 tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
            >
              Name
            </label>
            {formik.touched.name && formik.errors.name && (
              <p className="absolute -bottom-5 text-rose-400 text-xxs tracking-wider">
                {formik.errors.name}*
              </p>
            )}
          </div>
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
          <div className="form-group my-8 relative">
            <input
              className="form-input bg-transparent border-b border-b-stone-200 pt-2 focus:outline-none w-full"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" "
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="confirmPassword"
              className="form-label block absolute cursor-text bottom-0.5 left-0 tracking-wider opacity-50 transition-all duration-200 pointer-events-none"
            >
              Confirm password
            </label>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="absolute -bottom-5 text-rose-400 text-xxs tracking-wider">
                  {formik.errors.confirmPassword}*
                </p>
              )}
          </div>
          <button
            className="w-full bg-stone-900 text-white py-2 px-4 hover:bg-stone-800 disabled:opacity-50 mt-4 uppercase"
            type="submit"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="mt-10 text-center">
            <p className="text-xs">
              Already have an account?{" "}
              <Link className="underline text-secondary" to="/login">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};
export default Registerpage;
