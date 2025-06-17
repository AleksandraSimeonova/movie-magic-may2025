import { Router } from "express";
import userService from "../service/userService.js";

const userController = Router();


userController.get('/register', (req,res) => {
    res.render('user/register')
})

userController.post('/register', async(req,res) => {
    const userData = req.body;

    // Register user
    await userService.register( userData );

    res.redirect('/user/login');
    
});

userController.get('/login', (req,res) => {

    res.render('user/login');
    
});

userController.post('/login', async (req,res) => {

    const {email, password} = req.body;

    const token = await userService.login({email, password});
    
});


export default userController