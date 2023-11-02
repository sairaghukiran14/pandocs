import React, { useState, useEffect } from "react";
import Input from "../utils/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        // navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="wh-70 m-auto p-5 flex items-center gap-5 h-[50%] bottom-0 top-0 absolute left-0 right-0">
      <div className="flex-1 flex justify-center">
        <div className="wh-50 p-5 bg-white rounded-lg">
          <h1 className="text-2xl mb-5 font-semibold text-center">Sign Up</h1>
          <div className="mb-5">
            <Input
              id="name"
              value={name}
              placeholder="Enter your name"
              type="text"
              change={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-5">
            <Input
              id="confirm password"
              value={confirmPassword}
              placeholder="Re-enter your password"
              type="password"
              change={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-5 flex items-center gap-4 justify-center w-full">
            <button
              className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg w-full hover:shadow-md"
              onClick={() => submitHandler()}
            >
              Register
            </button>
            {isLoading && <Loader />}
          </div>
          <div className="text-center">
            <span className="font-base text-sm text-center ">
              Already have an account?{" "}
              <span
                className="text-green-600 font-semibold hover:text-blue-500 hover:border-b-2 cursor-pointer"
                onClick={() => navigate("/SignIn")}
              >
                Sign In
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
