import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

const data = [
  {title: 'Frankenstein', author: 'Mary Shelley'},
  {title: 'The Stranger', author: 'Albert Camus'},
  {title: 'Catch 22', author: 'Joseph Heller'}
];

ReactDOM.render(
  <App books={data}/>,
  document.getElementById('app')
);
