import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Outlet } from "react-router";

export default function IsAdmin() {
    const { isAdmin, onLogout } = useContext(UserContext);

    if (!isAdmin) {
        onLogout("/login");
    };

    return <Outlet />;
}