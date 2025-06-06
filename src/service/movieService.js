import {v4 as uuid} from 'uuid';

const movies = [
    {
        "id": "a3682672-0ee4-1284-8759-35ee253329zv",
        "title": "Jungle Cuise",
        "genre": "Adventure",
        "description": "Dreaming about saving countless lives and having another adventure, the feisty English feminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change the world. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant, wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine Amazon River in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper into the heart of an impenetrable green maze, searching for something that cannot be found, a centuries-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to their ambitious plans.",
        "imageUrl": "/img/jungle-cruise.jpeg",
        "director": "Jaume Collet-Serra",
        "year": "2021",
        "rating": 6.6,
        "category": "movie"
    },
    {
        "id": "z2682672-0ee4-1534-8759-35ee253329ty",
        "title": "Man of Steel",
        "genre": "Superhero",
        "description": "An alien child is evacuated from his dying world and sent to Earth to live among humans. His peace is threatened when other survivors of his home planet invade Earth.",
        "imageUrl": "https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_FMjpg_UX1000_.jpg",
        "director": "Zack Snyder",
        "year": "2013",
        "rating": 7.1,
        "category": "movie"
    },
    {
        "id": "81313c94-08e0-40bf-85bc-1e7cdeebbef9",
        "title": "Avengers: Endgame",
        "category": "movie",
        "genre": "Superhero",
        "director": "Anthony Russo",
        "year": "2019",
        "imageUrl": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
        "rating": 8.4,
        "description": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\" actions and restore balance to the universe."
    }
];

export default {
    getAll(filter={}){
        //Copy of the original, to not ruin original ar
        let result = movies.slice()
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
        movieData.id = uuid();

        movieData.rating = Number(movieData.rating)
        movies.push(movieData)
        return movieData
    },

    
    getOne(movieId){
        const movie = movies.find(movie => movie.id === movieId);
        return movie
    }

}