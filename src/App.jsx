import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="h-full">
      <Header />
      <ToastContainer />
      <div className=" layout-body">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
