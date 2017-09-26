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
