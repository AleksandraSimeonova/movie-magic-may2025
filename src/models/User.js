import{ Schema, model}  from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'Password is required'],
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = model('User', userSchema);

export default User