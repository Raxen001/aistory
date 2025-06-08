import { conciserService } from '../services/index.js'

async function appController(req) {
    const userInputText = req?.body?.userText
    const result = await conciserService.conciseThisText(userInputText)

    return {
        result: result,
    }
}

export default appController
