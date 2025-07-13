import { GenerateImagesResponse } from '@google/genai'
import { conciserService, imageGenService, charImageGenService } from '../services/index.js'
import {
    createBookData,
    checkIfBookExists,
    updateBookData,
} from '../utils/book.helper.js'

async function appController(req) {
    // TODO:
    // assuming book name.
    const bookName = 'Something'

    const bookId = req?.body?.bookId

    const userInputText = req?.body?.userText
    const concisedTextObj = await conciserService.conciseThisText(userInputText)
    console.log('[LOG]: concisedTextObj> ')
    console.log(concisedTextObj)
    const imagePathObj = {
        imagePath: await imageGenService.getImagePath(concisedTextObj),
    }


    const book = await getBookDataOrCreateBookData(
        bookId,
        bookName,
        concisedTextObj
    )

    const result = {
        ...book,
        ...imagePathObj,
    }

    return {
        result,
    }
}

async function getBookDataOrCreateBookData(bookId, bookName, concisedTextObj) {
    const ifBookExists = await checkIfBookExists(bookId)
    const characterList = await generateCharacterImage(concisedTextObj.characterList)

    if (!ifBookExists) {
        const book = await createBookData(
            bookId,
            bookName,
            concisedTextObj.story,
            characterList
        )
        return book
    } else {
        const book = await updateBookData(
            bookId,
            concisedTextObj.story,
            characterList
        )
        return book
    }
}

async function generateCharacterImage(characterList) {
    for (const character of characterList) {
        if (character['imageUrl']) {
            continue
        }

        character['imageUrl'] = await charImageGenService.getImagePath(character['personName'], character['personDescription'])
    }

    return characterList
}

export default appController
