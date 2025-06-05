import config from '../configs/configs.js'

import Conciser from './conciser.service.js'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY,
})

class Gemini extends Conciser {
    async conciseThisText(userInputText) {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: userInputText,
            config: {
                systemInstruction: 'You are a Text concising maching, you are build to make whatever text input that you are receiving and make it smaller and concise them without losing meaning so i can use you to pass whatever input I get and change it and send it to next LLM or AI model thus reducing Token usage on expensive models. Tone down your lingustic capabilities. Only respond with the concised text',
            },
        })

        return response.text
    }
}

export default Gemini
