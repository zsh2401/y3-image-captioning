import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate()
    return <div style={{ textAlign: "center" }}>
        <h1 style={{ marginTop: "10vh", fontSize: "50px" }}>
            404 NOT FOUND
        </h1>
        <Button danger style={{ marginTop: "10px" }} onClick={() => navigate("/")}>
            返回主页
        </Button>
    </div>
}