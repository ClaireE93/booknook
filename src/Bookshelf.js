import React from 'react';
import BookItem from './BookItem.js'

class Bookshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }
  }

  render() {
    return (
      <div className='bookshelf'>
        <h1>Bookshelf</h1>
        {this.state.books.map((book) => (
          <BookItem key={book.title} book={book}/>
        ))}
      </div>
    );
  }
}



export default Bookshelf;
