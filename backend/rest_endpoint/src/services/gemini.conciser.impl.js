import config from '../configs/configs.js'
import AIResponseConfig from '../models/aiResponse.model.js'
import Conciser from './conciser.service.js'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY,
})

class Gemini extends Conciser {
    async conciseThisText(userInputText) {
        const response = await ai.models.generateContent({
            model: config.RESPOSNE_MODELS,
            contents: userInputText,
            config: AIResponseConfig,
        })

        return JSON.parse(response.text)
    }
}

export default Gemini
