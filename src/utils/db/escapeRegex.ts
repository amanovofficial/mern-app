export default function (text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}