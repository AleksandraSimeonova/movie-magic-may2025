import express from 'express';
import handlebars from 'express-handlebars'

const app = express();

app.use(express.static('./src/public'))

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.set('views', './src/views')



app.get('/', (req,res)=> {
    res.render('home', {layout:false})
})

app.get('/about', (req,res)=> {
    res.render('about', {layout:false})
})


app.listen(5000, ()=>{console.log('Server is listening on port "http://localhost:5000"');
})