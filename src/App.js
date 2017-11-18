import React from 'react';
import Bookshelf from './Bookshelf';
import Search from './Search';
import $ from 'jquery';
import SearchResults from './SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isSearch: false,
      searchResults: [],
      errorMsg: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.updateBooks = this.updateBooks.bind(this);
    this.noResult = this.noResult.bind(this);
    this.handleSearchSelect = this.handleSearchSelect.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.fetch();
  }

  handleSearch(query) {
    $.ajax({
      url: '/bookSearch',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ query }),
      success: (data) => {
        const parsed = JSON.parse(data);
        this.setState({isSearch: !this.state.isSearch, searchResults: parsed});
      },
      error: (err) => {
        this.setState({errorMsg: true});
        setTimeout(() => {
          this.setState({errorMsg: false});
        }, 3000);
      }
    });
  }

  updateBooks(data) {
    $.ajax({
      url: '/books',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (data) => {
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
        const parsed = JSON.parse(data);
        this.setState({books: parsed});
      },
      error: (err) => {
        console.log('error in AJAX GET', err);
      }
    });
  }

  handleSearchSelect(data) {
    this.setState({isSearch: !this.state.isSearch});
    this.updateBooks(data);
  }

  noResult() {
    this.setState({isSearch: false});
  }

  handleDeleteClick(book) {
    const targetId = book.ASIN;
    const newBookArr = [];
    for (let i = 0; i < this.state.books.length; i++) {
      if (this.state.books[i].ASIN !== targetId) {
        newBookArr.push(this.state.books[i]);
      }
    }

    $.ajax({
      url: '/books',
      type: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify(book),
      success: (data) => {
        this.setState({books: newBookArr});
      },
      error: (err) => {
        console.log('error in DELETE', err);
      }
    });

  }

  render() {
    return (
      <div>
        <div className='search'>
          <Search onClick={this.handleSearch}/>
          <SearchResults onClick={this.handleSearchSelect} visible={this.state.isSearch}
            data={this.state.searchResults} noResult={this.noResult} isError={this.state.errorMsg}/>
        </div>
        <div className='bookshelf'>
          <Bookshelf books={this.state.books} onClick={this.handleDeleteClick}/>
        </div>
      </div>
    );
  }
}

export default App;
