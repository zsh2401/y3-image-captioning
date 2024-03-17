import css from "./navbar.module.scss"
import { APP_CHN_NAME } from "../../constants"
import { useAuthState } from "../../hooks/useAuthState"
import { Avatar, Button, Popover } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import ButtonGroup from "antd/es/button/button-group"
import { useDarkMode } from "sz-react-support"
import { Switch } from "antd";
import {NavMenu} from "./NavMenu"
export function NavBar() {
    const [auth, setAuth] = useAuthState()

    const navigate = useNavigate()
    const logout = useCallback(() => {
        setAuth(null)
        navigate("/login")
    }, [setAuth, navigate])

    const content = <Button danger onClick={logout}>登出</Button>
    return <div className={css.navBar}>

        <div className={css.brand} onClick={() => navigate("/")}>
            {APP_CHN_NAME}
        </div>

        <div className={css.right}>
           <NavMenu/>
            {
                auth ?
                    <Popover content={content} trigger="click">
                        <div className={css.user}>
                            <Avatar>{auth.username[0]}</Avatar>
                            <div className={css.name}>{auth.username}</div>
                        </div>
                    </Popover>
                    :
                    <div className={css.notLoginArea}>
                        <ButtonGroup >
                            <Button onClick={() => navigate("/register")} type="primary">注册</Button>
                            <Button onClick={() => navigate("/login")}>登录</Button>
                        </ButtonGroup>
                    </div>
            }

            <div style={{ margin:"auto 0px auto 16px" }}>
                <DarkSwitch />
            </div>

        </div>
    </div>
}
export function UserMenu() {

}


export function DarkSwitch() {
    const [dark, setDark] = useDarkMode()
    return <Switch
        onChange={setDark}
        checkedChildren="🌛"
        unCheckedChildren="🌞"
        checked={dark} ></Switch>
}