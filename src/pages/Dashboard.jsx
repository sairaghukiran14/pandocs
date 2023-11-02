import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SiGoogledocs } from "react-icons/si";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetDocumentsMutation } from "../slices/userApiSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [documents, { isLoading }] = useGetDocumentsMutation();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div className="dashboard_section wh-70 m-auto p-5 flex flex-col items-center gap-5 h-[50%] absolute left-0 right-0 mt-10">
      <span className="font-semibold text-3xl text-white">
        Welcome {userInfo.name}
      </span>
      <div className="create_new_document">
        <div className="contents_new">
          <button
            className="bg-white text-green-600 px-4 py-2 font-semibold rounded-lg"
            onClick={() => {
              navigate(`/documents/${uuidV4()}`);
            }}
          >
            New Document
          </button>
        </div>
      </div>
      <div className="header_line border-t-orange-50 font-semibold text-xl text-white">
        - Your Documents -
      </div>
      <div className="list_documents flex flex-wrap gap-2 items-center justify-center">
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
        <div className="individual_doc flex gap-2 border p-3 rounded-lg items-center cursor-pointer bg-white">
          <SiGoogledocs className="text-blue-500 w-7 h-7" />
          <div className="id_doc text-black">alisfbasof-asfasfa-f-eg23-124</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
