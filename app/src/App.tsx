import { Route, Routes } from "react-router"
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import AllMovies from "./components/catalog/AllMovies"
import AllReviews from "./components/catalog/AllReviews"
import MovieDetail from "./components/detail/MovieDetail"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog/movies" element={<AllMovies />} />
                <Route path="/catalog/reviews" element={<AllReviews />} />
                <Route path="/catalog/:movieId/details" element={<MovieDetail />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
