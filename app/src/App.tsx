import { Route, Routes } from "react-router"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
        </>
    )
}

export default App
