import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({val: e.target.value});
  }

  render() {
    return (
      <div className="search-bar">
        <h1>Search</h1>
        <input id="search-text" type="text" placeholder="Search book by title" onChange={this.handleChange}/>
        <button className="btn hidden-sm-down" onClick={() => this.props.onClick(this.state.val)}>
          <span className="search-button-text">Search</span>
        </button>
      </div>
    );
  }
}



export default Search;
