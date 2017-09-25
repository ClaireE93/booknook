import React from 'react';
import Recommendations from './Recommendations'

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
    const dummyData = [
      {title: 'Oathbringer', author: 'Brandon Sanderson'},
    ];
    this.setState({isClicked: !this.state.isClicked, recommendationArr: dummyData})
  }

  render() {

    return (
      <div className='bookItem'>
        <div>Title: {this.props.book.title}</div>
        <div>Author: {this.props.book.author}</div>
        <button onClick={this.generateRecommendations}>{this.state.isClicked ? 'Hide Recommendations' : 'Generate Recommendations'}</button>
        {this.state.isClicked &&
          <Recommendations books={this.state.recommendationArr}/>
        }
      </div>
    );
  }
}


export default BookItem;
//
// function Mailbox(props) {
//   const unreadMessages = props.unreadMessages;
//   return (
//     <div>
//       <h1>Hello!</h1>
//       {unreadMessages.length > 0 &&
//         <h2>
//           You have {unreadMessages.length} unread messages.
//         </h2>
//       }
//     </div>
//   );
// }
