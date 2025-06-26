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
    description: {
        type: String,
        default: '',
    },
    persons: {
        type: Array,
    },
})

const book = mongoose.model('Book', bookSchema)
export default book
