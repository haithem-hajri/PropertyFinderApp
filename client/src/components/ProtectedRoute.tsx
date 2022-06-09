import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import { toast, ToastContainer } from "react-toastify";
const ProtectedRoute = ({ children }: any) => {
  const { state } = useContext(UserContext);

  // const navigate = useNavigate();
  if (state.isLoggedIn === false) {
    toast.error("Vous devez vous connecter pour accéder à cette page");
    <ToastContainer />
    return <>
    
     <Navigate to="/login" replace   />
    
    </>;
  } else {
    return children;
  }
};

export default ProtectedRoute;
