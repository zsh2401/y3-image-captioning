import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Infer } from "./pages/Infer"
import { Security } from "./layouts/Security"
import { AppLayout } from "./layouts/AppLayout"
export function Router() {
    return <BrowserRouter>
     <AppLayout>
        <Routes>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/infer" element={<Security>
                <Infer />
            </Security>}></Route>
        </Routes>
        </AppLayout>
    </BrowserRouter>
}