import React from "react";
import profile from "../images/profile.png";
import { GlobalContext } from "../globalContext";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { AuthContext } from "../authContext";
const AdminDashboardPage = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT", payload: "" });
    // navigate("/admin/login");
  };

  return (
    <>
      <section className="bg-ter w-screen  min-h-screen text-gray-700 ">
        <div className="mx-auto w-[90%] max-w-[1440px]">
          <div className="flex justify-between py-5">
            <p className="text-[48px] font-[900] text-white">APP</p>
            <button
              onClick={() => logout()}
              className="bg-sec flex gap-3 rounded-[40px] w-[128px] h-[48px] items-center justify-center"
            >
              <img src={profile} alt="profile" />
              <p className="text-[16px]">Logout</p>
            </button>
          </div>
          <div className="mt-20 text-base font-thin flex justify-between ">
            <p className="text-[40px]">Today's Leaderboard</p>
            <ul className="bg-[#1d1d1d] rounded-[16px] flex gap-3 py-2 px-4 items-center">
              <li>30 May 2022</li>
              <div className="bg-pri h-[4px] w-[4px] rounded-full"></div>
              <li className="bg-sec rounded-lg p-1 px-2">SUBMISSIONS OPEN</li>
              <div className="bg-pri h-[4px] w-[4px] rounded-full"></div>
              <li>11:34</li>
            </ul>
          </div>
          <DndProvider backend={HTML5Backend}>
            <Board />
          </DndProvider>
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
