const db = require('./db');
const { Company } = db.models;
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.port || 3000

// why we need to send these two files? means when you go to these two routes, two files show up. 

app.use('/app.js', (req, res, next)=>res.sendFile(path.join(__dirname, 'dist','main.js')));

app.use('/',(req, res, next)=>res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/companies', (req, res, next)=>{
    Company.findAll()
        .then((companies)=>res.send(companies))
        .catch(next)
});

app.delete('/api/companies/:id',(req, res, next)=>{
    Company.destroy({where: {
        id: res.params.id,
    }})
        .then(()=>res.sendStatus(204))
        .catch(next)
})

app.post('/api/companies/',(req, res, next)=>{
    Company.createFake()
        .then( company => res.send(company))
        .catch(next)
})


db.syncAndSeed()
    .then(()=>{
        app.listen(port, ()=>{ console.log(`listening on port ${port}`)})
    })