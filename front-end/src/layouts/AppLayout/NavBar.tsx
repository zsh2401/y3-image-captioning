import css from "./navbar.module.scss"
import { APP_CHN_NAME } from "../../constants"
import { useAuthState } from "../../hooks/useAuthState"
export function NavBar() {
    const [auth] = useAuthState()
    return <div className={css.navBar}>
        <div className={css.brand}>
            {APP_CHN_NAME}
        </div>
        <div>
            {
                auth ?
                    <div>ABC</div> :
                    <div>NOT LOGIN</div>
            }
        </div>
    </div>
}