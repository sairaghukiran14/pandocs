import React, { useState } from "react";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { SiGoogledocs } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import "../style.css";
import avatar from "../assets/avatar.png";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/SignIn");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-5 h-[70px] bg-white flex items-center justify-between z-1">
      <div
        className="cursor-pointer text-2xl flex"
        onClick={() => {
          navigate("/");
        }}
      >
        <SiGoogledocs className="text-green-600 text-3xl" />
        <span className="font-semibold flex items-end">Pandocs</span>
      </div>
      <div className="flex items-center gap-5">
        {userInfo ? (
          <>
            <div
              className=" cursor-pointer text-lg relative"
              onClick={() => setShow(!show)}
            >
              <div className="dropdown_section hover:text-green-600 flex items-center gap-1">
                <img
                  src={avatar}
                  alt=""
                  className="w-7 h-7 rounded-full bg-green-400"
                />
                {/* <div className="sample_user_photo w-8 h-8 bg-slate-500 flex justify-center items-center text-white font-semibold rounded-full">{userInfo.name[0].toUpperCase()}</div> */}
                <span className="font-mono">{userInfo.name}</span>
              </div>
              <div
                className={`absolute ${
                  show ? "block" : "hidden"
                } w-[160px] bg-white right-[-4px] top-7 rounded flex flex-col z-50 `}
              >
                <h3
                  className="px-4 py-3 hover:bg-green-600 hover:text-white rounded"
                  onClick={() => navigate("/Profile")}
                >
                  Profile
                </h3>
                <h3
                  className="px-4 py-3 hover:bg-green-600 hover:text-white  rounded"
                  onClick={logoutHandler}
                >
                  Logout
                </h3>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="flex items-center gap-1 cursor-pointer  px-4 py-2 bg-green-600 text-white font-semibold rounded-lg"
              onClick={() => navigate("/SignIn")}
            >
              Login
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer  px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
              onClick={() => navigate("/SignUp")}
            >
              Register
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
