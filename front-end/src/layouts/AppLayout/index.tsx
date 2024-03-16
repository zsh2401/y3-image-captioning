import { IStdProps } from "sz-react-support";
import css from "./index.module.scss"
import { NavBar } from "./NavBar"
import "../../themes/light.scss"
import "../../themes/dark.scss"
import { useState } from "react";

export function AppLayout(props: IStdProps) {
    const [darkMode, setDarkMode] = useState(false)
    return <div className={css.appLayout + " " +(darkMode ? "app-dark" : "app-light")}>
        <NavBar />
        {props.children}
    </div>
}