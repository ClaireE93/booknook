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
    $.ajax({
      url: '/recommendations',
      type: 'GET',
      data: {ASIN: this.props.book.ASIN},
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
        <div><img src={this.props.book.image}/></div>
        <div className='details-container'>
          <div className='title'>{this.props.book.title}</div>
          <div className='author'>{this.props.book.author}</div>
          <button onClick={this.generateRecommendations}>{this.state.isClicked ? 'Hide' : 'Find Books'}</button>
          <Recommendations visible={this.state.isClicked} books={this.state.recommendationArr}/>
        </div>
      </div>
    );
  }
}


export default BookItem;
