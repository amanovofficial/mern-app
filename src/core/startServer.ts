import MongoStart from "./MongoStart";
const PORT = 5000 || process.env.PORT
async function startServer(app:any): Promise<void> {
    try {
        await MongoStart()
        app.listen(PORT, () => console.log('Server has been started on port ', PORT))
    } catch (error) {
        console.log(error.message);
    }
}

export default startServer