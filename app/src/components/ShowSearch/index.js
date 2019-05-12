import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Board, { BoardPredicate } from '../../containers/Board'
import CardBox, { CardPredicate } from '../../containers/Board/CardBox';


class ShowSearchBase extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      cards: [],
    }
    let result = [];
    this.state.value = props.match.params.name;
    this.props.firebase.tags()
      .once('value').then(async snapshot => {
        snapshot.val()[this.state.value].reviews.map((value) => {
          this.props.firebase.review(value)
            .once('value').then(async snapshot => {
                result.push(snapshot.val());
                this.setState({cards:result});
            })
        })
      })
  }

  render() {
    console.log(this.state.value);
    return (
      <div className="papper-board">
        <h1>{this.state.value}</h1>
        <CardBox reviews={this.state.cards} cardPredicate={CardPredicate.Archived} imgShow="true"/>
      </div>
    )
  }
}

const ShowSearch = withFirebase(ShowSearchBase);

export default ShowSearch
