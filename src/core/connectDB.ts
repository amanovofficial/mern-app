import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import config from "../config";
const { MONGO_URI } = config

export default (): Promise<void> => {
    return new Promise(async (resolve) => {
        try {
            const conn = await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}` )
            resolve()
        } catch (error) {
            console.log(error);
            process.exit(1)
        }
    })
}



// export default (): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false
//         }
//         ).then(() => {
//             console.log(`MongoDB connected...`);
//             resolve()
//         }).catch((error) => {
//             reject(error)
//         })
//     })
// }