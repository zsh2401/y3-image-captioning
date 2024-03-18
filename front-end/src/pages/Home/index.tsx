import { APP_CHN_NAME } from "../../constants";
import css from "./index.module.scss"
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuthState } from "../../hooks/useAuthState";
import { TypeAnimation } from "react-type-animation"
export function Home() {
    const navigate = useNavigate()
    const [auth] = useAuthState()
    const go = useCallback(() => {
        if (auth) {
            navigate("/infer")
        } else {
            navigate("/login")
        }
    }, [auth, navigate])
    return <div className={css.home}>
        <div className={css.header}>
        <h1 className={css.title}>{APP_CHN_NAME}</h1>
        </div>
        
        <p className={css.slogan}>
            <TypeAnimation
                speed={10}
                // repeat="
                repeat={Infinity}
                deletionSpeed={1}
                sequence={[
                    "这张图片中，有一朵被雪覆盖的花朵",
                    3000,
                    "这张图片中，有一群人在海上冲浪",
                    3000,
                    "利用人工智能进行图片标注任务。",
                    3000,
                ]} />
        </p>
        <button className={css.goButton} onClick={go}>立刻上手</button>
    </div>
}