import dotenv from 'dotenv'
dotenv.config()

const config = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    FLASH_API_KEY: process.env.FLASH_API_KEY,
    RESPOSNE_MODELS: 'gemini-2.0-flash',
    IMAGE_MODEL: 'gemini-2.0-flash-preview-image-generation',
    MONGODB_URI: process.env.MONGODB_URI,
    R2_ACCESS_KEY_ID:process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY:process.env.R2_SECRET_ACCESS_KEY,
    R2_ENDPOINT:process.env.R2_ENDPOINT,
    R2_BUCKET:process.env.R2_BUCKET
}

export default config
