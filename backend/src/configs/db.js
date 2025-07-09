import mongoose from 'mongoose'
import config from './configs.js'

const dbCon = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log('[LOG]: MongoDB connected successfully')
    } catch (error) {
        console.error('[ERROR]: MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

export default dbCon
