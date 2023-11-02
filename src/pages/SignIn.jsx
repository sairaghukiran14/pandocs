import React, { useState, useEffect } from "react";
import Input from "../utils/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="wh-70 m-auto p-5 flex items-center gap-5 h-[50%] bottom-0 top-0 absolute left-0 right-0">
      <div className=" flex-1 flex justify-center ">
        <div className="wh-50 p-5 bg-white rounded-lg">
          <h1 className="text-2xl mb-5 font-semibold text-center">Sign In</h1>
          <div className="mb-5">
            <Input
              id="email"
              value={email}
              placeholder="Enter your email"
              type="email"
              change={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <Input
              id="password"
              value={password}
              placeholder="Enter your password"
              type="password"
              change={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-5 flex items-center gap-4 justify-center w-full">
            <button
              className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg w-full hover:shadow-md"
              onClick={() => submitHandler()}
            >
              Log In
            </button>
            {isLoading && <Loader />}
          </div>
          <div className="text-center">
            <span className="font-base text-sm text-center ">
              Don't have an account?{" "}
              <span
                className="text-blue-500 font-semibold hover:text-green-600 hover:border-b-2 cursor-pointer"
                onClick={() => navigate("/SignUp")}
              >
                Sign Up
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
