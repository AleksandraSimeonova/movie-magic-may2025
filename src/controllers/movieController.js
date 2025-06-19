import express from 'express';
import movieService from '../service/movieService.js';
import { v4 as uuid } from 'uuid';
import castService from '../service/castService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    const userId = req.user?.id;
    //Save movie
    await movieService.create(newMovie, userId);
    //redirect
    res.redirect('/');

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

movieController.get('/:movieId/attach', async (req, res) => {
    
    const movieId = req.params.movieId;

    const casts = await castService.getAll()

    const movie = await movieService.getOne(movieId)

    res.render('movie/attach', {movie, casts})
});

movieController.post('/:movieId/attach', async (req, res) => {
    
    const movieId = req.params.movieId;

    const castId =  req.body.cast

    await movieService.attach(movieId, castId)

    res.redirect(`/movies/${movieId}/details`) /////movies/${movieId}/details
});

movieController.get('/:movieId/delete', async (req, res) => {
    // Get movie Id
    const movieId = req.params.movieId;

    // call service
    await movieService.delete(movieId);

    // return redirect
    res.redirect('/');
});

function getCategoryOptionsViewData(category) {
    const options = [
        { value: 'tv-show', title: 'TV Show' },
        { value: 'animation', title: 'Animation' },
        { value: 'movie', title: 'Movie' },
        { value: 'documentary', title: 'Documentary' },
        { value: 'short-film', title: 'Short Film' },
    ];

    const result = options.map(option => ({ ...option, selected: category === option.value ? 'selected' : '' }));

    return result;
}


movieController.get('/:movieId/edit', async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Get movie by id
    const movie = await movieService.getOne(movieId);

    // Get userId
    const userId = req.user?.id;

    // check if owner
    const isOwner = movie.owner?.equals(userId);

    if (!isOwner) {
        // TODO: Add error handling
        return res.status(403).end();
    }

    const categoryOptionsViewData = getCategoryOptionsViewData(movie.category);

    res.render('movie/edit', {movie, categoryOptions: categoryOptionsViewData, pageTitle: 'Edit'})

});

movieController.post('/:movieId/edit', async (req, res) => {
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