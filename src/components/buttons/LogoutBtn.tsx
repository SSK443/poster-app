import React from "react";
import { logout } from "../../store/features/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await authService.userLogout();
      dispatch(logout());
    } catch (error) {
      console.log(`Error occurred in logout service
 ${error}`);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white p-3 rounded-lg text-xl"
    >
      logout
    </button>
  );
}

export default LogoutBtn;
