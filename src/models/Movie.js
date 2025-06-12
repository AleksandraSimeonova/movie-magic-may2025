import {Schema, model} from 'mongoose'

const movieSchema = new Schema({
    title: {
        type: String,
    }, 
    category: {
        type: String,
       
    },
    genre: {
        type: String,
       
       
    },
    director: {
        type: String,
       
    },
    year: {
        type: Number,
       
       
    },
    imageUrl: {
        type: String,
        
    },
    rating: {
        type: Number,
       
    },
    description: {
        type: String,
        
    }
});

const Movie = model('Movie', movieSchema);

export default Movie