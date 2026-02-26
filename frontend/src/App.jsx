// src/App.jsx
import { Routes, Route } from "react-router-dom"
import ContenedorMensajes from "./components/ContenedorMensajes"
import Home from "./pages/Home"
import SearchResults from "./pages/SearchResults"
import ProductCompare from "./pages/ProductCompare.jsx"
import Login from "./pages/Login"
import Lists from "./pages/Lists.jsx"
import Profile from "./pages/Profile"
import Register from "./pages/Register.jsx"
import NotFound from "./pages/NotFound.jsx"

export default function App() {
  return (
    <>
      <ContenedorMensajes />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/search/categoria/:nombre" element={<SearchResults />} />
        <Route path="/search/:texto" element={<SearchResults />} />
        <Route path="/compare/:productId" element={<ProductCompare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
