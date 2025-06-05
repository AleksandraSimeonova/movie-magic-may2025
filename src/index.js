import express from 'express';
import handlebars from 'express-handlebars'
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

const app = express();

app.use(express.static('./src/public'));

app.use(express.urlencoded());

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.set('views', './src/views')

app.use(homeController);
app.use('/movies', movieController)


app.listen(5000, ()=>{console.log('Server is listening on port "http://localhost:5000"');
})