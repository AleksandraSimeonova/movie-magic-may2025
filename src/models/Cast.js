import { Schema, model } from 'mongoose'

const validCharactersPattern = /^[a-zA-Z0-9 ]+$/;

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLengh: [5, 'Name is too short!'],
        validate: [validCharactersPattern, 'Only engilsh letters, digits and whitespace are allowed!'],
    },
    age: {
        type: Number,
        required: true,
          min: [1, 'Age should be at least 1 years old'],
        max: [120, 'Age should be less than 120 years old'],
    },
    born: { 
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        ///validate: [/^https?:\/\//, 'Invalid Image URL!'],
        required: true,
        
    }
});

const Cast = model('Cast', castSchema);

export default Cast;
