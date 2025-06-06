import Gemini from '../services/gemini.conciser.service.js'

async function appController(req) {
    const userInputText = req?.body?.userText
    const GeminiAPI = new Gemini()
    const result = await GeminiAPI.conciseThisText(userInputText)
    

    return {
        result: result,
    }
}

export default appController
