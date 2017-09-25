import React from 'react';

class Recommendations extends React.Component {
  render() {
    return (
      <div>
        {this.props.books.map((book) => (
          <div key={book.title}>
            <div>
              Title: {book.title}
            </div>
            <div>
              Author: {book.author}
            </div>

          </div>
        ))}
      </div>
    )
  }
}

export default Recommendations;
