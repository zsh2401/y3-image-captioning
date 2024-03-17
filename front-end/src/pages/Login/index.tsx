import { Button, Divider, Form, Input } from "antd"
import { useCallback } from "react";
import { login } from "../../apis/auth";
import { useAuthState } from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { sleep } from "sz-react-support";
import css from "./index.module.scss"
import { APP_CHN_NAME } from "../../constants";
type FormStructure = {
    username?: string;
    password?: string;
};
export function Login() {

    const navigate = useNavigate()
    const [, setAuth] = useAuthState()

    const onFinish = useCallback(async (values: FormStructure) => {
        if (!values.username || !values.password) {
            return
        }
        const authInfo = await login(values.username, values.password)
        setAuth(authInfo)
        sleep(500).then(() => {
            navigate("/infer")
        })
    }, [setAuth, navigate])

    const onFinishFailed = useCallback(() => {

    }, [])


    return <div className={css.login}>
        <h1>登录到{APP_CHN_NAME}</h1>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FormStructure>
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FormStructure>
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => {
                    navigate("/register")
                }}>
                    没有账号？立刻注册
                </Button>
            </Form.Item>
        </Form>
    </div>
}