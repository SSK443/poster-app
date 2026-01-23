import React from "react";
import { CommonBtn, CommonInput, Logo } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/features/authSlice";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {
  register, 
  handleSubmit,
  formState: { isSubmitting },
} = useForm<LoginFormData>();
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);


  const handleLogin = async (data: LoginFormData) => {
    setError(null);

    try {
      const session = await authService.userLogin(data);

      if (session) {
        const userData = await authService.currentUser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
       setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div
        id="main"
        className="w-full max-w-md bg-white rounded-2xl shadow-xl 
             border border-gray-100 px-8 py-10"
      >
        <div className="flex flex-col items-center gap-2 mb-6">
          <Logo width="90px" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>
        <div className="min-h-[40px]">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 text-center">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div className="space-y-4 mt-5 ">
            <CommonInput
              label="Email"
              type="email"
              autoFocus
              autoComplete="email"
              className="focus:ring-2 focus:ring-blue-500"
              placeholder="enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "invalid email address",
                },
              })}
            />
            <div className="relative">
              <CommonInput
                label="Password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                className="focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="enter your password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-sm text-blue-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <CommonBtn
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-base rounded-xl bg-blue-600 
             hover:bg-blue-700 transition-all duration-200
             disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </CommonBtn>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-gray-500 hover:text-gray-800 hover:underline transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
