import { useMemo } from 'react';
import css from "./nav-menu.module.scss"
import { useNavigate } from 'react-router-dom';
interface Nav {
    path: string
    label: string
}
export function NavMenu() {
    const navs = useMemo<Nav[]>(() => [
        { path: "/", label: "主页" },
        { path: "/infer", label: "推理" },
        { path: "/about", label: "关于" },
    ], [])
    const navigate = useNavigate()
    return <div className={css.navMenu}>
        {navs.map((nav) => <div className={css.item} onClick={() => navigate(nav.path)}>
            <div className={css.text} >
                {nav.label}
            </div>
        </div>)}
    </div>
}