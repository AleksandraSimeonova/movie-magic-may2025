import { Router } from "express";

const userController = Router();


userController.get('/register', (req,res) => {
    res.send('It is working')
})

export default userController