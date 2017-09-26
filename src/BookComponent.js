import React from 'react';

const BookComponent = (props) => {
  let img;
  let textClass;
  let hoverClass;
  if (props.isLink) {
    img = <div><a href={props.book.url} target='_blank'><img className='rec-image' src={props.book.image}/></a></div>
    textClass = 'search-details-white';
    hoverClass = 'rec-item-container';
  } else {
    img = <div><img className='search-image' src={props.book.image}/></div>
    textClass = 'search-details-black';
    hoverClass = 'search-item-container';
  }

  return (
    <div className={hoverClass} onClick={() => (props.onClick(props.book))}>
      {img}
      <div className={textClass}>
        <div className='search-title'>{props.book.title}</div>
        <div className='search-author'>{props.book.author}</div>
      </div>
    </div>
  );
};

export default BookComponent;
