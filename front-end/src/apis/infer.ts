import { must } from "./support"

export interface InferResult {
    caption: string
    method: string
}
export async function infer(file: File, method: "y3" = "y3"): Promise<InferResult> {
    const form = new FormData()
    form.append("image", file)
    form.append("method", method)
    return must(await fetch("/api/infer", {
        headers: {
            "Content-Type": "form-data",
        },
        body: form
    }))
}