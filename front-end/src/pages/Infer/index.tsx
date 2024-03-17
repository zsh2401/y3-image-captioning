import { Button } from "antd"
import { useCallback, useState } from "react"

export function Infer() {
    const [loading, setLoading] = useState(false)
    const onClickInfer = useCallback(() => {
        try {
            setLoading(true)
        } catch (err) {
            //todo
        } finally {
            setLoading(false)
        }
    }, [setLoading])
    return <div>
        <Button type="primary" onClick={onClickInfer}>立刻执行自动标注</Button>
    </div>
}