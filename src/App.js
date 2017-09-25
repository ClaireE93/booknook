import React from 'react';
import Bookshelf from './Bookshelf';
import Search from './Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(val) {
    console.log('val is', val);
    //TODO: Ajax serach and add to this.state.books

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
