import { Button, Empty } from "antd"
import { useCallback, useEffect, useState } from "react"
import css from "./index.module.scss"
import ButtonGroup from "antd/es/button/button-group"
import { selectFiles } from "sz-react-support"
import { infer } from "../../apis/infer"
import { file2base64 } from "../../utils/file2base64"
import { FileAddOutlined } from "@ant-design/icons"
interface Task {
    loading: boolean
    file: File
    captions?: string[]
}
export function Infer() {
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState<Task[]>([])
    const onClickClear = useCallback(() => {
        setTasks([])
    }, [setTasks])
    const onClickAddTasks = useCallback(async () => {
        const fileList = await selectFiles({
            multiple: true,
            accept: "image/*"
        })
        const files = [...fileList]
        const newTasks = files.map((file) => {
            return {
                file,
                loading: false,
            }
        })
        setTasks([...tasks, ...newTasks])
    }, [setTasks, tasks])

    const onClickInfer = useCallback(async () => {
        setLoading(true)

        const newTasks = []
        try {
            for (const task of tasks) {
                if (!task.captions) {
                    task.loading = true
                    newTasks.push(task)
                }

            }
            setTasks([...tasks])
            console.log("click")
            const result = await infer(newTasks.map(task => task.file), "y3")

            for (let i = 0; i < result.captions.length; i++) {
                newTasks[i] = result.captions[i]
            }
            setTasks([...tasks])
        } catch (err) {
            //todo
        } finally {
            setLoading(false)
            tasks.forEach(task => task.loading = false)
            setTasks([...tasks])
        }
    }, [setLoading, tasks])
    return <div className={css.inferWrapper}>
        <div className={css.toolBar}>
            <Button icon={<FileAddOutlined />} onClick={onClickAddTasks}>添加图片</Button>
            <ButtonGroup>
                <Button loading={loading} disabled={tasks.length === 0} type="primary" onClick={onClickInfer}>执行标注任务</Button>
                {/* <Button loading={loading} disabled={tasks.length === 0} type="primary" onClick={onClickInfer}>全部重新执行</Button> */}
                <Button loading={loading} disabled={tasks.length === 0} danger onClick={onClickClear}>清空任务</Button>
            </ButtonGroup>
        </div>


        {
            tasks.length > 0 ?
                <div className={css.tasks}>
                    {
                        tasks.map((task) => <Image {...task} />)
                    }
                </div> :
                <Empty style={{ marginTop: "16px" }} description="暂无推理任务" />
        }




    </div>
}

export function Image(props: Task) {
    const [src, setSrc] = useState<string>()
    useEffect(() => {
        (async () => {
            setSrc(await file2base64(props.file))
        })()
    }, [props.file])
    return <div className={css.task}>
        {src &&
            <img src={src}></img>
        }
        {props.captions ?
            <div className={css.caption}>
                {props.captions[0]}
            </div> :
            <div className={css.prepared}>暂未推理</div>
        }
    </div>
}
