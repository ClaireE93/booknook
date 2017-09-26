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
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleClick() {
    this.props.onClick(this.state.title, this.state.author);
    this.setState({title: '', author: ''});
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  }

  render() {
    return (
      <div className="search-bar">
        <h1>Search</h1>
        <input id="search-title" type="text" placeholder="Input title" value={this.state.title} onChange={this.handleTitleChange} onKeyUp={this.handleKeyUp}/>
        <input id="search-author" type="text" placeholder="Input author" value={this.state.author} onChange={this.handleAuthorChange} onKeyUp={this.handleKeyUp}/>
        <button className="btn hidden-sm-down" onClick={this.handleClick}>
          <span className="search-button-text">Search</span>
        </button>
      </div>
    );
  }
}



export default Search;
