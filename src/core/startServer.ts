import MongoStart from "./connectDB";
import config from "../config";
const { PORT } = config
async function startServer(app: any): Promise<void> {
    try {
        await MongoStart()
        app.listen(PORT, () => console.log('Server has been started on port ', PORT))
    } catch (error) {
        console.log(error.message);
    }
}

export default startServer