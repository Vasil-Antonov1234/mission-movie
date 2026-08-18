import { Route, Routes } from "react-router"
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import AllMovies from "./components/catalog/AllMovies"
import AllReviews from "./components/catalog/AllReviews"
import MovieDetail from "./components/detail/MovieDetail"
import Login from "./components/login-register/Login"
import Register from "./components/login-register/Register"
import CreateEditMovie from "./components/create/CreateEditMovie"

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies/catalog" element={<AllMovies />} />
                <Route path="/reviews/catalog" element={<AllReviews />} />
                <Route path="/movies/:movieId/details" element={<MovieDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movies/create" element={<CreateEditMovie />} />
                <Route path="/movies/:movieId/edit" element={<CreateEditMovie />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
