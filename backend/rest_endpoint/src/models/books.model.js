import { mongoose } from 'mongoose'

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        default: '',
    },
    story: {
        type: String,
        default: '',
    },
    characters: {
        type: Array,
    },
})

const book = mongoose.model('Book', bookSchema)
export default book
