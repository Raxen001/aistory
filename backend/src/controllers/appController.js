import { conciserService, imageGenService } from '../services/index.js'
import {
    createBookData,
    checkIfBookExists,
    updateBookData,
} from '../utils/book.helper.js'

async function appController(req) {
    // TODO:
    // assuming it to be here.
    const bookId = req?.body?.bookId
    const bookName = 'Something'
    let book

    const userInputText = req?.body?.userText
    const concisedTextObj = await conciserService.conciseThisText(userInputText)
    const imagePathObj = {
        // imagePath: await imageGenService.getImagePath(concisedTextObj),
        imagePath: 'https://example.com/',
    }

    console.log('[LOG]: concisedTextObj> ')
    console.log(concisedTextObj)

    const ifBookExists = await checkIfBookExists(bookId)
    if (!ifBookExists) {
        book = await createBookData(
            bookId,
            bookName,
            concisedTextObj.story,
            concisedTextObj.characterList
        )
    } else {
        book = await updateBookData(
            bookId,
            concisedTextObj.story,
            concisedTextObj.characterList
        )
        console.log('[LOG]: after' + book)
    }

    const result = {
        ...book,
        ...imagePathObj,
    }

    return {
        result,
    }
}

export default appController
