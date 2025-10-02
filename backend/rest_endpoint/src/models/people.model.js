import { mongoose } from 'mongoose'

const personSchema = new mongoose.Schema({
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
    alias: {
        type: Array,
        default: [],
    },
    gender: {
        type: String,
        default: 'Male',
    },
    description: {
        type: String,
        default: '',
    },
})

const person = mongoose.model('Person', personSchema);
export default person;
