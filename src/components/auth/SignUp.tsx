import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Link, useNavigate } from 'react-router-dom';
import {  useForm } from 'react-hook-form';
import { CommonBtn, CommonInput, Logo } from '../index';
import authService from '../../appwrite/auth';
import { login  } from '../../store/features/authSlice';

interface SignUpFormData {
  email: string;
  password: string;
  name: string;
}

function SignUp() {
  const[error, setError] = useState<string | null>(null);
  const[showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>();


  async function handleCreateAccount(data: SignUpFormData): Promise<void> {
              
    setError(null);
    try{
      const userData=await authService.createAccount(data);
      if(userData){
       const currentUser = await authService.currentUser();
      if(currentUser){
        dispatch(login(currentUser));
        navigate("/");
      }

    }
  }
    catch(error){
 setError("Failed to create account. Please try again.");


    }
  }

            return (
              <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
                  <div className="flex flex-col items-center gap-2 mb-6">
                    <Logo width="110px" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Create your account
                    </h2>
                  </div>

                  <div className="min-h-[40px]">
                    {error && (
                      <p className="text-red-600 text-center text-sm font-medium">
                        {error}
                      </p>
                    )}
                  </div>

                  <form
                    onSubmit={handleSubmit(handleCreateAccount)}
                    className="space-y-5"
                  >
                    <CommonInput
                      label="Name"
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="focus:ring-2 focus:ring-blue-500"
                      {...register("name", { required: true })}
                    />

                    <CommonInput
                      label="Email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className="focus:ring-2 focus:ring-blue-500"
                      {...register("email", { required: true })}
                    />

                    <div className="relative">
                      <CommonInput
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a password"
                        className="focus:ring-2 focus:ring-blue-500 pr-12"
                        {...register("password", {
                          required: true,
                          minLength: 6,
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
                      bgColor="bg-green-600"
                      hoverBg="hover:bg-green-700"
                      className="w-full disabled:opacity-60"
                    >
                      {isSubmitting ? "Creating..." : "Create Account"}
                    </CommonBtn>

                    <div className="text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Sign in
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            );


            }
          

export default SignUp
