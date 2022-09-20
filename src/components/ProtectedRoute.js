import React, { createContext, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
/*
const ProtectedRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);

    console.log("Check user status: ", user);
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};
*/

function ProtectedRoute() {
    const AuthContext = createContext({});
    function useAuth() {
        return useContext(AuthContext);
    }
    const { user } = useAuth();
    if (!user) return <Navigate to="/"/>;
    return <Outlet />;
  }

export default ProtectedRoute;