import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./pages/Register"
import { Home } from "./pages/Home"
import { Infer } from "./pages/Infer"
import { Security } from "./layouts/Security"
export function Router() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Register />}></Route>
            <Route path="/infer" element={<Security>
                <Infer />
            </Security>}></Route>
        </Routes>
    </BrowserRouter>
}