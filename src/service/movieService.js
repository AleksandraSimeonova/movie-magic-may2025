import {v4 as uuid} from 'uuid';
import Movie from '../models/Movie.js';


export default {
    async getAll(filter={}){
        //Copy of the original, to not ruin original ar
        let result = await Movie.find({})
        //if exist filter
        if(filter.search){
        result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()))
        }
        if(filter.genre){
        result = result.filter(movie => movie.genre.toLowerCase() === (filter.genre.toLowerCase()))
        }
        if(filter.year){
        result = result.filter(movie => movie.year === (filter.year))
        }
        return result
    },

    create(movieData){
        //add ID
      /// movieData.id = uuid();

      const movie = new Movie(movieData);

      // promise
      return movie.save()
    },

    
    async getOne(movieId){
        const movie = await Movie.findById(movieId);
        return movie
    },

    async attach(movieId, castId){
        const movie = await this.getOne(movieId);
        movie.casts.push(castId);
        return movie.save();
    }

}