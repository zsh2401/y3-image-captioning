import { IStdProps } from "sz-react-support";
import css from "./index.module.scss"
import { NavBar } from "./NavBar"
import "../../themes/light.scss"
import "../../themes/dark.scss"
import { useDarkMode } from "sz-react-support";

import { ConfigProvider, theme } from "antd";
export function AppLayout(props: IStdProps) {
    const [darkMode,] = useDarkMode()
    console.log(darkMode)
    return <ConfigProvider
        theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
        <div className={css.appLayout + " " + (darkMode ? "app-dark" : "app-light")}>
            <NavBar />
            <div className={css.body}>
                {props.children}
            </div>
            <div className={css.footer}>
                - Zhao Mengmeng & Seymour Zhang -
                <br />
                Mar 17, 2024
            </div>
        </div>
    </ConfigProvider>

}