import express from 'express';

const app = express();

app.get('/', (req,res)=> {
    res.send('It works')
})

app.listen(5000, ()=>{console.log('Server is listening on port "http://localhost:5000"');
})