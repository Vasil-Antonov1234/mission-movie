import { createContext } from "react";
import type { UserCtx } from "../types/types";

const UserContext = createContext<UserCtx>({
    user: {
        id: -1,
        accessToken: "",
        firstName: "",
        lastName: "",
        email: "",
        isGoogleUser: undefined,
        createdAt: "",
        role: "USER",
        avatarUrl: "",
        theme: "DARK"
    },
    onLogin() {},
    onLogout() {},
    isAuthenticated: false,
    isAdmin: false,
    onUpdateCtxUser() {},
    isDarkTheme: true,
    onChangeTheme() {},
});

export default UserContext;