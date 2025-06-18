import {v4 as uuid} from 'uuid';
import Movie from '../models/Movie.js';
import Cast from '../models/Cast.js';

export default {
    async getAll(filter={}){
      let query = Movie.find();

        if (filter.search) {
            query = query.find({ title: { $regex: new RegExp(filter.search, 'i') } })
        }

        if (filter.genre) {
            query = query.find({ genre: filter.genre.toLowerCase() })
        }

        if (filter.year) {
            // query = query.find({ year: filter.year });
            query = query.where('year').equals(filter.year);
        }

        return query;

    },

    create(movieData, userId){
        //add ID
      /// movieData.id = uuid();

      const movie = new Movie(movieData);
      movie.owner = userId;

      // promise
      return movie.save()
    },

    
    async getOne(movieId){
        const movie = await Movie.findById(movieId).populate('casts');
        return movie
    },

    async attach(movieId, castId){
        const movie = await this.getOne(movieId);
        movie.casts.push(castId);
        return movie.save();
    },

    async getCasts(movieId){
        const movie = await this.getOne(movieId);
        console.log(movie.casts);
        const casts = await Cast.find( {_id: {$in: movie.casts}});

        return casts
        
    },
    async delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    }

}