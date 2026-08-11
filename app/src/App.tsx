import { Route, Routes, useNavigate } from "react-router"
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import AllMovies from "./components/catalog/AllMovies"
import AllReviews from "./components/catalog/AllReviews"
import MovieDetail from "./components/detail/MovieDetail"
import Login from "./components/login-register/Login"
import Register from "./components/login-register/Register"
import { useState } from "react"
import UserContext from "./contexts/UserContext"
import type { User } from "./types/types"

function App() {
    const[user, setUser] = useState<User>({});
    const navigate = useNavigate();

    function loginHandler(user: User) {
        setUser(user);
        localStorage.setItem("auth", JSON.stringify(user));
        navigate("/");
    };

    function logoutHandler() {
        setUser({});
        localStorage.removeItem("auth");
    };

    const isAuthenticated = !!user.accessToken;

    return (
        <UserContext.Provider value={{user, onLogin: loginHandler, onLogout: logoutHandler, isAuthenticated}}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog/movies" element={<AllMovies />} />
                <Route path="/catalog/reviews" element={<AllReviews />} />
                <Route path="/catalog/:movieId/details" element={<MovieDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
        </UserContext.Provider>
    )
}

export default App
