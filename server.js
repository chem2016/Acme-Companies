const db = require('./db');
const { Company } = db.models;
const express = require('express');
const app = express();

const port = process.env.port || 3000

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

app.post('/api/companies/:id',(req, res, next)=>{
    Company.createFake()
        .then( company => res.send(company))
        .catch(next)
})


db.syncAndSeed()
    .then(()=>{
        app.listen(port, ()=>{ console.log(`listening on port ${port}`)})
    })