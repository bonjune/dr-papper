import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Board, { BoardPredicate } from '../../containers/Board'

class ShowSearchBase extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      cards: [],
    }
    this.state.value = props.match.params.name;
    console.log(this.state.value);
    this.props.firebase.tags()
      .once('value').then(async snapshot => {
        console.log(snapshot.val()[this.state.value]);
        // firebase.database().ref('/users/' + userId).once('value')
      })
  }

  render() {
    return (
      <div>
        <Board boardPredicate={BoardPredicate.Read} />
      </div>
    )
  }
}

const ShowSearch = withFirebase(ShowSearchBase);

export default ShowSearch
