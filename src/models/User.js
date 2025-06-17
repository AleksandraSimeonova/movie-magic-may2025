import{ Schema, model}  from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const User = model('User', userSchema);

export default User