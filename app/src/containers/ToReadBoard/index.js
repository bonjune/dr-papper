import React, { Component } from 'react'
import { withFirebase } from "../../components/Firebase";
import { compose } from "recompose";
import ToReadPinned from './ToReadPinned'
import ToReadArchived from './ToReadArchived'

class ToReadBoardBase extends Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []};
    const reviews = this.props.firebase.getReviews();
    reviews.once('value').then(
      snapshot => {
        const data = snapshot.val();
        const list = [];
        for (let i in data) {
          list.push(data[i]);
        }
        this.setState({
          reviews: list
        });
      }
    )
  }

  render() {
     
    return (
      <div className="to-read-board">
      <ToReadPinned reivews = {this.state.reviews} />
      <ToReadArchived reviews = {this.state.reviews} />
      </div>
    )
  }
}

const ToReadBoard = compose(withFirebase)(ToReadBoardBase);

export default ToReadBoard
