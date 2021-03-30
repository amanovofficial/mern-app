export default (req: any): string[] => {
    return req.files.map((item: { filename: string }) => item.filename)
}