import bcrypt from "bcrypt";
import User from "../models/User.js"

export default {

    register(userData) {
        return User.create(userData)
    },
    async login(email, password){

       const user = await User.find({email});

       if(!user){
        return new Error(`No such user!`)
       };

       const isValid = await bcrypt.compare(password, user.password);

       if(!isValid){ return new Error('Not valid pass')}


    },
}