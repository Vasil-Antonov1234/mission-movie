import { Route, Routes } from "react-router"
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import AllMovies from "./components/catalog/AllMovies"
import AllReviews from "./components/catalog/AllReviews"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog/movies" element={<AllMovies />} />
                <Route path="/catalog/reviews" element={<AllReviews />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
