export interface AuthInfo {
    accessToken: string
    userName: string
}

export function login(userName: string, password: string): Promise<AuthInfo> {
    throw new Error()
}
export function register(userName: string, password: string): Promise<AuthInfo> {
    throw new Error()
}