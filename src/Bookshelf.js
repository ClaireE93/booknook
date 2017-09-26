import React from 'react';
import BookItem from './BookItem.js'

class Bookshelf extends React.Component {
  render() {
    return (
      <div>
        <div className='bookshelf'>Bookshelf</div>
        <div className='bookshelf-container'>
          {this.props.books.map((book) => (
            <BookItem key={book.title} book={book}/>
          ))}
        </div>
      </div>
    );
  }
}



export default Bookshelf;
