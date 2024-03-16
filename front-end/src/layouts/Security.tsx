import { IStdProps } from "sz-react-support"
import { useAuthState } from "../hooks/useAuthState"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { stillAlive } from "../apis/auth"
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

    if (s) {
        return props.children
    } else {
        return <div>Not auth
            <Link to="/login">注册</Link>
        </div>
    }
}