import express from 'express';
import movieService from '../service/movieService.js';
import { v4 as uuid } from 'uuid';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    //Save movie
    await movieService.create(newMovie);
    //redirect
    res.redirect('/');

})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    res.render('movie/details', { movie });
})

movieController.get('/search', async (req, res) => {
    //Get query 
    const filter = req.query
    console.log(filter);

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/attach', async (req, res) => {
    
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId)

    res.render('movie/attach', {movie})
})


export default movieController