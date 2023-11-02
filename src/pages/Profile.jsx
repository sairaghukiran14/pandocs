import React, { useState, useEffect } from "react";
import Input from "../utils/Input";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../style.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  console.log(userInfo);

  const submitHandler = async () => {
    if (password === "") {
      toast.error("Password needed");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className=" profile_section wh-70 m-auto p-5 flex items-center gap-5 h-[50%] bottom-0 top-0 absolute left-0 right-0">
      <div className="flex-1 flex justify-center">
        <div className="wh-50 p-5 bg-white rounded-lg">
          <h1 className="font-semibold text-2xl mb-5 text-center">
            Profile Details
          </h1>
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
          <div className="mb-5 text-lg mt-6">
            <span className="text-sm">
              Enter password to update your profile.{" "}
            </span>
          </div>
          <div className="mb-5 ">
            <Input
              id="password"
              value={password}
              placeholder="Enter your password"
              type="password"
              change={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center gap-4 w-full">
            <button
              className="px-5 py-3 bg-purple-500 rounded font-semibold text-white w-full"
              onClick={() => submitHandler()}
            >
              Update Profile
            </button>
            {isLoading && <Loader />}
          </div>
          <div
            className="back_to_dashboard flex gap-2 items-center font-semibold mt-4 justify-center hover:text-blue-500 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <AiOutlineArrowLeft />
            <span>Back to Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
