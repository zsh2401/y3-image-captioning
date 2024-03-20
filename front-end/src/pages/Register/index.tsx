import { Button, Divider, Form, Input } from "antd"
import { register } from "../../apis/auth"
import { useCallback } from "react"
import { useAuthState } from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { sleep } from "sz-react-support";
import css from "./index.module.scss"
import { APP_CHN_NAME } from "../../constants";

type FormStructure = {
    username?: string;
    password?: string;
    passwordAgain?: string
};
export function Register() {

    const navigate = useNavigate()
    const [, setAuth] = useAuthState()

    const onFinish = useCallback(async (values: FormStructure) => {
        if (!values.username || !values.password) {
            return
        }
        const authInfo = await register(values.username, values.password)
        setAuth(authInfo)
        sleep(500).then(() => {
            navigate("/infer")
        })
    }, [setAuth, navigate])

    const onFinishFailed = useCallback(() => {

    }, [])

    return <div className={css.registerWrapper}>
        <h1 className={css.title}>注册到 {APP_CHN_NAME}</h1>
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
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    立刻注册
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => {
                    navigate("/login")
                }}>
                    前往登录
                </Button>
            </Form.Item>
        </Form>
    </div>
}