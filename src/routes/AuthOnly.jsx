import { Outlet,Navigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import Login from "../pages/Login";

export const AuthOnly = () => {
    const User = useContext(UserContext);
    return (User.userData.logged ? <Outlet /> : <Navigate to="/login" />)
}