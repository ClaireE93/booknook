import React from 'react';
import BookComponent from './BookComponent'

class Recommendations extends React.Component {

  render() {
    return (
      <div className={this.props.visible ? 'rec-show' : 'rec-hide'}>
        <div className='recommendation-container'>
          {this.props.books.map((book) => (
            <BookComponent key={book.ASIN} book={book} onClick={() => {return;}} isLink={true}/>
          ))}
        </div>
      </div>
    )
  }
}

export default Recommendations;
