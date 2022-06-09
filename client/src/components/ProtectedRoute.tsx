import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const ProtectedRoute = ({ children }: any) => { 
  const { state } = useContext(UserContext);

  // const navigate = useNavigate();
  if (state.isLoggedIn === false) {
    return (
      <>
        <Navigate to="/login" replace />
      </>
    );
  } else {
    return children;
  }
};

export default ProtectedRoute;
