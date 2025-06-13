import {Schema, model} from 'mongoose'

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
       
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1970,
        max: new Date().getFullYear() + 5       
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLengthL [100, 'Description is too long']
    }
});

const Movie = model('Movie', movieSchema);

export default Movie