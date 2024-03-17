import { IStdProps } from "sz-react-support"
import { useAuthState } from "../hooks/useAuthState"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { stillAlive } from "../apis/auth"
import { Button } from "antd"

export function Security(props: IStdProps) {
    const [s, setAuth] = useAuthState()
    useEffect(() => {
        let interrupted = false
        if (s) {
            (async () => {
                const alive = await stillAlive(s.accessToken)
                if (!alive && !interrupted) {
                    setAuth(null)
                }
            })()
        }
        return () => {
            interrupted = true
        }
    }, [s, setAuth])

    const navigate = useNavigate()

    if (s) {
        return props.children
    } else {
        return <div style={{
            textAlign: "center"
        }}><div>
                <h1 style={{ marginTop: "10vh", marginBottom: "5vh" }}>抱歉，该功能需要登录后使用</h1>
                <Button type="primary" size="large" onClick={() => navigate("/login")}>
                    前往登录</Button>
                {/* <Link to="/login"></Link> */}
            </div>
        </div>
    }
}