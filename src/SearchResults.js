import React from 'react';
import BookComponent from './BookComponent';

class SearchResults extends React.Component {

  render() {
    if (this.props.isError) {
      return (
        <div className='error-message'>No matching titles found</div>
      );
    }

    return (
      <div className={this.props.visible ? 'search-show' : 'search-hide'}>
        <div>
          Did you mean...?
          <div className='search-result-container'>
            {this.props.data.map((result) => (
              <BookComponent key={result.ASIN} book={result} isLink={false} onClick={this.props.onClick}/>
            ))}
          </div>
          <button onClick={this.props.noResult}>None of these</button>
        </div>
      </div>
    )
  }
}

export default SearchResults;


{/* <div key={result.ASIN} className='search-item-container' onClick={() => (this.props.onClick(result))}>
  <div ><img className='search-image' src={result.image}/></div>
  <div className='search-details'>
    <div className='search-title'>{result.title}</div>
    <div className='search-author'>{result.author}</div>
  </div>
</div>  */}
