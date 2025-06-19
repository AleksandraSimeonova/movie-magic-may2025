import{ Schema, model}  from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'Password is required'],
        unique: true,
        validate: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Ivalid email format!'],
        minLength:[10, 'Email shoud be at least 10 characters long!']
    },
    password: {
        type: String,
        require: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric!'],
        minLength:[6, 'Password shoud be at least 6 characters long!']
    },
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.virtual('rePassword')
.set(function(value){
    if(this.password !== value){
        throw new Error('Password missmatch!')
    }
})

const User = model('User', userSchema);

export default User