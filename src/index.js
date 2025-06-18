import express from 'express';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js';
import userController from './controllers/userControler.js';
import cookieParser from 'cookie-parser';

const app = express();

//Middlewares
app.use(express.static('./src/public'));
//for saving details
app.use(express.urlencoded());
//set cookie parser
app.use(cookieParser());

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating(rating){
            return '&#x2605;'.repeat(Math.floor(rating))
        }
    },
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    }
}))


try{
    mongoose.connect('mongodb://localhost:27017', {dbName: 'magic-movies-may2025'})
    console.log('Connected to DB');
    
}catch(err){
    console.log('Can not connect to DB');
    console.log(err);

}


app.set('view engine', 'hbs')
// ? 
app.set('views', './src/views')

app.use(homeController);
app.use('/movies', movieController);
app.use('/casts', castController);
app.use('/users', userController);
app.all('*url', (req,res)=> {

    res.render('404');
})


app.listen(5000, ()=>{console.log('Server is listening on port "http://localhost:5000"');
})