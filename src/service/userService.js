import bcrypt from "bcrypt";
import User from "../models/User.js";
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from "../config/general.js";
import { generateAuthToken } from "../utils/authUtils.js";



export default {

    async register(userData) {
        const existingUser = await User.findOne({email: userData.email});
        if(existingUser){
            throw new Error('User already exists.')
        }

        const user = await User.create(userData);
        
        const token = generateAuthToken(user);

        return token;
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

       const token = generateAuthToken(user)
       
       return token

    },
}