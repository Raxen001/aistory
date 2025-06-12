import config from '../configs/configs.js'
import { GoogleGenAI, Modality } from '@google/genai'
import { v4 as uuidv4 } from 'uuid'
import ImageGeneration from './imageGen.service.js'
import fs from 'fs'
import path from 'path'

export class ImageGenImpl extends ImageGeneration {
    ai

    constructor() {
        super()
        const apiKey = config.FLASH_API_KEY
        this.ai = new GoogleGenAI({ apiKey })
    }

    async generateImage(conciserText) {
        const { settings, timeOfDay, location, characters, story } =
            conciserText
        const prompt = `An illustration of ${characters.join(', ')}. The setting is ${location}, around ${timeOfDay}. The story scene: "${story}" in the aesthetics of "${settings}"` // need to fine tune this further , not generating accurate images.
        const result = await this.ai.models.generateContent({
            // venkat: this thing fucks up the image sometimes. and it does nt have the idea who the characters are.. so generates random people.
            // raxen: hallucination ?
            model: config.IMAGE_MODEL,
            contents: prompt,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
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
                console.log(filePath)
                // TODO: need error handling for when it can't write
                fs.writeFileSync(filePath, buffer)

                return filePath
            }
        }
    }

    getImagePath(conciseText) {
        const imagePath = this.generateImage(conciseText)

        if (!fs.existsSync(imagePath)) {
            return 'error.png'
        }

        return imagePath
    }
}
