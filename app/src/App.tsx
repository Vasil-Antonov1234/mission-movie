import { Route, Routes } from "react-router"
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import AllMovies from "./components/catalog/AllMovies"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog/movies" element={<AllMovies />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
