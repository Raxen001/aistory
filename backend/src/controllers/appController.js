import { conciserService } from '../services/index.js'
import { textToSpeech } from '../services/index.js'

async function appController(req) {
    const userInputText = req?.body?.userText
    const result = await conciserService.conciseThisText(userInputText)
    //just trying out
    const text =
        'It was a CyberPunk future, It was a sunny day, It happened in the morning, They were living nearby a light house at Edinburgh.Elsa walked out of the room looking as grumpy as usual.'
    const resul2 = await textToSpeech.convertThisText(text, 'vasa-test')
    //the audio file will be stored in the backend
    return {
        result: result,
    }
}

export default appController
