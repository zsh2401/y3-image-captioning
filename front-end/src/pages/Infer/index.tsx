import { Button, Divider, Empty, Tag } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import css from "./index.module.scss"
import ButtonGroup from "antd/es/button/button-group"
import { selectFiles } from "sz-react-support"
import { Caption, infer } from "../../apis/infer"
import { file2base64, hSize } from "../../utils/file2base64"
import { ArrowRightOutlined, CheckCircleTwoTone, DeleteOutlined, FileAddOutlined, RedoOutlined, SmallDashOutlined, SyncOutlined } from "@ant-design/icons"
import { v4 } from "uuid"
interface Task {
    id: string
    loading: boolean
    file: File
    captions?: Caption[]
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
        const newTasks: Task[] = files.map((file) => {
            return {
                file,
                loading: false,
                id: v4()
            }
        })
        setTasks([...tasks, ...newTasks])
    }, [setTasks, tasks])


    const onClickInfer = useCallback(async () => {
        setLoading(true)

        const newTasks: Task[] = []
        try {
            for (const task of tasks) {
                if (!task.captions) {
                    task.loading = true
                    newTasks.push(task)
                }

            }
            setTasks([...tasks])
            // console.log("click")
            const result = await infer(newTasks.map(task => task.file), "y3")

            for (let i = 0; i < result.captions.length; i++) {
                newTasks[i].captions = result.captions[i]
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

    const onClickReinfer = useCallback(async () => {
        for (const task of tasks) {
            task.captions = void 0
        }
        setTasks([...tasks])
        onClickInfer()
    }, [onClickInfer, tasks, setTasks])

    const hasNewTasks = useMemo(() => {
        for (const task of tasks) {
            if (task.captions === void 0) {
                return true;
            }
        }
        return false;
    }, [tasks])

    return <div className={css.inferWrapper}>
        {/* <SyncOutlined style={{padding:"0px",margin:"0px"}} spin /> */}
        <div className={css.toolBar}>
            <Button icon={<FileAddOutlined />} onClick={onClickAddTasks}>添加图片</Button>
            <div>
                <ButtonGroup>
                    <Button icon={<ArrowRightOutlined />} loading={loading} disabled={tasks.length === 0 || !hasNewTasks} type="primary" onClick={onClickInfer}>执行标注任务</Button>
                    <Button icon={<RedoOutlined />} loading={loading} disabled={tasks.length === 0} onClick={onClickReinfer}>重新标注全部</Button>

                </ButtonGroup>
                <Divider type="vertical" />
                <Button icon={<DeleteOutlined />} disabled={tasks.length === 0 || loading} danger onClick={onClickClear}>清空任务</Button>
            </div>
        </div>


        {
            tasks.length > 0 ?
                <div className={css.tasks}>
                    {
                        tasks.map((task) => <Image key={task.id} {...task} />)
                    }
                </div> :
                <Empty style={{ marginTop: "16px" }} description="暂无推理任务" />
        }
    </div>
}

export function TaskStatus(props: Task) {
    if (props.loading) {
        return <span>
            <SyncOutlined spin />
            <span className={css.statusText}>
                正在标注
            </span>
        </span>
    } else if (props.captions) {
        return <span>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            <span className={css.statusText}>
                标注完成
            </span>

        </span>
    } else {
        return <span>
            <SmallDashOutlined/>
            <span className={css.statusText}>
                等待开始
            </span>
        </span>
    }
}
export function TaskCaptions(props: { captions?: Caption[] }) {
    return <div className={css.captions}>
        {props.captions ?
            props.captions.map((caps) => {
                return <div>
                    <div style={{ margin: "4px 0px 4px 0px" }}>
                        <Tag color="green">英文</Tag>{caps.source}
                    </div>
                    <div>
                        <Tag color="blue">中文</Tag>{caps.chn}
                    </div>
                </div>
            }) :
            <div className={css.noTask}>请开始任务</div>
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
        <div className={css.fileName}>
            {props.file.name}
        </div>
        <div className={css.imgContainer}>
            {src &&
                <img src={src}></img>
            }
        </div>
        <div className={css.info}>
            <div className={css.meta}>
                {hSize(props.file.size)}
                {/* <Divider type="vertical"/> */}
                <TaskStatus {...props} />
            </div>


            <TaskCaptions captions={props.captions} />
        </div>
    </div>
}

