import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: ''
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  render() {
    return (
      <div className="search-bar">
        <h1>Search</h1>
        <input id="search-title" type="text" placeholder="Input title" onChange={this.handleTitleChange}/>
        <input id="search-author" type="text" placeholder="Input author" onChange={this.handleAuthorChange}/>
        <button className="btn hidden-sm-down" onClick={() => this.props.onClick(this.state.title, this.state.author)}>
          <span className="search-button-text">Search</span>
        </button>
      </div>
    );
  }
}



export default Search;
