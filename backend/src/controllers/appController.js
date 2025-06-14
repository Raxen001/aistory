import { conciserService, imageGenService } from '../services/index.js'

async function appController(req) {
    const userInputText = req?.body?.userText
    const concisedTextObj = await conciserService.conciseThisText(userInputText)
    const imagePathObj = {
        imagePath: await imageGenService.getImagePath(concisedTextObj),
    }

    const result = {
        ...concisedTextObj,
        ...imagePathObj,
    }

    return {
        result,
    }
}

export default appController
