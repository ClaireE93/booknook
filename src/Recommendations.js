import React from 'react';

class Recommendations extends React.Component {
  render() {
    return (
      <div className={this.props.visible ? 'rec-show' : 'rec-hide'}>
        <div className='recommendation-container' >
          {this.props.books.map((book) => (
            <div key={book.title} className='recommendation-item'>
              <div className='rec-item-container'>
                <div className='rec-image'><a href={book.url} target='_blank'><img src={book.image}/></a></div>
                <div className='rec-details'>
                  <div className='rec-title'>{book.title}</div>
                  <div className='rec-author'>{book.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Recommendations;
