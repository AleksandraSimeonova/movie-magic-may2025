import { Router } from 'express';
import castService from '../service/castService.js';

const castController = Router();

castController.get('/create', (req,res) =>{
    res.render('casts/create')
});

castController.post('/create',async (req,res) =>{
    
    const castData = req.body

    await castService.create(castData);

    res.redirect('/')
})

export default castController