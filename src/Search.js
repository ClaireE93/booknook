import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  handleClick() {
    this.props.onClick(this.state.query);
    this.setState({query: ''});
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
        <input id="search-title" type="text" placeholder="Search by title and/or author" value={this.state.query} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
        <button className="btn hidden-sm-down" onClick={this.handleClick}>
          <span className="search-button-text">Search</span>
        </button>
      </div>
    );
  }
}



export default Search;
