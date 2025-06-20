import express from 'express';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import routes from './routes.js';
import session from 'express-session'

import cookieParser from 'cookie-parser';
import { auth } from './middlewares/authMiddleware.js';


const app = express();

//Middlewares
app.use(express.static('./src/public'));

//for saving details
app.use(express.urlencoded());

//set cookie parser
app.use(cookieParser());

// Add session
app.use(session({
    secret: 'DASKHWIUAHD&WS*(#@(DN&Q#*(Q#H&*(DHGQ&DH#Q&*GD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
}));

//middleware for check cookie auth
app.use(auth);

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

//add routes
app.use(routes)


app.listen(5000, ()=>{console.log('Server is listening on port "http://localhost:5000"');
})