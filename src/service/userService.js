import bcrypt from "bcrypt";
import User from "../models/User.js";
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from "../config/general.js";



export default {

    register(userData) {
        return User.create(userData)
    },
    async login(email, password){

       const user = await User.findOne({email});

       if(!user){
        return new Error(`No such user!`)
       };

       const isValid = await bcrypt.compare(password, user.password);

       if(!isValid){
         return new Error('Not valid pass')
        };

       const payload = {
        id:user.id,
        email: user.email,
       };

       const token = jsonwebtoken.sign(payload, jwtSecret, {expiresIn: '2h'});

       
       return token



    },
}