import css from "./navbar.module.scss"
import { APP_CHN_NAME } from "../../constants"
import { useAuthState } from "../../hooks/useAuthState"
import { Button, Popover } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
export function NavBar() {
    const [auth, setAuth] = useAuthState()

    const navigate = useNavigate()
    const logout = useCallback(() => {
        setAuth(null)
        navigate("/login")
    }, [setAuth, navigate])

    const content = <Button danger onClick={logout}>登出</Button>
    return <div className={css.navBar}>

        <div className={css.brand}>
            {APP_CHN_NAME}
        </div>

        <div className={css.right}>
            <div className={css.menu}>
                ABC
            </div>
            {
                auth ?
                    <Popover content={content} trigger="click">
                        <div className={css.user}>

                            <div>{auth.username}</div>
                        </div>
                    </Popover>
                    :
                    <div>NOT LOGIN</div>
            }

        </div>
    </div>
}
export function UserMenu() {

}