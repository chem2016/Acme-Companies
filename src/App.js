import React, { Component } from 'react';  // has component, it needs states, function component and class component, when state change, react will react
import axios from 'axios' // a promise-based HTTP client
import List from './List'


class App extends Component{
    constructor(){
        super();
        console.log('here');
        this.state = {
            companies: []
        };
        this.create = this.create.bind(this);
        this.destroy = this.destroy.bind(this);
    }
    // a life cycle method:
    componentDidMount(){
        axios.get('/api/companies')
            .then(response=>response.data)
            //.then(companies => console.log(`Herererere ${companies}`))
            .then(companies => this.setState({companies}))
            .then(()=>{console.log(this.state.companies)})

    }
    create(){
        axios.post('/api/companies')
            .then(response => response.data)
            .then( company => {
                const companies = this.state.companies;
                companies.push(company)
                this.setState({companies})
            })
    }
    destroy(id){
        axios.delete(`api/companies/${id}`)
            .then( () => {
                let companies = this.state.companies;
                companies = companies.filter(company => company.id !== id)
                this.setState({companies})


            })
    }
    render(){
        const {create, destroy} = this;
        return (
            <div>
                <h1>Acme companies</h1>
                <button>+</button>
                <List companies={ this.state.companies } destroy = {destroy}/>
            </div>
        );
    }
}

export default App;