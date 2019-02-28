const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL);

const faker = require('faker')

const Company = conn.define('company',{
    name: Sequelize.STRING,
});

const companyNames = ( count = 5 ) =>{
    _names = [];
    while(_names.length < count ){
        _names.push({name: faker.company.companyName()})
    }
    return _names;
}
// use Company.create? 
Company.createFake = function(){
    this.create({name: faker.company.companyName()});
}

const syncAndSeed = () =>{
    return conn.sync({foce: true})
        .then(()=>companyNames())
        // .then(names => console.log(names))
        .then((companies)=>{Promise.all(companies.map((company)=>{
            return Company.create(company)
        }))})
        .then(()=>Company.createFake())
};

module.exports = {
    syncAndSeed,
    models: {
        Company
    }
}



