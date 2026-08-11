import { createContext } from "react";

const UserContext = createContext({
    id: 0,
    accessToken: "",
    firstName: "",
    lastName: "",
    email: ""
});

export default UserContext;