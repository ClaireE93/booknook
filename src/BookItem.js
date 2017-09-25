import React from 'react';
import Recommendations from './Recommendations';
import $ from 'jquery';

class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      recommendationArr: [],
    }
    this.generateRecommendations = this.generateRecommendations.bind(this);
  }

  generateRecommendations() {
    //TODO: Ajax call to get Recommendations
    $.ajax({
      url: '/recommendations',
      type: 'GET',
      data: {title: this.props.book.title, author: this.props.book.author},
      success: (data) => {
        console.log('successful call to Amazon', data);
        const parsed = JSON.parse(data);
        this.setState({isClicked: !this.state.isClicked, recommendationArr: parsed})
      },
      error: (err) => {
        console.log('FAILED call to Amazon', err);
      }
    })
  }

  render() {

    return (
      <div className='bookItem'>
        <div>Title: {this.props.book.title}</div>
        <div>Author: {this.props.book.author}</div>
        <button onClick={this.generateRecommendations}>{this.state.isClicked ? 'Hide' : 'Find Books'}</button>
        <Recommendations visible={this.state.isClicked} books={this.state.recommendationArr}/>
        {/* {this.state.isClicked &&
          <Recommendations books={this.state.recommendationArr}/>
        } */}
      </div>
    );
  }
}


export default BookItem;
