import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    //we do () => () => to access store from app.jsx,
    //because we need our store and usedispatch here
    // because it is not a component, it is function
    //so we cannot use usedispatch, but store.js has all
    // functionality that we need
    //we simply pass in our store and get dispatch from there
    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("Logged in.");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";

      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("Welcome, guest user.");
      navigate("/");
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-column gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="Email"
          name="identifier"
          autoFocus={true}
        />
        <FormInput type="password" name="password" label="Password" />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          onClick={loginAsGuestUser}
          className="btn btn-secondary btn-block"
        >
          Guest User
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
