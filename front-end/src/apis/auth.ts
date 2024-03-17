import { getAccessToken, must } from "./support"
export interface AuthInfo {
    accessToken: string
    id:number
    username: string
}

export async function login(username: string, password: string): Promise<AuthInfo> {
    return must(await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username, password
        })
    }))
}
export async function register(username: string, password: string): Promise<AuthInfo> {
    return must(await fetch("/api/alive", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username, password
        })
    }))
}
export async function stillAlive(): Promise<boolean> {
    return must(await fetch("/api/alive", {
        headers: {
            "X-Access-Token": await getAccessToken()
        }
    }))
}