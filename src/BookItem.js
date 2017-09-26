import React from 'react';
import Recommendations from './Recommendations';
import $ from 'jquery';

class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      recommendationArr: [],
      showDetails: false,
    }
    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  //COMPONENTDIDMOUNT for escape listener?

  generateRecommendations() {
    $.ajax({
      url: '/recommendations',
      type: 'GET',
      data: {ASIN: this.props.book.ASIN},
      success: (data) => {
        const parsed = JSON.parse(data);
        this.setState({isClicked: !this.state.isClicked, recommendationArr: parsed})
      },
      error: (err) => {
        console.log('FAILED call to Amazon', err);
      }
    })
  }

  handleClick() {
    console.log('changing state')
    this.setState({showDetails: !this.state.showDetails})
  }

  handleKeyDown(e) {
    console.log('in keydown')
    if (e.keyCode === 27) {
      this.handleClick();
    }
  }


  render() {

    return (
      <div className='bookItem'>
        <div><img src={this.props.book.image || '../book-cover.jpg'} onClick={this.handleClick}/></div>
        <div className={this.state.showDetails ? 'details-container-show' : 'details-container-hide'}>
          <div className='details-container' onKeyDown={this.handleKeyDown}>
            <img className='exit-img' src='/exit.png' onClick={this.handleClick}/>
            <img className='details-img' src={this.props.book.image || '../book-cover.jpg'}/>
            <div className='title'>{this.props.book.title}</div>
            <div className='author'>{this.props.book.author}</div>
            <button onClick={this.generateRecommendations}>{this.state.isClicked ? 'Hide' : 'Find Books'}</button>
            <Recommendations visible={this.state.isClicked} books={this.state.recommendationArr}/>
          </div>
        </div>
      </div>
    );
  }
}


export default BookItem;
