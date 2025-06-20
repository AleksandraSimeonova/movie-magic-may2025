import express from 'express';
import movieService from '../service/movieService.js';
import { v4 as uuid } from 'uuid';
import castService from '../service/castService.js';

import getCategoryOptionsViewData from '../utils/movieUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const movieController = express.Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movie/create', { pageTitle: 'Create' });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;
    try {

        //Save movie
        await movieService.create(newMovie, userId);
        //redirect
        res.redirect('/');
    } catch (err) {
             // Prepare view data
        const categoryOptionsViewData = getCategoryOptionsViewData(newMovie.category);
        res.redirect('movie/create', {
            error: getErrorMessage(err),
            movie: newMovie,
            categoryOptions: categoryOptionsViewData,
        });
    }
})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    // Get current user
    const userId = req.user?.id;

    const movie = await movieService.getOne(movieId);

    const casts = await movieService.getCasts(movieId);

    // Verify if user is owner
    const isOwner = movie.owner?.equals(userId);
 
    res.render('movie/details', { movie, casts, isOwner });
})

movieController.get('/search', async (req, res) => {
    //Get query 
    const filter = req.query
    console.log(filter);

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {

    const movieId = req.params.movieId;

    const casts = await castService.getAll()

    const movie = await movieService.getOne(movieId)

    res.render('movie/attach', { movie, casts })
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {

    const movieId = req.params.movieId;

    const castId = req.body.cast

    await movieService.attach(movieId, castId)

    res.redirect(`/movies/${movieId}/details`) /////movies/${movieId}/details
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    // Get movie Id
    const movieId = req.params.movieId;

    // call service
    await movieService.delete(movieId);

    // return redirect
    res.redirect('/');
});




movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Get movie by id
    const movie = await movieService.getOne(movieId);

    // Get userId
    const userId = req.user?.id;

    // check if owner
    const isOwner = movie.owner?.equals(userId);

     if (!isOwner) {
        return res.render('404', { error: 'You don\' have access to edit this movie' });
       /// return res.dataRedirect('/404', { error: 'You don\' have access to edit this movie' });
    }


    const categoryOptionsViewData = getCategoryOptionsViewData(movie.category);

    res.render('movie/edit', { movie, categoryOptions: categoryOptionsViewData, pageTitle: 'Edit' })

});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Get updated movie data
    const movieData = req.body;

    // Get userId
    // const userId = req.user?.id;
    // TODO: Check if owner

    // Update movie
    await movieService.update(movieId, movieData);

    // Redirect to movie details page
    res.redirect(`/movies/${movieId}/details`);
});

export default movieController