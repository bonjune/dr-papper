import React, { Component } from 'react'
import { withFirebase } from "../../components/Firebase";
import { compose } from "recompose";
import ReadPinned from './ReadPinned'
import ReadArchived from './ReadArchived'

class ReadBoardBase extends Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []};
    const reviews = this.props.firebase.reviews();
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
      <div className="read-board">
        <ReadPinned reivews = {this.state.reviews} />
        <ReadArchived reviews = {this.state.reviews} />
      </div>
    )
  }
}

const ReadBoard = compose(withFirebase)(ReadBoardBase);

export default ReadBoard
