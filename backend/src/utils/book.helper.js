import dbCon from '../configs/db.js'
import Book from '../models/books.model.js'

dbCon()

const projection = { _id: 0, id: 1, name: 1, story: 1, characters: 1 }

async function getBookData(bookId) {
    try {
        const book = await Book.findOne({ id: bookId }, projection).lean()
        console.log('[LOG]: BOOK DATA: ')
        if (!book) {
            throw new Error('Book not found')
        }
        return book
    } catch (error) {
        throw new Error('[ERROR]: getBookData no book found: ' + error.message)
    }
}

async function checkIfBookExists(bookId) {
    try {
        const exists = await Book.exists({ id: bookId })
        return exists
    } catch (error) {
        console.log('[ERROR]: checkIfBookExists function failed. ' + error)
    }
}

async function createBookData(id, bookName, story, characters) {
    const data = {
        id: id,
        name: bookName,
        story: story,
        characters: characters,
    }
    try {
        const newBook = new Book(data)
        newBook.save()

        // Formatting fields is a pain int he ass.
        const book = getBookData(newBook.id)
        return book
    } catch (error) {
        throw new Error('[ERROR]: When Creating document' + error.message)
    }
}

async function deleteBook(id) {
    try {
        const deletedDocument = await Book.findOneAndDelete({ id })
        if (!deletedDocument) {
            throw new Error('Document not found')
        }
        return deletedDocument
    } catch (error) {
        throw new Error('[ERROR]: Deleting document: ' + error.message)
    }
}

async function updateBookData(bookId, newStory, newCharacters) {
    try {
        const oldBook = await getBookData(bookId)
        const filter = { id: bookId }
        const update = {
            story: mergeStory(oldBook.story, newStory),
            characters: mergeCharacters(oldBook.characterList, newCharacters),
        }
        console.log('[LOG]: UpdatedStory: ')
        console.log(update)

        const book = await Book.findOneAndUpdate(filter, update, {
            returnDocument: 'after',
            projection: projection,
        }).lean()

        if (!book) {
            throw new Error('Book not found')
        }

        return book
    } catch (error) {
        throw new Error('[ERROR]: Reading book: ' + error.message)
    }
}

function mergeCharacters(oldCharacters, newCharacters) {
    if (!oldCharacters) {
        return newCharacters
    } else if (!newCharacters) {
        return oldCharacters
    }

    const mergedCharacterList = {
        ...oldCharacters,
        ...newCharacters,
    }

    return mergedCharacterList
}

function mergeStory(oldStory, newStory) {
    if (!oldStory) {
        return newStory
    }
    if (!newStory) {
        return oldStory
    }
    return oldStory + ' ' + newStory
}

export {
    getBookData,
    createBookData,
    deleteBook,
    checkIfBookExists,
    updateBookData,
}
