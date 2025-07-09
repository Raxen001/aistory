import dotenv from 'dotenv'
dotenv.config()

const config = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    FLASH_API_KEY: process.env.FLASH_API_KEY,
    RESPOSNE_MODELS: 'gemini-2.0-flash',
    IMAGE_MODEL: 'gemini-2.0-flash-preview-image-generation',
    MONGODB_URI: process.env.MONGODB_URI,
}

export default config
