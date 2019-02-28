//console.log('Hello World')

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const root = document.querySelector('#root')
console.log(root)

// babel-loader: tranlaste files, with this file type I am going to translate this way, with anthoer file type, I am going to translate another way
// webpack is pack thing together. 

ReactDOM.render(<App />, root)