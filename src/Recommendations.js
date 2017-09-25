import React from 'react';

class Recommendations extends React.Component {
  render() {
    return (
      <div className='recommendation-container'>
        {this.props.books.map((book) => (
          <div key={book.title} className='recommendation-item'>
            <div>Title: {book.title}</div>
            <div>Author: {book.author}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default Recommendations;
