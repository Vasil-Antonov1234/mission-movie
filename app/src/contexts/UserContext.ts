import { createContext } from "react";
import type { UserCtx } from "../types/types";

const UserContext = createContext<UserCtx>({
    user: {
        id: -1,
        accessToken: "",
        firstName: "",
        lastName: "",
        email: "",
    },
    onLogin() {},
    onLogout() {},
    isAuthenticated: false
});

export default UserContext;