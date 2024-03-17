import lf from "localforage"

import { AuthInfo } from "./auth"
export interface Result<D> {
    code: number
    data: D
    message: string | null
}

export async function getAccessToken() {
    const r = await lf.getItem<AuthInfo>("auth")
    if (r) {
        return r.accessToken
    } else {
        return ""
    }
}

export async function must<D>(resp: Response): Promise<D> {
    if (resp.status !== 200) {
        throw new Error("错误")
    }
    const json = await resp.json()
    if (json.code === 0) {
        return json.data as D
    } else if (json.message) {
        throw new Error(json.message)
    } else {
        throw new Error("Unknown error")
    }
}