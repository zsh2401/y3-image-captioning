import { must } from "./support"

export interface Caption {
    chn: string
    source: string
}
export interface InferResult {
    captions: Caption[][]
    method: string
}
export async function infer(files: File[], method: "y3" = "y3"): Promise<InferResult> {
    const form = new FormData()
    files.forEach((file) => {
        form.append("images", file)
    })
    form.append("method", method)
    return must(await fetch("/api/infer", {
        method: "POST",
        body: form
    }))
}