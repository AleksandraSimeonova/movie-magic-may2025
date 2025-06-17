import { Router } from "express";

const userController = Router();


userController.get('/register', (req,res) => {
    res.render('user/register')
})

userController.post('/register', (req,res) => {
    const {email, password, rePassword} = req.body;

    console.log(email);

    res.redirect('/')
    
})

export default userController