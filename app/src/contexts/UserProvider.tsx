import { useState } from "react";
import type { User, UserCtx } from "../types/types";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import UserContext from "./UserContext";

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>({});
    const navigate = useNavigate();
    const { request } = useFetch()

    function loginHandler(user: User) {
        setUser(user);
        localStorage.setItem("auth", JSON.stringify(user));
        navigate("/");
    };

    async function logoutHandler() {
        await request("/users/logout", "GET", { accessToken: user.accessToken });
        setUser({});
        localStorage.removeItem("auth");
    };

    const isAuthenticated = !!user?.accessToken;

    const userContextValues: UserCtx = {
        user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        isAuthenticated
    }
    
    return (
        <UserContext.Provider value={ userContextValues }>
            { children }
        </UserContext.Provider>
    );
}