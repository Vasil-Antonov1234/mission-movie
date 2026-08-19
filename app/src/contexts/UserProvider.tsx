import type { User, UserCtx } from "../types/types";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import UserContext from "./UserContext";
import { usePersistedState } from "../hooks/usePersistedState";
import { errorMessageHandler } from "../utils/errorUtil";

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = usePersistedState({});
    const navigate = useNavigate();
    const { request } = useFetch()

    function loginHandler(user: User) {
        setUser(user);
        localStorage.setItem("auth", JSON.stringify(user));
        navigate("/");
    };

    async function logoutHandler(navigateTo?: string) {
        try {
            
            await request("/users/logout", "GET", { accessToken: user.accessToken });
        } catch (error) {
            errorMessageHandler(error);
        } finally {
            setUser({});
            localStorage.removeItem("auth");

            if (navigateTo && typeof(navigateTo) === "string") {
                navigate(navigateTo);
            } else {
                navigate("/");
            };
        };
        
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