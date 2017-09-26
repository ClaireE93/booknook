import React from 'react';

const BookComponent = (props) => {
  let img;
  if (props.isLink) {
    img = <div><a href={props.book.url} target='_blank'><img className='search-image' src={props.book.image}/></a></div>
  } else {
    img = <div><img className='search-image' src={props.book.image}/></div>
  }

  return (
    <div className='search-item-container' onClick={() => (props.onClick(props.book))}>
      {img}
      <div className='search-details'>
        <div className='search-title'>{props.book.title}</div>
        <div className='search-author'>{props.book.author}</div>
      </div>
    </div>
  );
};

export default BookComponent;
