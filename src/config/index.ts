export default {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/yourhome',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'SOME_SECRET_KEY'
}