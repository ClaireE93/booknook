import React from 'react';
import Bookshelf from './Bookshelf';
import Search from './Search';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(title, author) {
    $.ajax({
      url: '/books',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({title, author}),
      success: (data) => {
        console.log('successful AJAX post', data);
      },
      error: (err) => {
        console.log('error in AJAX post', err);
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
