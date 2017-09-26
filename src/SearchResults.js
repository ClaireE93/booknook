import React from 'react';

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
              <div key={result.ASIN} className='search-item-container' onClick={() => (this.props.onClick(result))}>
                <div className='search-image'><img src={result.image}/></div>
                <div className='search-details'>
                  <div className='search-title'>{result.title}</div>
                  <div className='search-author'>{result.author}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={this.props.noResult}>None of these</button>
        </div>
      </div>
    )
  }
}

export default SearchResults;
