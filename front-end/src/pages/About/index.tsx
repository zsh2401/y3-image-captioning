import { APP_CHN_NAME } from "../../constants";

export function About() {
    return <div style={{ maxWidth: "800px", margin: "20px auto 0px auto" }}>
        <h1>关于 {APP_CHN_NAME} </h1>
        <p>Made for dream.</p>
    </div>
}