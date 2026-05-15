import { Route, Routes } from "react-router"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/AllMovies"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
