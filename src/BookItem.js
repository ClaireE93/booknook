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
      lastUpdate: 0,
    };

    this.generateRecommendations = this.generateRecommendations.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    $(document).keydown((e) => {
      if (e.keyCode === 27 && this.state.showDetails) {
        this.handleExit();
      }
    });
  }

  generateRecommendations() {
    $.ajax({
      url: '/recommendations',
      type: 'GET',
      data: {ASIN: this.props.book.ASIN},
      success: (data) => {
        const parsed = JSON.parse(data);
        this.setState({isClicked: true, recommendationArr: parsed, lastUpdate: new Date()});
      },
      error: (err) => {
        console.log('FAILED call to Amazon', err);
      }
    });

  }

  handleClick() {
    this.setState({showDetails: true});
    this.generateRecommendations();
  }

  handleExit() {
    this.setState({showDetails: false, isClicked: false});
  }

  handleRemove() {
    this.props.onClick(this.props.book);
    this.handleExit();
  }

  render() {

    const description = this.props.book.desc ?
          this.props.book.desc.replace(/<\/?[^>]+(>|$)/g, "") : 'No Description Available';

    return (
      <div className='bookItem'>
        <div className='img-container'>
            <img src={this.props.book.image || '../book-cover.jpg'}/>
            <div className='overlay' onClick={this.handleClick}>
              <div className='text'>{this.props.book.title}</div>
            </div>
        </div>
        <div className={this.state.showDetails ? 'details-container-show' : 'details-container-hide'}>
          <div className='details-container'>
            <img className='exit-img' src='/exit.png' onClick={this.handleExit}/>
            <div className='book-detail-container'>
              <button className='delete-button' onClick={this.handleRemove}>Remove <br/>Book</button>
              <img className='cover-img' src={this.props.book.image}/>
              <div className='description'>{description}</div>
            </div>
            <Recommendations visible={this.state.isClicked} books={this.state.recommendationArr}/>
          </div>
        </div>
      </div>
    );
  }
}

export default BookItem;
