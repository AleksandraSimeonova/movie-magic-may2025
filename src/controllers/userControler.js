import { Router } from "express";
import userService from "../service/userService.js";
import cookieParser from "cookie-parser";
import { getErrorMessage } from "../utils/errorUtils.js";

const userController = Router();


userController.get('/register', (req,res) => {
    res.render('user/register')
})

userController.post('/register', async(req,res) => {
    const {email, password, rePassword} = req.body;
    try{
     // Register user
    const token = await userService.register({ email, password, rePassword })
    // Set auth cookie
    res.cookie('auth', token);
    res.redirect('/');
     } catch (err) {
        res.render('user/register', { error: getErrorMessage(err) , email});
    }
    
});

userController.get('/login', (req,res) => {

    res.render('user/login');
    
});

userController.post('/login', async (req,res) => {

    const {email, password} = req.body;
    
    try{
    const token = await userService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/'); 
      } catch (err) {
        res.render('user/login', { error: getErrorMessage(err), email });
    }

});

userController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    // TODO: Invalidate token

    res.redirect('/');
});


export default userController