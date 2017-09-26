import React from 'react';

const BookComponent = (props) => (
  <div className='search-item-container' onClick={() => (props.onClick(props.book))}>
    <div><img className='search-image' src={props.book.image}/></div>
    <div className='search-details'>
      <div className='search-title'>{props.book.title}</div>
      <div className='search-author'>{props.book.author}</div>
    </div>
  </div>
)

export default BookComponent;
