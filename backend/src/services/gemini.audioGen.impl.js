import config from '../configs/configs.js'
import audioGen from './audioGen.service.js'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY,
})

class Gemini extends audioGen {
    async GenerateAudio(userInputText) {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: userInputText,
        })

        return response.text
    }
}

export default Gemini
