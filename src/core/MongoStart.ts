import mongoose from "mongoose";
import keys from "../config/keys.dev";
const { MONGO_URI } = keys
export default (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            mongoose.connect(
                MONGO_URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                }
            )

            console.log('MongoDB connected...');
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}