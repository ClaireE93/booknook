import React from 'react';
import Bookshelf from './Bookshelf';
import Search from './Search';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.fetch();
  }

  handleSearch(title, author) {
    $.ajax({
      url: '/books',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({title, author}),
      success: (data) => {
        console.log('successful AJAX post', data);
        const parsed = JSON.parse(data);
        const newArr = this.state.books.slice();
        newArr.push(parsed);
        this.setState({books: newArr});
      },
      error: (err) => {
        console.log('error in AJAX post', err);
      }
    });
  }

  fetch() {
    $.ajax({
      url: '/books',
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        console.log('successful AJAX GET', data);
        const parsed = JSON.parse(data);
        this.setState({books: parsed});
      },
      error: (err) => {
        console.log('error in AJAX GET', err);
      }
    });
  }

  render() {
    return (
      <div>
        <div className='search'>
          <Search onClick={this.handleSearch}/>
        </div>
        <div className='bookshelf'>
          <Bookshelf books={this.state.books}/>
        </div>
      </div>
    );
  }
}



export default App;
