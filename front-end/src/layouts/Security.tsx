import { IStdProps } from "sz-react-support"
import { useAuthState } from "../hooks/useAuthState"
import { Link } from "react-router-dom"
export function Security(props: IStdProps) {
    const [s,] = useAuthState()
    if (s) {
        return props.children
    } else {
        return <div>Not auth
            <Link to="/login">注册</Link>
        </div>
    }
}