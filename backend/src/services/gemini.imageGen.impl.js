import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import * as fs from 'fs'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'
import ImageGeneration from './imageGen.service.js'

//workaround for .env reading , found this in stack overflow , change it if needed.
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

//                  conciser text
// {
//     "characters": [...list of characters in the passage],
//     "setting": "Fantasy or cyberpunk or Current",
//     "time": "approximate time the passage takes place",
//     "story": "sample phrase"
// }

export class ImageGenImpl extends ImageGeneration {
    model
    config
    ai
    constructor(model, config) {
        super()
        const apiKey = process.env.FLASH_API_KEY
        this.model = model
        this.config = config
        this.ai = new GoogleGenAI({ apiKey })
    }
    async generateImage(conciserText) {
        const { characters, setting, time, story } = conciserText
        const prompt = `An illustration of ${characters.join(', ')}. The setting is ${setting}, around ${time}. The story scene: "${story}"` // need to fine tune this further , not generating accurate images.
        const result = await this.ai.models.generateContent({
            // this thing fucks up the image sometimes. and it does nt have the idea who the characters are.. so generates random people.
            model: this.model,
            contents: prompt,
            config: {
                responseModalities: this.config.responseModalities,
            },
        })
        for (const part of result.candidates[0].content.parts) {
            if (part.text) {
                console.log('Text Response:', part.text)
            } else if (part.inlineData) {
                const buffer = Buffer.from(part.inlineData.data, 'base64')
                const tmpDir = path.join('..', 'tmp')
                if (!fs.existsSync(tmpDir)) {
                    fs.mkdirSync(tmpDir, { recursive: true })
                }
                const filePath = path.join(tmpDir, `${uuidv4()}.png`)
                fs.writeFileSync(filePath, buffer)
                console.log('Image saved to:', filePath)
            }
        }
    }

    getImagePath() {
        console.log('the image path is /tmp')
    }
}
