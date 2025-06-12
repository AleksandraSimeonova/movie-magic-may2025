import express from 'express';
import movieService from '../service/movieService.js';
import {v4 as uuid} from 'uuid';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;
    //Save movie
    movieService.create(newMovie);
    //redirect
    res.redirect('/');
    res.end();

})

movieController.get('/:movieId/details', (req,res) => {
    const movieId = req.params.movieId;

    const movie = movieService.getOne(movieId);

    res.render('details', { movie });
})

movieController.get('/search', (req, res) => {
    //Get query 
    const filter = req.query
    console.log(filter);
    
    const movies = movieService.getAll(filter);

    res.render('search', {movies, filter});
});



export default movieController